import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, json } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  hasCompletedOnboarding: boolean("hasCompletedOnboarding").default(false).notNull(),
  avatar: text("avatar"), // URL to S3 avatar image
  language: varchar("language", { length: 10 }).default("pt").notNull(), // pt, en
  themeColor: varchar("themeColor", { length: 20 }).default("blue").notNull(), // blue, red, green
  darkMode: boolean("darkMode").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Disciplines (e.g., Matemática, Física)
 */
export const disciplines = mysqlTable("disciplines", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  order: int("order").notNull().default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Discipline = typeof disciplines.$inferSelect;
export type InsertDiscipline = typeof disciplines.$inferInsert;

/**
 * Modules within a discipline (e.g., Adição e Subtração, Multiplicação)
 */
export const modules = mysqlTable("modules", {
  id: int("id").autoincrement().primaryKey(),
  disciplineId: int("disciplineId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull(),
  description: text("description"),
  order: int("order").notNull().default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Module = typeof modules.$inferSelect;
export type InsertModule = typeof modules.$inferInsert;

/**
 * Pages/Lessons within a module
 */
export const pages = mysqlTable("pages", {
  id: int("id").autoincrement().primaryKey(),
  moduleId: int("moduleId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull(),
  order: int("order").notNull().default(0),
  
  // Content sections
  mainText: text("mainText"), // Texto principal (Fio Condutor)
  conceptSummary: text("conceptSummary"), // Consolidação conceitual
  
  // Visual resources
  diagrams: json("diagrams").$type<Array<{ url: string; caption: string }>>(),
  videoUrl: varchar("videoUrl", { length: 500 }),
  
  // Metadata
  estimatedMinutes: int("estimatedMinutes").default(30),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Page = typeof pages.$inferSelect;
export type InsertPage = typeof pages.$inferInsert;

/**
 * Exercises within a page
 */
export const exercises = mysqlTable("exercises", {
  id: int("id").autoincrement().primaryKey(),
  pageId: int("pageId").notNull(),
  order: int("order").notNull().default(0),
  
  // Exercise content
  type: mysqlEnum("type", ["simple_input", "practical_problem", "multiple_choice"]).notNull(),
  question: text("question").notNull(),
  description: text("description"), // Additional context
  
  // Answer validation
  expectedAnswer: text("expectedAnswer").notNull(), // For simple inputs
  alternativeAnswers: json("alternativeAnswers").$type<string[]>(), // Accept multiple correct answers
  hints: json("hints").$type<string[]>(),
  
  // Multiple choice options (if type is multiple_choice)
  options: json("options").$type<Array<{ id: string; text: string }>>(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Exercise = typeof exercises.$inferSelect;
export type InsertExercise = typeof exercises.$inferInsert;

/**
 * User progress on pages
 */
export const pageProgress = mysqlTable("pageProgress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  pageId: int("pageId").notNull(),
  
  completed: boolean("completed").default(false).notNull(),
  score: int("score").default(0).notNull(), // Percentage 0-100
  lastAccessedAt: timestamp("lastAccessedAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PageProgress = typeof pageProgress.$inferSelect;
export type InsertPageProgress = typeof pageProgress.$inferInsert;

/**
 * User attempts on exercises
 */
export const exerciseAttempts = mysqlTable("exerciseAttempts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  exerciseId: int("exerciseId").notNull(),
  
  answer: text("answer").notNull(),
  isCorrect: boolean("isCorrect").notNull(),
  attemptNumber: int("attemptNumber").notNull().default(1),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ExerciseAttempt = typeof exerciseAttempts.$inferSelect;
export type InsertExerciseAttempt = typeof exerciseAttempts.$inferInsert;

/**
 * Generated exercises by LLM
 */
export const generatedExercises = mysqlTable("generatedExercises", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  pageId: int("pageId").notNull(),
  
  question: text("question").notNull(),
  expectedAnswer: text("expectedAnswer").notNull(),
  difficulty: mysqlEnum("difficulty", ["easy", "medium", "hard"]).notNull(),
  
  // Track if user completed it
  completed: boolean("completed").default(false).notNull(),
  isCorrect: boolean("isCorrect"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type GeneratedExercise = typeof generatedExercises.$inferSelect;
export type InsertGeneratedExercise = typeof generatedExercises.$inferInsert;

/**
 * User achievements and milestones
 */
export const achievements = mysqlTable("achievements", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  
  type: mysqlEnum("type", ["module_completed", "perfect_score", "streak", "first_lesson"]).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  
  // Related entity (module, page, etc.)
  relatedId: int("relatedId"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Achievement = typeof achievements.$inferSelect;
export type InsertAchievement = typeof achievements.$inferInsert;

/**
 * User streaks (daily activity tracking)
 */
export const streaks = mysqlTable("streaks", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  
  currentStreak: int("currentStreak").default(0).notNull(),
  longestStreak: int("longestStreak").default(0).notNull(),
  lastActivityDate: timestamp("lastActivityDate"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Streak = typeof streaks.$inferSelect;
export type InsertStreak = typeof streaks.$inferInsert;

/**
 * User points log (accumulative gamification system)
 * Tracks points earned from various actions (login, video, exercise, podcast, task)
 */
export const userPointsLog = mysqlTable("userPointsLog", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  
  action: mysqlEnum("action", ["daily_login", "video_watched", "exercise_completed", "podcast_listened", "task_completed", "daily_challenge_completed"]).notNull(),
  points: int("points").notNull(),
  
  // Optional metadata
  relatedId: int("relatedId"), // pageId, exerciseId, etc.
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type UserPointsLog = typeof userPointsLog.$inferSelect;
export type InsertUserPointsLog = typeof userPointsLog.$inferInsert;

/**
 * User XP (experience points) and levels
 */
export const userXP = mysqlTable("userXP", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  
  totalXP: int("totalXP").default(0).notNull(),
  level: int("level").default(1).notNull(),
  xpToNextLevel: int("xpToNextLevel").default(100).notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserXP = typeof userXP.$inferSelect;
export type InsertUserXP = typeof userXP.$inferInsert;

/**
 * XP transactions (history of XP gains)
 */
export const xpTransactions = mysqlTable("xpTransactions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  
  amount: int("amount").notNull(),
  reason: varchar("reason", { length: 255 }).notNull(), // "lesson_completed", "perfect_score", etc.
  relatedId: int("relatedId"), // pageId, exerciseId, etc.
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type XPTransaction = typeof xpTransactions.$inferSelect;
export type InsertXPTransaction = typeof xpTransactions.$inferInsert;


/**
 * User enrollments in disciplines
 */
export const userEnrollments = mysqlTable("userEnrollments", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  disciplineId: int("disciplineId").notNull(),
  enrolledAt: timestamp("enrolledAt").defaultNow().notNull(),
});

export type UserEnrollment = typeof userEnrollments.$inferSelect;
export type InsertUserEnrollment = typeof userEnrollments.$inferInsert;

/**
 * Standalone Exercises (Sala de Exercícios)
 * Exercícios independentes organizados por disciplina/módulo/página
 */
export const standaloneExercises = mysqlTable("standalone_exercises", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  question: text("question").notNull(),
  options: json("options").notNull(), // Array de strings: ["Opção A", "Opção B", "Opção C", "Opção D"]
  correctAnswer: int("correctAnswer").notNull(), // Índice da opção correta (0-3)
  difficulty: mysqlEnum("difficulty", ["easy", "moderate", "hard"]).notNull(), // fácil, moderado, difícil
  points: int("points").notNull(), // 5 (fácil), 10 (moderado), 15 (difícil)
  disciplineId: int("disciplineId"), // Opcional: vinculado a disciplina
  moduleId: int("moduleId"), // Opcional: vinculado a módulo
  pageId: int("pageId"), // Opcional: vinculado a página
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type StandaloneExercise = typeof standaloneExercises.$inferSelect;
export type InsertStandaloneExercise = typeof standaloneExercises.$inferInsert;

/**
 * Standalone Exercise Attempts (Tentativas de Exercícios Standalone)
 * Rastreia tentativas dos usuários em exercícios da Sala de Exercícios
 */
export const standaloneExerciseAttempts = mysqlTable("standalone_exercise_attempts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  exerciseId: int("exerciseId").notNull(),
  isCorrect: boolean("isCorrect").notNull(),
  attemptedAt: timestamp("attemptedAt").defaultNow().notNull(),
});

export type StandaloneExerciseAttempt = typeof standaloneExerciseAttempts.$inferSelect;
export type InsertStandaloneExerciseAttempt = typeof standaloneExerciseAttempts.$inferInsert;

/**
 * Standalone Videos (Sala de Vídeos)
 * Vídeos do YouTube organizados por disciplina/módulo/página
 */
export const standaloneVideos = mysqlTable("standalone_videos", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  youtubeId: varchar("youtubeId", { length: 20 }).notNull(), // ID do vídeo do YouTube
  duration: varchar("duration", { length: 20 }), // Duração (ex: "5:30")
  description: text("description"),
  disciplineId: int("disciplineId"), // Opcional: vinculado a disciplina
  moduleId: int("moduleId"), // Opcional: vinculado a módulo
  pageId: int("pageId"), // Opcional: vinculado a página
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type StandaloneVideo = typeof standaloneVideos.$inferSelect;
export type InsertStandaloneVideo = typeof standaloneVideos.$inferInsert;

/**
 * Standalone Video Views (Visualizações de Vídeos Standalone)
 * Rastreia quando usuários assistem vídeos da Sala de Vídeos
 */
export const standaloneVideoViews = mysqlTable("standalone_video_views", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  videoId: int("videoId").notNull(),
  watchedAt: timestamp("watchedAt").defaultNow().notNull(),
});

export type StandaloneVideoView = typeof standaloneVideoViews.$inferSelect;
export type InsertStandaloneVideoView = typeof standaloneVideoViews.$inferInsert;

/**
 * Daily Challenges (Desafio do Dia)
 * Armazena os desafios diários gerados automaticamente
 */
export const dailyChallenges = mysqlTable("daily_challenges", {
  id: int("id").autoincrement().primaryKey(),
  challengeDate: varchar("challengeDate", { length: 10 }).notNull(), // Data do desafio (YYYY-MM-DD)
  exerciseIds: json("exerciseIds").notNull(), // Array de 3 IDs de exercícios [id1, id2, id3]
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type DailyChallenge = typeof dailyChallenges.$inferSelect;
export type InsertDailyChallenge = typeof dailyChallenges.$inferInsert;

/**
 * Daily Challenge Attempts (Tentativas de Desafio Diário)
 * Rastreia quando usuários completam o desafio do dia
 */
export const dailyChallengeAttempts = mysqlTable("daily_challenge_attempts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  challengeId: int("challengeId").notNull(),
  exerciseId: int("exerciseId").notNull(), // Qual exercício do desafio
  isCorrect: boolean("isCorrect").notNull(),
  pointsEarned: int("pointsEarned").notNull(), // Pontos dobrados: 10/20/30
  attemptedAt: timestamp("attemptedAt").defaultNow().notNull(),
});

export type DailyChallengeAttempt = typeof dailyChallengeAttempts.$inferSelect;
export type InsertDailyChallengeAttempt = typeof dailyChallengeAttempts.$inferInsert;


/**
 * Achievement Definitions (Definições de Conquistas)
 * Define todas as conquistas disponíveis no sistema
 */
export const achievementDefinitions = mysqlTable("achievement_definitions", {
  id: int("id").autoincrement().primaryKey(),
  key: varchar("key", { length: 100 }).notNull().unique(), // Chave única (ex: "first_lesson", "streak_7_days")
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  icon: varchar("icon", { length: 50 }).notNull(), // Nome do ícone lucide-react
  category: mysqlEnum("category", ["learning", "streak", "mastery", "practice"]).notNull(),
  requirement: int("requirement").notNull(), // Quantidade necessária (ex: 1 aula, 7 dias, 50 exercícios)
  order: int("order").notNull().default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AchievementDefinition = typeof achievementDefinitions.$inferSelect;
export type InsertAchievementDefinition = typeof achievementDefinitions.$inferInsert;

/**
 * User Achievements (Conquistas do Usuário)
 * Rastreia quais conquistas cada usuário desbloqueou
 */
export const userAchievements = mysqlTable("user_achievements", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  achievementId: int("achievementId").notNull(), // Referência para achievement_definitions
  unlockedAt: timestamp("unlockedAt").defaultNow().notNull(),
});

export type UserAchievement = typeof userAchievements.$inferSelect;
export type InsertUserAchievement = typeof userAchievements.$inferInsert;
