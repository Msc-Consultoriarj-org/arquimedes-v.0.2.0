import { eq, and, desc, asc, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, users,
  disciplines, Discipline, InsertDiscipline,
  modules, Module, InsertModule,
  pages, Page, InsertPage,
  exercises, Exercise, InsertExercise,
  pageProgress, PageProgress, InsertPageProgress,
  exerciseAttempts, ExerciseAttempt, InsertExerciseAttempt,
  generatedExercises, GeneratedExercise, InsertGeneratedExercise,
  achievements, Achievement, InsertAchievement,
  streaks, Streak, InsertStreak,
  userXP, UserXP, InsertUserXP,
  xpTransactions, XPTransaction, InsertXPTransaction,
  userPointsLog, UserPointsLog, InsertUserPointsLog,
  userEnrollments, UserEnrollment, InsertUserEnrollment,
  standaloneExercises, StandaloneExercise, InsertStandaloneExercise,
  standaloneExerciseAttempts, StandaloneExerciseAttempt, InsertStandaloneExerciseAttempt,
  standaloneVideos, StandaloneVideo, InsertStandaloneVideo,
  standaloneVideoViews, StandaloneVideoView, InsertStandaloneVideoView,
  dailyChallenges, DailyChallenge, InsertDailyChallenge,
  dailyChallengeAttempts, DailyChallengeAttempt, InsertDailyChallengeAttempt
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ============= USER OPERATIONS =============

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ============= DISCIPLINE OPERATIONS =============

export async function getAllDisciplines(): Promise<Discipline[]> {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(disciplines).orderBy(asc(disciplines.order));
}

export async function getDisciplineBySlug(slug: string): Promise<Discipline | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(disciplines).where(eq(disciplines.slug, slug)).limit(1);
  return result[0];
}

export async function createDiscipline(data: InsertDiscipline): Promise<Discipline> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(disciplines).values(data);
  const insertId = Number((result as any).insertId);
  const inserted = await db.select().from(disciplines).where(eq(disciplines.id, insertId)).limit(1);
  return inserted[0]!;
}

// ============= MODULE OPERATIONS =============

export async function getModulesByDiscipline(disciplineId: number): Promise<Module[]> {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(modules).where(eq(modules.disciplineId, disciplineId)).orderBy(asc(modules.order));
}

export async function getModuleBySlug(disciplineId: number, slug: string): Promise<Module | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(modules)
    .where(and(eq(modules.disciplineId, disciplineId), eq(modules.slug, slug)))
    .limit(1);
  return result[0];
}

export async function createModule(data: InsertModule): Promise<Module> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(modules).values(data);
  const insertId = Number((result as any).insertId);
  const inserted = await db.select().from(modules).where(eq(modules.id, insertId)).limit(1);
  return inserted[0]!;
}

// ============= PAGE OPERATIONS =============

export async function getPagesByModule(moduleId: number): Promise<Page[]> {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(pages).where(eq(pages.moduleId, moduleId)).orderBy(asc(pages.order));
}

export async function getPageBySlug(moduleId: number, slug: string): Promise<Page | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(pages)
    .where(and(eq(pages.moduleId, moduleId), eq(pages.slug, slug)))
    .limit(1);
  return result[0];
}

export async function getPageById(pageId: number): Promise<Page | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(pages).where(eq(pages.id, pageId)).limit(1);
  return result[0];
}

export async function createPage(data: InsertPage): Promise<Page> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(pages).values(data);
  const insertId = Number((result as any).insertId);
  const inserted = await db.select().from(pages).where(eq(pages.id, insertId)).limit(1);
  return inserted[0]!;
}

// ============= EXERCISE OPERATIONS =============

export async function getExercisesByPage(pageId: number): Promise<Exercise[]> {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(exercises).where(eq(exercises.pageId, pageId)).orderBy(asc(exercises.order));
}

export async function getExerciseById(exerciseId: number): Promise<Exercise | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(exercises).where(eq(exercises.id, exerciseId)).limit(1);
  return result[0];
}

export async function createExercise(data: InsertExercise): Promise<Exercise> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(exercises).values(data);
  const insertId = Number((result as any).insertId);
  const inserted = await db.select().from(exercises).where(eq(exercises.id, insertId)).limit(1);
  return inserted[0]!;
}

// ============= PROGRESS OPERATIONS =============

