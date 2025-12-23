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
