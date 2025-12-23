/**
 * Schema PostgreSQL para Supabase
 * Compatível com o schema MySQL existente
 */

import { pgTable, serial, varchar, text, timestamp, integer, pgEnum, json } from "drizzle-orm/pg-core";

// Enum para roles
export const roleEnum = pgEnum('role', ['user', 'admin']);

/**
 * Tabela de usuários
 */
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: roleEnum("role").default('user').notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

/**
 * Tabela de disciplinas
 */
export const disciplines = pgTable("disciplines", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  icon: varchar("icon", { length: 50 }),
  orderIndex: integer("orderIndex").notNull().default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

/**
 * Tabela de módulos
 */
export const modules = pgTable("modules", {
  id: serial("id").primaryKey(),
  disciplineId: integer("disciplineId").notNull().references(() => disciplines.id),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull(),
  description: text("description"),
  orderIndex: integer("orderIndex").notNull().default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

/**
 * Tabela de páginas/aulas
 */
export const pages = pgTable("pages", {
  id: serial("id").primaryKey(),
  moduleId: integer("moduleId").notNull().references(() => modules.id),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull(),
  mainText: text("mainText"),
  conceptSummary: text("conceptSummary"),
  diagrams: json("diagrams"),
  videoUrl: varchar("videoUrl", { length: 500 }),
  imageUrl: varchar("imageUrl", { length: 500 }),
  orderIndex: integer("orderIndex").notNull().default(0),
  estimatedMinutes: integer("estimatedMinutes").default(15),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

/**
 * Tabela de exercícios
 */
export const exercises = pgTable("exercises", {
  id: serial("id").primaryKey(),
  pageId: integer("pageId").notNull().references(() => pages.id),
  question: text("question").notNull(),
  correctAnswer: varchar("correctAnswer", { length: 500 }).notNull(),
  alternativeAnswers: json("alternativeAnswers"),
  type: varchar("type", { length: 50 }).notNull().default('simple'),
  orderIndex: integer("orderIndex").notNull().default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

/**
 * Tabela de tentativas de exercícios
 */
export const exerciseAttempts = pgTable("exerciseAttempts", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull().references(() => users.id),
  exerciseId: integer("exerciseId").notNull().references(() => exercises.id),
  userAnswer: varchar("userAnswer", { length: 500 }).notNull(),
  isCorrect: integer("isCorrect").notNull(), // 0 ou 1 (boolean)
  attemptedAt: timestamp("attemptedAt").defaultNow().notNull(),
});

/**
 * Tabela de progresso do usuário
 */
export const userProgress = pgTable("userProgress", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull().references(() => users.id),
  pageId: integer("pageId").notNull().references(() => pages.id),
  completed: integer("completed").notNull().default(0), // 0 ou 1 (boolean)
  score: integer("score").default(0),
  completedAt: timestamp("completedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

// Tipos inferidos
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export type Discipline = typeof disciplines.$inferSelect;
export type InsertDiscipline = typeof disciplines.$inferInsert;

export type Module = typeof modules.$inferSelect;
export type InsertModule = typeof modules.$inferInsert;

export type Page = typeof pages.$inferSelect;
export type InsertPage = typeof pages.$inferInsert;

export type Exercise = typeof exercises.$inferSelect;
export type InsertExercise = typeof exercises.$inferInsert;

export type ExerciseAttempt = typeof exerciseAttempts.$inferSelect;
export type InsertExerciseAttempt = typeof exerciseAttempts.$inferInsert;

export type UserProgress = typeof userProgress.$inferSelect;
export type InsertUserProgress = typeof userProgress.$inferInsert;