export async function getUserProgress(userId: number, pageId: number): Promise<PageProgress | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(pageProgress)
    .where(and(eq(pageProgress.userId, userId), eq(pageProgress.pageId, pageId)))
    .limit(1);
  return result[0];
}

export async function getAllUserProgress(userId: number): Promise<PageProgress[]> {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(pageProgress).where(eq(pageProgress.userId, userId));
}

export async function upsertPageProgress(data: InsertPageProgress): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const existing = await getUserProgress(data.userId, data.pageId);
  
  if (existing) {
    await db.update(pageProgress)
      .set({
        completed: data.completed ?? existing.completed,
        score: data.score ?? existing.score,
        lastAccessedAt: new Date(),
        completedAt: data.completed ? new Date() : existing.completedAt,
      })
      .where(eq(pageProgress.id, existing.id));
  } else {
    await db.insert(pageProgress).values({
      ...data,
      lastAccessedAt: new Date(),
      completedAt: data.completed ? new Date() : undefined,
    });
  }
}

// ============= EXERCISE ATTEMPT OPERATIONS =============

export async function getExerciseAttempts(userId: number, exerciseId: number): Promise<ExerciseAttempt[]> {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(exerciseAttempts)
    .where(and(eq(exerciseAttempts.userId, userId), eq(exerciseAttempts.exerciseId, exerciseId)))
    .orderBy(desc(exerciseAttempts.createdAt));
}

export async function createExerciseAttempt(data: InsertExerciseAttempt): Promise<ExerciseAttempt> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  // Get attempt number
  const previousAttempts = await getExerciseAttempts(data.userId, data.exerciseId);
  const attemptNumber = previousAttempts.length + 1;
  
  await db.insert(exerciseAttempts).values({
    ...data,
    attemptNumber,
  });
  
  // Return the created attempt data
  return {
    id: 0, // ID not needed for return value
    userId: data.userId,
    exerciseId: data.exerciseId,
    answer: data.answer,
    isCorrect: data.isCorrect,
    attemptNumber,
    createdAt: new Date(),
  };
}

// ============= GENERATED EXERCISE OPERATIONS =============

export async function createGeneratedExercise(data: InsertGeneratedExercise): Promise<GeneratedExercise> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(generatedExercises).values(data);
  const insertId = Number((result as any).insertId);
  const inserted = await db.select().from(generatedExercises)
    .where(eq(generatedExercises.id, insertId))
    .limit(1);
  return inserted[0]!;
}

export async function getGeneratedExercises(userId: number, pageId: number): Promise<GeneratedExercise[]> {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(generatedExercises)
    .where(and(eq(generatedExercises.userId, userId), eq(generatedExercises.pageId, pageId)))
    .orderBy(desc(generatedExercises.createdAt));
}

// ============= ACHIEVEMENT OPERATIONS =============

export async function createAchievement(data: InsertAchievement): Promise<Achievement> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(achievements).values(data);
  const insertId = Number((result as any).insertId);
  const inserted = await db.select().from(achievements)
    .where(eq(achievements.id, insertId))
    .limit(1);
  return inserted[0]!;
}

// ============= PROGRESS OPERATIONS =============

export async function getModuleProgress(userId: number, moduleId: number): Promise<{ completed: number; total: number; percentage: number }> {
  const db = await getDb();
  if (!db) return { completed: 0, total: 0, percentage: 0 };
  
  // Get all pages in the module
  const modulePages = await db.select().from(pages)
    .where(eq(pages.moduleId, moduleId));
  
  const total = modulePages.length;
  
  if (total === 0) {
    return { completed: 0, total: 0, percentage: 0 };
  }
  
  // Get completed pages for this user in this module
  const pageIds = modulePages.map(p => p.id);
  const completedPages = await db.select().from(pageProgress)
    .where(
      and(
        eq(pageProgress.userId, userId),
        eq(pageProgress.completed, true),
        sql`${pageProgress.pageId} IN (${pageIds.join(',')})`
      )
    );
  
  const completed = completedPages.length;
  const percentage = Math.round((completed / total) * 100);
  
  return { completed, total, percentage };
}

export async function getAllModulesProgress(userId: number): Promise<Map<number, { completed: number; total: number; percentage: number }>> {
  const db = await getDb();
  if (!db) return new Map();
  
  // Get all modules
  const allModules = await db.select().from(modules);
  
  const progressMap = new Map<number, { completed: number; total: number; percentage: number }>();
  
  for (const module of allModules) {
    const progress = await getModuleProgress(userId, module.id);
    progressMap.set(module.id, progress);
  }
  
  return progressMap;
}


