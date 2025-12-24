import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { invokeLLM } from "./_core/llm";
import { notifyOwner } from "./_core/notification";
import * as db from "./db";

export const appRouter = router({
  system: systemRouter,
  
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ============= DISCIPLINES =============
  disciplines: router({
    list: publicProcedure.query(async () => {
      return await db.getAllDisciplines();
    }),
    
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return await db.getDisciplineBySlug(input.slug);
      }),
  }),

  // ============= MODULES =============
  modules: router({
    listByDiscipline: publicProcedure
      .input(z.object({ disciplineId: z.number() }))
      .query(async ({ input }) => {
        return await db.getModulesByDiscipline(input.disciplineId);
      }),
    
    getBySlug: publicProcedure
      .input(z.object({ 
        disciplineId: z.number(),
        slug: z.string() 
      }))
      .query(async ({ input }) => {
        return await db.getModuleBySlug(input.disciplineId, input.slug);
      }),
  }),

  // ============= PAGES =============
  pages: router({
    listByModule: publicProcedure
      .input(z.object({ moduleId: z.number() }))
      .query(async ({ input }) => {
        return await db.getPagesByModule(input.moduleId);
      }),
    
    getBySlug: publicProcedure
      .input(z.object({ 
        moduleId: z.number(),
        slug: z.string() 
      }))
      .query(async ({ input }) => {
        return await db.getPageBySlug(input.moduleId, input.slug);
      }),
    
    getById: publicProcedure
      .input(z.object({ pageId: z.number() }))
      .query(async ({ input }) => {
        return await db.getPageById(input.pageId);
      }),
  }),

  // ============= EXERCISES =============
  exercises: router({
    listByPage: publicProcedure
      .input(z.object({ pageId: z.number() }))
      .query(async ({ input }) => {
        return await db.getExercisesByPage(input.pageId);
      }),
    
    submit: protectedProcedure
      .input(z.object({
        exerciseId: z.number(),
        answer: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        const exercise = await db.getExerciseById(input.exerciseId);
        if (!exercise) {
          throw new Error("Exercise not found");
        }
        
        // Validate answer
        const normalizedAnswer = input.answer.trim().toLowerCase();
        const expectedAnswer = exercise.expectedAnswer.trim().toLowerCase();
        
        let isCorrect = normalizedAnswer === expectedAnswer;
        
        // Check alternative answers
        if (!isCorrect && exercise.alternativeAnswers) {
          isCorrect = exercise.alternativeAnswers.some(
            alt => alt.trim().toLowerCase() === normalizedAnswer
          );
        }
        
        // Save attempt
        const attempt = await db.createExerciseAttempt({
          userId: ctx.user.id,
          exerciseId: input.exerciseId,
          answer: input.answer,
          isCorrect,
        });
        
        return {
          isCorrect,
          attemptNumber: attempt.attemptNumber,
          correctAnswer: isCorrect ? undefined : exercise.expectedAnswer,
        };
      }),
    
    getAttempts: protectedProcedure
      .input(z.object({ exerciseId: z.number() }))
      .query(async ({ ctx, input }) => {
        return await db.getExerciseAttempts(ctx.user.id, input.exerciseId);
      }),
    
    generatePersonalized: protectedProcedure
      .input(z.object({
        pageId: z.number(),
        difficulty: z.enum(["easy", "medium", "hard"]),
      }))
      .mutation(async ({ ctx, input }) => {
        const page = await db.getPageById(input.pageId);
        if (!page) {
          throw new Error("Page not found");
        }
        
        // Get user's progress to understand their level
        const progress = await db.getUserProgress(ctx.user.id, input.pageId);
        
        // Generate exercise using LLM
        const prompt = `Você é um professor de matemática especializado em ensinar adultos com dificuldade.
        
Crie UM exercício prático de matemática sobre: ${page.title}

Dificuldade: ${input.difficulty}
Nível do aluno: ${progress?.score || 0}% de acertos anteriores

O exercício deve:
- Usar exemplos do cotidiano (dinheiro, compras, medidas)
- Ser contextualizado e prático
- Ter linguagem acessível, sem infantilizar
- Ter uma resposta numérica clara

Retorne APENAS um JSON com:
{
  "question": "pergunta do exercício",
  "expectedAnswer": "resposta correta (apenas o número ou valor)"
}`;

        const response = await invokeLLM({
          messages: [
            { role: "system", content: "Você é um especialista em educação matemática para adultos." },
            { role: "user", content: prompt }
          ],
          response_format: {
            type: "json_schema",
            json_schema: {
              name: "exercise",
              strict: true,
              schema: {
                type: "object",
                properties: {
                  question: { type: "string" },
                  expectedAnswer: { type: "string" }
                },
                required: ["question", "expectedAnswer"],
                additionalProperties: false
              }
            }
          }
        });
        
        const content = response.choices[0]?.message?.content;
        if (!content || typeof content !== 'string') {
          throw new Error("Failed to generate exercise");
        }
        
        const exerciseData = JSON.parse(content);
        
        // Save generated exercise
        const generatedExercise = await db.createGeneratedExercise({
          userId: ctx.user.id,
          pageId: input.pageId,
          question: exerciseData.question,
          expectedAnswer: exerciseData.expectedAnswer,
          difficulty: input.difficulty,
        });
        
        return generatedExercise;
      }),
  }),

  // ============= PROGRESS =============
  moduleProgress: router({
    getByPage: protectedProcedure
      .input(z.object({ pageId: z.number() }))
      .query(async ({ ctx, input }) => {
        return await db.getUserProgress(ctx.user.id, input.pageId);
      }),
    
    getAll: protectedProcedure.query(async ({ ctx }) => {
      return await db.getAllUserProgress(ctx.user.id);
    }),
    
    byModule: protectedProcedure
      .input(z.object({ moduleId: z.number() }))
      .query(async ({ ctx, input }) => {
        return await db.getModuleProgress(ctx.user.id, input.moduleId);
      }),
    
    allModules: protectedProcedure
      .query(async ({ ctx }) => {
        const progressMap = await db.getAllModulesProgress(ctx.user.id);
        // Convert Map to object for JSON serialization
        const progressObj: Record<number, { completed: number; total: number; percentage: number }> = {};
        progressMap.forEach((value, key) => {
          progressObj[key] = value;
        });
        return progressObj;
      }),
    
    updatePage: protectedProcedure
      .input(z.object({
        pageId: z.number(),
        completed: z.boolean().optional(),
        score: z.number().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        await db.upsertPageProgress({
          userId: ctx.user.id,
          pageId: input.pageId,
          completed: input.completed,
          score: input.score,
        });
        
        // Award XP and points for completing lesson
        if (input.completed) {
          const page = await db.getPageById(input.pageId);
          if (page) {
            // Award 50 XP for completing lesson
            await db.awardXP(ctx.user.id, 50, "Aula concluída", page.id);
            
            // Award points based on score (10 base + bonus)
            const scoreBonus = Math.floor((input.score || 0) / 10);
            const totalPoints = 10 + scoreBonus;
            await db.addPoints(ctx.user.id, "lesson_completed", totalPoints, page.id);
            
            // Check and award achievements
            await db.checkAndAwardAchievements(ctx.user.id);
            const allPages = await db.getPagesByModule(page.moduleId);
            const allProgress = await db.getAllUserProgress(ctx.user.id);
            
            const moduleCompleted = allPages.every(p => 
              allProgress.some(prog => prog.pageId === p.id && prog.completed)
            );
            
            if (moduleCompleted) {
              // Notify owner about module completion
              const module = await db.getModulesByDiscipline(page.moduleId);
              await notifyOwner({
                title: "Aluno completou módulo",
                content: `${ctx.user.name || ctx.user.email} completou o módulo "${page.title}"`
              });
              
              // Create achievement
              await db.createAchievement({
                userId: ctx.user.id,
                type: "module_completed",
                title: "Módulo Completo!",
                description: `Você completou o módulo com sucesso!`,
                relatedId: page.moduleId,
              });
            }
          }
        }
        
        return { success: true };
      }),
  }),

  // ============= STREAKS ===============
  gamification: router({
    streak: protectedProcedure.query(async ({ ctx }) => {
      const streak = await db.getUserStreak(ctx.user.id);
      return streak || { currentStreak: 0, longestStreak: 0, lastActivityDate: null };
    }),
    
    xp: protectedProcedure.query(async ({ ctx }) => {
      const xp = await db.getUserXP(ctx.user.id);
      return xp || { totalXP: 0, level: 1, xpToNextLevel: 100 };
    }),
    
    achievements: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserAchievements(ctx.user.id);
    }),
    
    awardXP: protectedProcedure
      .input(z.object({
        amount: z.number(),
        reason: z.string(),
        relatedId: z.number().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        return await db.awardXP(ctx.user.id, input.amount, input.reason, input.relatedId);
      }),
  }),
  
  dashboard: router({
    stats: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserStats(ctx.user.id);
    }),
    
    summary: protectedProcedure.query(async ({ ctx }) => {
      const allProgress = await db.getAllUserProgress(ctx.user.id);
      const achievements = await db.getUserAchievements(ctx.user.id);
      
      const completedPages = allProgress.filter(p => p.completed).length;
      const averageScore = allProgress.length > 0
        ? allProgress.reduce((sum, p) => sum + p.score, 0) / allProgress.length
        : 0;
      
      return {
        completedPages,
        totalAchievements: achievements.length,
        averageScore: Math.round(averageScore),
        recentProgress: allProgress.slice(0, 5),
      };
    }),
    
    recommendations: protectedProcedure.query(async ({ ctx }) => {
      const allProgress = await db.getAllUserProgress(ctx.user.id);
      const disciplines = await db.getAllDisciplines();
      
      // Find next recommended page
      for (const discipline of disciplines) {
        const modules = await db.getModulesByDiscipline(discipline.id);
        
        for (const module of modules) {
          const pages = await db.getPagesByModule(module.id);
          
          for (const page of pages) {
            const progress = allProgress.find(p => p.pageId === page.id);
            
            if (!progress || !progress.completed) {
              return {
                discipline,
                module,
                page,
              };
            }
          }
        }
      }
      
      return null;
    }),
   }),

  // ============= USER =============
  user: router({    updateName: protectedProcedure
      .input(z.object({ name: z.string().min(1).max(100) }))
      .mutation(async ({ ctx, input }) => {
        await db.updateUserName(ctx.user.id, input.name);
        return { success: true };
      }),
    
    completeOnboarding: protectedProcedure.mutation(async ({ ctx }) => {
      await db.completeOnboarding(ctx.user.id);
      // Automatically enroll user in Aritmética discipline
      await db.autoEnrollInAritmetica(ctx.user.id);
      return { success: true };
    }),
    
    updateAvatar: protectedProcedure
      .input(z.object({ avatarUrl: z.string().url() }))
      .mutation(async ({ ctx, input }) => {
        await db.updateUserAvatar(ctx.user.id, input.avatarUrl);
        return { success: true };
      }),
    
    updatePreferences: protectedProcedure
      .input(z.object({
        language: z.enum(["pt", "en"]).optional(),
        themeColor: z.enum(["blue", "red", "green"]).optional(),
        darkMode: z.boolean().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        await db.updateUserPreferences(ctx.user.id, input);
        return { success: true };
      }),
    
    getActivityHistory: protectedProcedure
      .input(z.object({ limit: z.number().optional().default(20) }))
      .query(async ({ ctx, input }) => {
        return await db.getUserActivityHistory(ctx.user.id, input.limit);
      }),
    
    getWeeklyProgress: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserWeeklyProgress(ctx.user.id);
    }),
  }),

  // ============= ENROLLMENTS =============
  enrollments: router({
    enroll: protectedProcedure
      .input(z.object({ disciplineId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        await db.enrollUserInDiscipline(ctx.user.id, input.disciplineId);
        return { success: true };
      }),
    
    list: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserEnrollments(ctx.user.id);
    }),
  }),
  
  // ============= POINTS =============
  points: router({
    addPoints: protectedProcedure
      .input(z.object({
        action: z.enum(["daily_login", "video_watched", "exercise_completed", "podcast_listened", "task_completed"]),
        points: z.number(),
        relatedId: z.number().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        await db.addPoints(ctx.user.id, input.action, input.points, input.relatedId);
        return { success: true };
      }),
    
    getSummary: protectedProcedure.query(async ({ ctx }) => {
      return await db.getPointsSummary(ctx.user.id);
    }),
    
    checkDailyLogin: protectedProcedure.mutation(async ({ ctx }) => {
      const hasEarned = await db.hasEarnedPointsToday(ctx.user.id, "daily_login");
      
      if (!hasEarned) {
        await db.addPoints(ctx.user.id, "daily_login", 10);
        return { earned: true, points: 10 };
      }
      
      return { earned: false, points: 0 };
    }),
  }),

  // ============= STANDALONE EXERCISES (SALA DE EXERCÍCIOS) =============
  standaloneExercises: router({
    getAll: publicProcedure.query(async () => {
      return await db.getAllStandaloneExercises();
    }),
    
    getByDiscipline: publicProcedure
      .input(z.object({ disciplineId: z.number() }))
      .query(async ({ input }) => {
        return await db.getStandaloneExercisesByDiscipline(input.disciplineId);
      }),
    
    getByDifficulty: publicProcedure
      .input(z.object({ difficulty: z.enum(["easy", "moderate", "hard"]) }))
      .query(async ({ input }) => {
        return await db.getStandaloneExercisesByDifficulty(input.difficulty);
      }),
    
    getByModule: publicProcedure
      .input(z.object({ moduleId: z.number() }))
      .query(async ({ input }) => {
        return await db.getStandaloneExercisesByModule(input.moduleId);
      }),
    
    submit: protectedProcedure
      .input(z.object({
        exerciseId: z.number(),
        userAnswer: z.number(),
      }))
      .mutation(async ({ ctx, input }) => {
        const result = await db.submitStandaloneExercise(
          ctx.user.id,
          input.exerciseId,
          input.userAnswer
        );
        
        // Award points if correct
        if (result.isCorrect && result.points > 0) {
          await db.addPoints(ctx.user.id, "exercise_completed", result.points);
        }
        
        return result;
      }),
    
    getStats: protectedProcedure.query(async ({ ctx }) => {
      return await db.getStandaloneExerciseStats(ctx.user.id);
    }),
  }),

  // ============= STANDALONE VIDEOS (SALA DE VÍDEOS) =============
  standaloneVideos: router({
    getAll: publicProcedure.query(async () => {
      return await db.getAllStandaloneVideos();
    }),
    
    getByDiscipline: publicProcedure
      .input(z.object({ disciplineId: z.number() }))
      .query(async ({ input }) => {
        return await db.getStandaloneVideosByDiscipline(input.disciplineId);
      }),
    
    getByModule: publicProcedure
      .input(z.object({ moduleId: z.number() }))
      .query(async ({ input }) => {
        return await db.getStandaloneVideosByModule(input.moduleId);
      }),
    
    markWatched: protectedProcedure
      .input(z.object({ videoId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        await db.markVideoAsWatched(ctx.user.id, input.videoId);
        
        // Award 3 points for watching a video
        await db.addPoints(ctx.user.id, "video_watched", 3);
        
        return { success: true };
      }),
    
    getWatched: protectedProcedure.query(async ({ ctx }) => {
      return await db.getWatchedVideos(ctx.user.id);
    }),
    
    getStats: protectedProcedure.query(async ({ ctx }) => {
      return await db.getStandaloneVideoStats(ctx.user.id);
    }),
  }),

  // ============= DAILY CHALLENGE (DESAFIO DO DIA) =============
  dailyChallenge: router({
    getToday: publicProcedure.query(async () => {
      const challenge = await db.getTodayChallenge();
      if (!challenge) {
        throw new Error("Failed to generate today's challenge");
      }

      // Buscar exercícios do desafio
      const exerciseIds = challenge.exerciseIds as number[];
      const exercises = await db.getChallengeExercises(exerciseIds);

      return {
        challenge,
        exercises,
      };
    }),

    submit: protectedProcedure
      .input(
        z.object({
          challengeId: z.number(),
          exerciseId: z.number(),
          userAnswer: z.number(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const result = await db.submitDailyChallengeAnswer(
          ctx.user.id,
          input.challengeId,
          input.exerciseId,
          input.userAnswer
        );

        // Award double points if correct
        if (result.isCorrect && result.pointsEarned > 0) {
          await db.addPoints(ctx.user.id, "daily_challenge_completed", result.pointsEarned);
        }

        return result;
      }),

    hasCompleted: protectedProcedure.query(async ({ ctx }) => {
      return await db.hasCompletedTodayChallenge(ctx.user.id);
    }),

    getStats: protectedProcedure.query(async ({ ctx }) => {
      return await db.getDailyChallengeStats(ctx.user.id);
    }),
  }),

  // ============= ACHIEVEMENTS =============
  achievements: router({
    listAll: publicProcedure.query(async () => {
      return await db.getAllAchievementDefinitions();
    }),

    getUserAchievements: protectedProcedure.query(async ({ ctx }) => {
      const definitions = await db.getAllAchievementDefinitions();
      const unlocked = await db.getUserUnlockedAchievements(ctx.user.id);
      const unlockedIds = new Set(unlocked.map((u) => u.achievementId));

      return definitions.map((def) => ({
        ...def,
        unlocked: unlockedIds.has(def.id),
        unlockedAt: unlocked.find((u) => u.achievementId === def.id)?.unlockedAt || null,
      }));
    }),

    checkProgress: protectedProcedure.mutation(async ({ ctx }) => {
      // TODO: Implement checkAndAwardAchievements function
      return { newAchievements: [] };
    }),
  }),

  // ============= ADMIN =============
  admin: router({
    resetUserProgress: protectedProcedure
      .input(z.object({ userId: z.number().optional() }))
      .mutation(async ({ ctx, input }) => {
        // TODO: Implement resetUserProgress function
        return { success: true };
      }),
  }),
});
export type AppRouter = typeof appRouter;
