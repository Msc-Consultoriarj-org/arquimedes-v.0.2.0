import { describe, expect, it, beforeAll, afterAll } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import * as db from "./db";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(userId: number = 1): TrpcContext {
  const user: AuthenticatedUser = {
    id: userId,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("Disciplines Router", () => {
  it("should list all disciplines", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const disciplines = await caller.disciplines.list();

    expect(disciplines).toBeDefined();
    expect(Array.isArray(disciplines)).toBe(true);
    expect(disciplines.length).toBeGreaterThan(0);
    expect(disciplines[0]).toHaveProperty("name");
    expect(disciplines[0]).toHaveProperty("slug");
  });

  it("should get discipline by slug", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const discipline = await caller.disciplines.getBySlug({ slug: "matematica-basica" });

    expect(discipline).toBeDefined();
    expect(discipline?.name).toBe("Matemática Básica");
    expect(discipline?.slug).toBe("matematica-basica");
  });
});

describe("Modules Router", () => {
  it("should list modules by discipline", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    // First get discipline
    const discipline = await caller.disciplines.getBySlug({ slug: "matematica-basica" });
    expect(discipline).toBeDefined();

    // Then get modules
    const modules = await caller.modules.listByDiscipline({ disciplineId: discipline!.id });

    expect(modules).toBeDefined();
    expect(Array.isArray(modules)).toBe(true);
    expect(modules.length).toBeGreaterThan(0);
    expect(modules[0]).toHaveProperty("name");
    expect(modules[0]).toHaveProperty("slug");
  });

  it("should get module by slug", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const discipline = await caller.disciplines.getBySlug({ slug: "matematica-basica" });
    const module = await caller.modules.getBySlug({
      disciplineId: discipline!.id,
      slug: "adicao-subtracao",
    });

    expect(module).toBeDefined();
    expect(module?.name).toBe("Adição e Subtração");
    expect(module?.slug).toBe("adicao-subtracao");
  });
});

describe("Pages Router", () => {
  it("should list pages by module", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const discipline = await caller.disciplines.getBySlug({ slug: "matematica-basica" });
    const module = await caller.modules.getBySlug({
      disciplineId: discipline!.id,
      slug: "adicao-subtracao",
    });

    const pages = await caller.pages.listByModule({ moduleId: module!.id });

    expect(pages).toBeDefined();
    expect(Array.isArray(pages)).toBe(true);
    expect(pages.length).toBeGreaterThan(0);
    expect(pages[0]).toHaveProperty("title");
    expect(pages[0]).toHaveProperty("slug");
    expect(pages[0]).toHaveProperty("mainText");
  });

  it("should get page by slug", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const discipline = await caller.disciplines.getBySlug({ slug: "matematica-basica" });
    const module = await caller.modules.getBySlug({
      disciplineId: discipline!.id,
      slug: "adicao-subtracao",
    });

    const page = await caller.pages.getBySlug({
      moduleId: module!.id,
      slug: "o-que-e-adicionar",
    });

    expect(page).toBeDefined();
    expect(page?.title).toContain("Adicionar");
    expect(page?.mainText).toBeDefined();
    expect(page?.conceptSummary).toBeDefined();
  });
});

describe("Exercises Router", () => {
  it("should list exercises by page", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const discipline = await caller.disciplines.getBySlug({ slug: "matematica-basica" });
    const module = await caller.modules.getBySlug({
      disciplineId: discipline!.id,
      slug: "adicao-subtracao",
    });
    const page = await caller.pages.getBySlug({
      moduleId: module!.id,
      slug: "o-que-e-adicionar",
    });

    const exercises = await caller.exercises.listByPage({ pageId: page!.id });

    expect(exercises).toBeDefined();
    expect(Array.isArray(exercises)).toBe(true);
    expect(exercises.length).toBeGreaterThan(0);
    expect(exercises[0]).toHaveProperty("question");
    expect(exercises[0]).toHaveProperty("expectedAnswer");
  });

  it("should submit correct answer", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const discipline = await caller.disciplines.getBySlug({ slug: "matematica-basica" });
    const module = await caller.modules.getBySlug({
      disciplineId: discipline!.id,
      slug: "adicao-subtracao",
    });
    const page = await caller.pages.getBySlug({
      moduleId: module!.id,
      slug: "o-que-e-adicionar",
    });
    const exercises = await caller.exercises.listByPage({ pageId: page!.id });

    // Submit correct answer (7 + 8 = 15)
    const result = await caller.exercises.submit({
      exerciseId: exercises[0]!.id,
      answer: "8",
    });

    expect(result).toBeDefined();
    expect(result.isCorrect).toBe(true);
    expect(result.attemptNumber).toBeGreaterThan(0);
  });

  it("should submit incorrect answer", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const discipline = await caller.disciplines.getBySlug({ slug: "matematica-basica" });
    const module = await caller.modules.getBySlug({
      disciplineId: discipline!.id,
      slug: "adicao-subtracao",
    });
    const page = await caller.pages.getBySlug({
      moduleId: module!.id,
      slug: "o-que-e-adicionar",
    });
    const exercises = await caller.exercises.listByPage({ pageId: page!.id });

    const result = await caller.exercises.submit({
      exerciseId: exercises[0]!.id,
      answer: "999",
    });

    expect(result).toBeDefined();
    expect(result.isCorrect).toBe(false);
    expect(result.correctAnswer).toBeDefined();
  });
});

describe("Progress Router", () => {
  it("should update page progress", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const discipline = await caller.disciplines.getBySlug({ slug: "matematica-basica" });
    const module = await caller.modules.getBySlug({
      disciplineId: discipline!.id,
      slug: "adicao-subtracao",
    });
    const page = await caller.pages.getBySlug({
      moduleId: module!.id,
      slug: "o-que-e-adicionar",
    });

    const result = await caller.progress.updatePage({
      pageId: page!.id,
      completed: true,
      score: 100,
    });

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
  });

  it("should get user progress", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const progress = await caller.progress.getAll();

    expect(progress).toBeDefined();
    expect(Array.isArray(progress)).toBe(true);
  });
});

describe("Dashboard Router", () => {
  it("should get dashboard summary", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const summary = await caller.dashboard.summary();

    expect(summary).toBeDefined();
    expect(summary).toHaveProperty("completedPages");
    expect(summary).toHaveProperty("totalAchievements");
    expect(summary).toHaveProperty("averageScore");
    expect(typeof summary.completedPages).toBe("number");
    expect(typeof summary.averageScore).toBe("number");
  });

  it("should get recommendations", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const recommendation = await caller.dashboard.recommendations();

    // Recommendation might be null if all content is completed
    if (recommendation) {
      expect(recommendation).toHaveProperty("discipline");
      expect(recommendation).toHaveProperty("module");
      expect(recommendation).toHaveProperty("page");
    }
  });
});