// ============= GAMIFICATION OPERATIONS =============

/**
 * Get or create user streak
 */
export async function getUserStreak(userId: number): Promise<Streak | null> {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(streaks)
    .where(eq(streaks.userId, userId))
    .limit(1);
  
  if (result.length > 0) {
    return result[0]!;
  }
  
  // Create new streak
  await db.insert(streaks).values({
    userId,
    currentStreak: 0,
    longestStreak: 0,
    lastActivityDate: null,
  });
  
  const newResult = await db.select().from(streaks)
    .where(eq(streaks.userId, userId))
    .limit(1);
  
  return newResult[0] || null;
}

/**
 * Update user streak based on activity
 */
export async function updateStreak(userId: number): Promise<Streak | null> {
  const db = await getDb();
  if (!db) return null;
  
  const streak = await getUserStreak(userId);
  if (!streak) return null;
  
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  if (!streak.lastActivityDate) {
    // First activity ever
    await db.update(streaks)
      .set({
        currentStreak: 1,
        longestStreak: 1,
        lastActivityDate: now,
      })
      .where(eq(streaks.userId, userId));
  } else {
    const lastActivity = new Date(streak.lastActivityDate);
    const lastActivityDay = new Date(lastActivity.getFullYear(), lastActivity.getMonth(), lastActivity.getDate());
    
    const daysDiff = Math.floor((today.getTime() - lastActivityDay.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDiff === 0) {
      // Same day, no update needed
      return streak;
    } else if (daysDiff === 1) {
      // Consecutive day
      const newStreak = streak.currentStreak + 1;
      const newLongest = Math.max(newStreak, streak.longestStreak);
      
      await db.update(streaks)
        .set({
          currentStreak: newStreak,
          longestStreak: newLongest,
          lastActivityDate: now,
        })
        .where(eq(streaks.userId, userId));
    } else {
      // Streak broken
      await db.update(streaks)
        .set({
          currentStreak: 1,
          lastActivityDate: now,
        })
        .where(eq(streaks.userId, userId));
    }
  }
  
  return getUserStreak(userId);
}

/**
 * Get or create user XP
 */
export async function getUserXP(userId: number): Promise<UserXP | null> {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(userXP)
    .where(eq(userXP.userId, userId))
    .limit(1);
  
  if (result.length > 0) {
    return result[0]!;
  }
  
  // Create new XP record
  await db.insert(userXP).values({
    userId,
    totalXP: 0,
    level: 1,
    xpToNextLevel: 100,
  });
  
  const newResult = await db.select().from(userXP)
    .where(eq(userXP.userId, userId))
    .limit(1);
  
  return newResult[0] || null;
}

/**
 * Award XP to user
 */
export async function awardXP(userId: number, amount: number, reason: string, relatedId?: number): Promise<UserXP | null> {
  const db = await getDb();
  if (!db) return null;
  
  const xp = await getUserXP(userId);
  if (!xp) return null;
  
  const newTotalXP = xp.totalXP + amount;
  let newLevel = xp.level;
  let newXPToNext = xp.xpToNextLevel;
  
  // Calculate level up (simple formula: level * 100)
  while (newTotalXP >= (newLevel * 100)) {
    newLevel++;
  }
  newXPToNext = (newLevel * 100) - newTotalXP;
  
  // Update XP
  await db.update(userXP)
    .set({
      totalXP: newTotalXP,
      level: newLevel,
      xpToNextLevel: newXPToNext,
    })
    .where(eq(userXP.userId, userId));
  
  // Record transaction
  await db.insert(xpTransactions).values({
    userId,
    amount,
    reason,
    relatedId: relatedId || null,
  });
  
  return getUserXP(userId);
}

/**
 * Get user achievements
 */
export async function getUserAchievements(userId: number): Promise<Achievement[]> {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(achievements)
    .where(eq(achievements.userId, userId))
    .orderBy(desc(achievements.createdAt));
}

/**
 * Award achievement to user
 */
export async function awardAchievement(
  userId: number, 
  type: "module_completed" | "perfect_score" | "streak" | "first_lesson",
  title: string,
  description?: string,
  relatedId?: number
): Promise<Achievement | null> {
  const db = await getDb();
  if (!db) return null;
  
  // Check if achievement already exists
  const existing = await db.select().from(achievements)
    .where(
      and(
        eq(achievements.userId, userId),
        eq(achievements.type, type),
        relatedId ? eq(achievements.relatedId, relatedId) : sql`${achievements.relatedId} IS NULL`
      )
    )
    .limit(1);
  
  if (existing.length > 0) {
    return existing[0]!;
  }
  
  // Create achievement
  await db.insert(achievements).values({
    userId,
    type,
    title,
    description: description || null,
    relatedId: relatedId || null,
  });
  
  const newResult = await db.select().from(achievements)
    .where(
      and(
        eq(achievements.userId, userId),
        eq(achievements.type, type),
        relatedId ? eq(achievements.relatedId, relatedId) : sql`${achievements.relatedId} IS NULL`
      )
    )
    .orderBy(desc(achievements.createdAt))
    .limit(1);
  
  return newResult[0] || null;
}


// ============= POINTS OPERATIONS =============

/**
 * Add points for a user action
 */
export async function addPoints(
  userId: number,
  action: "daily_login" | "video_watched" | "exercise_completed" | "podcast_listened" | "task_completed" | "daily_challenge_completed",
  points: number,
  relatedId?: number
): Promise<void> {
  const db = await getDb();
  if (!db) return;

  await db.insert(userPointsLog).values({
    userId,
    action,
    points,
    relatedId: relatedId || null,
  });
}

/**
 * Get points summary for a user (today, this week, this month)
 */
export async function getPointsSummary(userId: number): Promise<{
  today: number;
  thisWeek: number;
  thisMonth: number;
  allTime: number;
}> {
  const db = await getDb();
  if (!db) {
    return { today: 0, thisWeek: 0, thisMonth: 0, allTime: 0 };
  }

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay()); // Start of week (Sunday)
  weekStart.setHours(0, 0, 0, 0);
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  // Get all points for the user
  const allPoints = await db
    .select()
    .from(userPointsLog)
    .where(eq(userPointsLog.userId, userId));

  const today = allPoints
    .filter(p => p.createdAt >= todayStart)
    .reduce((sum, p) => sum + p.points, 0);

  const thisWeek = allPoints
    .filter(p => p.createdAt >= weekStart)
    .reduce((sum, p) => sum + p.points, 0);

  const thisMonth = allPoints
    .filter(p => p.createdAt >= monthStart)
    .reduce((sum, p) => sum + p.points, 0);

  const allTime = allPoints.reduce((sum, p) => sum + p.points, 0);

  return { today, thisWeek, thisMonth, allTime };
}

