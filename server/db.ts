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
  achievements, Achievement, InsertAchievement
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

export async function getUserAchievements(userId: number): Promise<Achievement[]> {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(achievements)
    .where(eq(achievements.userId, userId))
    .orderBy(desc(achievements.createdAt));
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
