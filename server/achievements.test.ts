import { describe, it, expect, beforeAll } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import * as db from "./db";

describe("Achievements System", () => {
  const mockUser = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus" as const,
    role: "user" as const,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const createMockContext = (): TrpcContext => ({
    user: mockUser,
    req: {} as any,
    res: {
      cookie: () => {},
      clearCookie: () => {},
    } as any,
  });

  beforeAll(async () => {
    // Ensure achievement definitions exist
    const definitions = await db.getAllAchievementDefinitions();
    expect(definitions.length).toBeGreaterThan(0);
  });

  it("should list all achievement definitions", async () => {
    const caller = appRouter.createCaller(createMockContext());
    const achievements = await caller.achievements.listAll();

    expect(achievements).toBeDefined();
    expect(Array.isArray(achievements)).toBe(true);
    expect(achievements.length).toBeGreaterThanOrEqual(10);

    // Check structure of first achievement
    if (achievements.length > 0) {
      const first = achievements[0];
      expect(first).toHaveProperty("id");
      expect(first).toHaveProperty("key");
      expect(first).toHaveProperty("title");
      expect(first).toHaveProperty("description");
      expect(first).toHaveProperty("icon");
      expect(first).toHaveProperty("category");
      expect(first).toHaveProperty("requirement");
    }
  });

  it("should get user achievements with unlocked status", async () => {
    const caller = appRouter.createCaller(createMockContext());
    const userAchievements = await caller.achievements.getUserAchievements();

    expect(userAchievements).toBeDefined();
    expect(Array.isArray(userAchievements)).toBe(true);

    // Each achievement should have unlocked status
    userAchievements.forEach((achievement) => {
      expect(achievement).toHaveProperty("unlocked");
      expect(typeof achievement.unlocked).toBe("boolean");
      if (achievement.unlocked) {
        expect(achievement).toHaveProperty("unlockedAt");
      }
    });
  });

  it("should check and award achievements", async () => {
    const caller = appRouter.createCaller(createMockContext());
    const result = await caller.achievements.checkProgress();

    expect(result).toBeDefined();
    expect(result).toHaveProperty("newAchievements");
    expect(Array.isArray(result.newAchievements)).toBe(true);
  });

  it("should have correct achievement categories", async () => {
    const definitions = await db.getAllAchievementDefinitions();
    const categories = new Set(definitions.map((d) => d.category));

    expect(categories.has("learning")).toBe(true);
    expect(categories.has("streak")).toBe(true);
    expect(categories.has("mastery")).toBe(true);
    expect(categories.has("practice")).toBe(true);
  });

  it("should have unique achievement keys", async () => {
    const definitions = await db.getAllAchievementDefinitions();
    const keys = definitions.map((d) => d.key);
    const uniqueKeys = new Set(keys);

    expect(keys.length).toBe(uniqueKeys.size);
  });

  it("should have specific achievement keys", async () => {
    const definitions = await db.getAllAchievementDefinitions();
    const keys = definitions.map((d) => d.key);

    expect(keys).toContain("first_lesson");
    expect(keys).toContain("dedicated_student");
    expect(keys).toContain("streak_3_days");
    expect(keys).toContain("streak_7_days");
    expect(keys).toContain("master_addition");
    expect(keys).toContain("master_multiplication");
    expect(keys).toContain("master_division");
    expect(keys).toContain("explorer");
    expect(keys).toContain("practitioner");
    expect(keys).toContain("champion");
  });
});