/**
 * Check if user already earned points for a specific action today
 * (to prevent duplicate daily login points, for example)
 */
export async function hasEarnedPointsToday(
  userId: number,
  action: "daily_login" | "video_watched" | "exercise_completed" | "podcast_listened" | "task_completed"
): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const result = await db
    .select()
    .from(userPointsLog)
    .where(
      and(
        eq(userPointsLog.userId, userId),
        eq(userPointsLog.action, action),
        sql`${userPointsLog.createdAt} >= ${todayStart}`
      )
    )
    .limit(1);

  return result.length > 0;
}


// ============= USER ONBOARDING =============

export async function updateUserName(userId: number, name: string) {
  const db = await getDb();
  if (!db) return;
  await db.update(users).set({ name }).where(eq(users.id, userId));
}

export async function completeOnboarding(userId: number) {
  const db = await getDb();
  if (!db) return;
  await db.update(users).set({ hasCompletedOnboarding: true }).where(eq(users.id, userId));
}


// ============= USER ENROLLMENTS =============

export async function enrollUserInDiscipline(userId: number, disciplineId: number) {
  const db = await getDb();
  if (!db) return;
  
  // Check if already enrolled
  const existing = await db
    .select()
    .from(userEnrollments)
    .where(and(
      eq(userEnrollments.userId, userId),
      eq(userEnrollments.disciplineId, disciplineId)
    ))
    .limit(1);
  
  if (existing.length === 0) {
    await db.insert(userEnrollments).values({ userId, disciplineId });
  }
}

export async function getUserEnrollments(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  const enrollments = await db
    .select({
      id: disciplines.id,
      name: disciplines.name,
      slug: disciplines.slug,
      description: disciplines.description,
      order: disciplines.order,
      enrolledAt: userEnrollments.enrolledAt,
    })
    .from(userEnrollments)
    .innerJoin(disciplines, eq(userEnrollments.disciplineId, disciplines.id))
    .where(eq(userEnrollments.userId, userId))
    .orderBy(disciplines.order);
  
  return enrollments;
}

// ============= USER STATS =============

export async function getUserStats(userId: number) {
  const db = await getDb();
  if (!db) return null;
  
  // Total logins (count distinct days from userPointsLog with action 'daily_login')
  const loginResult = await db
    .select({ count: sql<number>`COUNT(DISTINCT DATE(${userPointsLog.createdAt}))` })
    .from(userPointsLog)
    .where(and(
      eq(userPointsLog.userId, userId),
      eq(userPointsLog.action, "daily_login")
    ));
  
  const totalLogins = loginResult[0]?.count || 0;
  
  // Current streak
  const streakResult = await db
    .select()
    .from(streaks)
    .where(eq(streaks.userId, userId))
    .limit(1);
  
  const currentStreak = streakResult[0]?.currentStreak || 0;
  
  // Completed lessons (pages with 100% progress)
  const lessonsResult = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(pageProgress)
    .where(and(
      eq(pageProgress.userId, userId),
      eq(pageProgress.completed, true)
    ));
  
  const completedLessons = lessonsResult[0]?.count || 0;
  
  // Exercise accuracy (correct attempts / total attempts)
  const attemptsResult = await db
    .select({
      total: sql<number>`COUNT(*)`,
      correct: sql<number>`SUM(CASE WHEN ${exerciseAttempts.isCorrect} = 1 THEN 1 ELSE 0 END)`,
    })
    .from(exerciseAttempts)
    .where(eq(exerciseAttempts.userId, userId));
  
  const total = attemptsResult[0]?.total || 0;
  const correct = attemptsResult[0]?.correct || 0;
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
  
  return {
    totalLogins,
    currentStreak,
    completedLessons,
    exerciseAccuracy: accuracy,
  };
}


// ============= USER PROFILE =============

export async function updateUserAvatar(userId: number, avatarUrl: string) {
  const db = await getDb();
  if (!db) return;
  
  await db
    .update(users)
    .set({ avatar: avatarUrl })
    .where(eq(users.id, userId));
}

export async function updateUserPreferences(
  userId: number,
  preferences: { language?: string; themeColor?: string; darkMode?: boolean }
) {
  const db = await getDb();
  if (!db) return;
  
  const updateData: any = {};
  if (preferences.language !== undefined) updateData.language = preferences.language;
  if (preferences.themeColor !== undefined) updateData.themeColor = preferences.themeColor;
  if (preferences.darkMode !== undefined) updateData.darkMode = preferences.darkMode;
  
  if (Object.keys(updateData).length > 0) {
    await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, userId));
  }
}

export async function getUserActivityHistory(userId: number, limit: number = 20) {
  const db = await getDb();
  if (!db) return [];
  
  const activities = await db
    .select({
      pageId: pageProgress.pageId,
      pageTitle: pages.title,
      disciplineName: disciplines.name,
      moduleName: modules.name,
      completed: pageProgress.completed,
      score: pageProgress.score,
      timestamp: pageProgress.lastAccessedAt,
    })
    .from(pageProgress)
    .innerJoin(pages, eq(pageProgress.pageId, pages.id))
    .innerJoin(modules, eq(pages.moduleId, modules.id))
    .innerJoin(disciplines, eq(modules.disciplineId, disciplines.id))
    .where(eq(pageProgress.userId, userId))
    .orderBy(desc(pageProgress.lastAccessedAt))
    .limit(limit);
  
  return activities;
}

export async function getUserWeeklyProgress(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  // Get progress for last 7 days
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  const progress = await db
    .select({
      date: sql<string>`DATE(${pageProgress.lastAccessedAt})`,
      completedPages: sql<number>`COUNT(DISTINCT CASE WHEN ${pageProgress.completed} = 1 THEN ${pageProgress.pageId} END)`,
      totalXP: sql<number>`COALESCE(SUM(${xpTransactions.amount}), 0)`,
    })
    .from(pageProgress)
    .leftJoin(
      xpTransactions,
      and(
        eq(xpTransactions.userId, userId),
        sql`DATE(${xpTransactions.createdAt}) = DATE(${pageProgress.lastAccessedAt})`
      )
    )
    .where(
      and(
        eq(pageProgress.userId, userId),
        sql`${pageProgress.lastAccessedAt} >= ${sevenDaysAgo}`
      )
    )
    .groupBy(sql`DATE(${pageProgress.lastAccessedAt})`)
    .orderBy(sql`DATE(${pageProgress.lastAccessedAt})`);
  
  return progress;
}


// ============================================
// Standalone Exercises (Sala de Exercícios)
// ============================================

export async function getAllStandaloneExercises() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(standaloneExercises);
}

export async function getStandaloneExercisesByDiscipline(disciplineId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db
    .select()
    .from(standaloneExercises)
    .where(eq(standaloneExercises.disciplineId, disciplineId));
}

export async function getStandaloneExercisesByDifficulty(difficulty: "easy" | "moderate" | "hard") {
  const db = await getDb();
  if (!db) return [];
  return await db
    .select()
    .from(standaloneExercises)
    .where(eq(standaloneExercises.difficulty, difficulty));
}

export async function getStandaloneExercisesByModule(moduleId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db
    .select()
    .from(standaloneExercises)
    .where(eq(standaloneExercises.moduleId, moduleId));
}

export async function submitStandaloneExercise(
  userId: number,
  exerciseId: number,
  userAnswer: number
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const exercise = await db
    .select()
    .from(standaloneExercises)
    .where(eq(standaloneExercises.id, exerciseId))
    .limit(1);

  if (exercise.length === 0) {
    throw new Error("Exercise not found");
  }

  const isCorrect = exercise[0].correctAnswer === userAnswer;

  await db.insert(standaloneExerciseAttempts).values({
    userId,
    exerciseId,
    isCorrect,
  });

  return { isCorrect, points: isCorrect ? exercise[0].points : 0 };
}

export async function getStandaloneExerciseStats(userId: number) {
  const db = await getDb();
  if (!db) return { totalAttempts: 0, correctAnswers: 0, accuracy: 0 };
  
  const attempts = await db
    .select()
    .from(standaloneExerciseAttempts)
    .where(eq(standaloneExerciseAttempts.userId, userId));

  const total = attempts.length;
  const correct = attempts.filter((a) => a.isCorrect).length;
  const accuracy = total > 0 ? (correct / total) * 100 : 0;

  return {
    totalAttempts: total,
    correctAnswers: correct,
    accuracy: Math.round(accuracy),
  };
}

// ============================================
// Standalone Videos (Sala de Vídeos)
// ============================================

export async function getAllStandaloneVideos() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(standaloneVideos);
}

export async function getStandaloneVideosByDiscipline(disciplineId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db
    .select()
    .from(standaloneVideos)
    .where(eq(standaloneVideos.disciplineId, disciplineId));
}

export async function getStandaloneVideosByModule(moduleId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db
    .select()
    .from(standaloneVideos)
    .where(eq(standaloneVideos.moduleId, moduleId));
}

export async function markVideoAsWatched(userId: number, videoId: number) {
  const db = await getDb();
  if (!db) return;
  await db.insert(standaloneVideoViews).values({
    userId,
    videoId,
  });
}

export async function getWatchedVideos(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db
    .select()
    .from(standaloneVideoViews)
    .where(eq(standaloneVideoViews.userId, userId));
}

export async function getStandaloneVideoStats(userId: number) {
  const watched = await getWatchedVideos(userId);
  return {
    totalWatched: watched.length,
  };
}


// ============================================
// Daily Challenge (Desafio do Dia)
// ============================================

export async function getTodayChallenge() {
  const db = await getDb();
  if (!db) return null;

  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  
  const challenges = await db
    .select()
    .from(dailyChallenges)
    .where(eq(dailyChallenges.challengeDate, today))
    .limit(1);

  if (challenges.length > 0) {
    return challenges[0];
  }

  // Gerar novo desafio para hoje
  return await generateTodayChallenge();
}

export async function generateTodayChallenge() {
  const db = await getDb();
  if (!db) return null;

  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  // Buscar todos os exercícios disponíveis
  const allExercises = await db.select().from(standaloneExercises);

  if (allExercises.length < 3) {
    throw new Error("Not enough exercises to create a daily challenge");
  }

  // Selecionar 3 exercícios aleatórios (1 fácil, 1 moderado, 1 difícil)
  const easyExercises = allExercises.filter((ex) => ex.difficulty === "easy");
  const moderateExercises = allExercises.filter((ex) => ex.difficulty === "moderate");
  const hardExercises = allExercises.filter((ex) => ex.difficulty === "hard");

  const selectedExercises = [];

  if (easyExercises.length > 0) {
    const randomEasy = easyExercises[Math.floor(Math.random() * easyExercises.length)];
    selectedExercises.push(randomEasy.id);
  }

  if (moderateExercises.length > 0) {
    const randomModerate = moderateExercises[Math.floor(Math.random() * moderateExercises.length)];
    selectedExercises.push(randomModerate.id);
  }

  if (hardExercises.length > 0) {
    const randomHard = hardExercises[Math.floor(Math.random() * hardExercises.length)];
    selectedExercises.push(randomHard.id);
  }

  // Se não tiver exercícios suficientes de cada tipo, completar com aleatórios
  while (selectedExercises.length < 3 && allExercises.length >= 3) {
    const randomExercise = allExercises[Math.floor(Math.random() * allExercises.length)];
    if (!selectedExercises.includes(randomExercise.id)) {
      selectedExercises.push(randomExercise.id);
    }
  }

  // Inserir novo desafio no banco
  await db.insert(dailyChallenges).values({
    challengeDate: today,
    exerciseIds: selectedExercises,
  });

  // Buscar e retornar o desafio criado
  const newChallenges = await db
    .select()
    .from(dailyChallenges)
    .where(eq(dailyChallenges.challengeDate, today))
    .limit(1);

  return newChallenges[0];
}

export async function getChallengeExercises(exerciseIds: number[]) {
  const db = await getDb();
  if (!db) return [];

  const exercises = await db
    .select()
    .from(standaloneExercises)
    .where(sql`${standaloneExercises.id} IN (${sql.join(exerciseIds.map((id) => sql`${id}`), sql`, `)})`);

  return exercises;
}

export async function submitDailyChallengeAnswer(
  userId: number,
  challengeId: number,
  exerciseId: number,
  userAnswer: number
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Buscar exercício
  const exercise = await db
    .select()
    .from(standaloneExercises)
    .where(eq(standaloneExercises.id, exerciseId))
    .limit(1);

  if (exercise.length === 0) {
    throw new Error("Exercise not found");
  }

  const isCorrect = exercise[0].correctAnswer === userAnswer;
  const pointsEarned = isCorrect ? exercise[0].points * 2 : 0; // Pontos dobrados!

  // Registrar tentativa
  await db.insert(dailyChallengeAttempts).values({
    userId,
    challengeId,
    exerciseId,
    isCorrect,
    pointsEarned,
  });

  return { isCorrect, pointsEarned };
}

export async function hasCompletedTodayChallenge(userId: number) {
  const db = await getDb();
  if (!db) return false;

  const today = new Date().toISOString().split("T")[0];

  // Buscar desafio de hoje
  const todayChallenge = await db
    .select()
    .from(dailyChallenges)
    .where(eq(dailyChallenges.challengeDate, today))
    .limit(1);

  if (todayChallenge.length === 0) {
    return false;
  }

  // Verificar se usuário completou todos os 3 exercícios
  const attempts = await db
    .select()
    .from(dailyChallengeAttempts)
    .where(
      and(
        eq(dailyChallengeAttempts.userId, userId),
        eq(dailyChallengeAttempts.challengeId, todayChallenge[0].id)
      )
    );

  // Usuário completou se tiver 3 tentativas (uma para cada exercício)
  return attempts.length >= 3;
}

export async function getDailyChallengeStats(userId: number) {
  const db = await getDb();
  if (!db) return { totalChallenges: 0, totalCorrect: 0, totalPoints: 0 };

  const attempts = await db
    .select()
    .from(dailyChallengeAttempts)
    .where(eq(dailyChallengeAttempts.userId, userId));

  const totalChallenges = Math.floor(attempts.length / 3); // 3 exercícios por desafio
  const totalCorrect = attempts.filter((a) => a.isCorrect).length;
  const totalPoints = attempts.reduce((sum, a) => sum + a.pointsEarned, 0);

  return {
    totalChallenges,
    totalCorrect,
    totalPoints,
  };
}
