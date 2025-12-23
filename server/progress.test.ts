import { describe, it, expect } from "vitest";

describe("Progress Calculations", () => {
  // Helper function to calculate module progress (same logic as frontend)
  function calculateModuleProgress(
    pages: { id: number }[],
    allProgress: { pageId: number; completed: boolean }[]
  ): { completedPages: number; progressPercentage: number; isComplete: boolean } {
    const completedPages = pages.filter((page) =>
      allProgress.some((p) => p.pageId === page.id && p.completed)
    ).length;

    const progressPercentage =
      pages.length > 0 ? Math.round((completedPages / pages.length) * 100) : 0;

    const isComplete = progressPercentage === 100;

    return { completedPages, progressPercentage, isComplete };
  }

  it("should calculate 0% progress for module with no completed pages", () => {
    const pages = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const allProgress: { pageId: number; completed: boolean }[] = [];

    const result = calculateModuleProgress(pages, allProgress);

    expect(result.progressPercentage).toBe(0);
    expect(result.completedPages).toBe(0);
    expect(result.isComplete).toBe(false);
  });

  it("should calculate 33% progress for module with 1 of 3 pages completed", () => {
    const pages = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const allProgress = [{ pageId: 1, completed: true }];

    const result = calculateModuleProgress(pages, allProgress);

    expect(result.progressPercentage).toBe(33);
    expect(result.completedPages).toBe(1);
    expect(result.isComplete).toBe(false);
  });

  it("should calculate 67% progress for module with 2 of 3 pages completed", () => {
    const pages = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const allProgress = [
      { pageId: 1, completed: true },
      { pageId: 2, completed: true },
    ];

    const result = calculateModuleProgress(pages, allProgress);

    expect(result.progressPercentage).toBe(67);
    expect(result.completedPages).toBe(2);
    expect(result.isComplete).toBe(false);
  });

  it("should calculate 100% progress for module with all pages completed", () => {
    const pages = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const allProgress = [
      { pageId: 1, completed: true },
      { pageId: 2, completed: true },
      { pageId: 3, completed: true },
    ];

    const result = calculateModuleProgress(pages, allProgress);

    expect(result.progressPercentage).toBe(100);
    expect(result.completedPages).toBe(3);
    expect(result.isComplete).toBe(true);
  });

  it("should handle module with no pages gracefully", () => {
    const pages: { id: number }[] = [];
    const allProgress: { pageId: number; completed: boolean }[] = [];

    const result = calculateModuleProgress(pages, allProgress);

    expect(result.progressPercentage).toBe(0);
    expect(result.completedPages).toBe(0);
    expect(result.isComplete).toBe(false);
  });

  it("should not count incomplete pages in progress calculation", () => {
    const pages = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const allProgress = [
      { pageId: 1, completed: false },
      { pageId: 2, completed: false },
    ];

    const result = calculateModuleProgress(pages, allProgress);

    expect(result.progressPercentage).toBe(0);
    expect(result.completedPages).toBe(0);
    expect(result.isComplete).toBe(false);
  });

  it("should handle user with no progress records", () => {
    const pages = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const allProgress: { pageId: number; completed: boolean }[] = [];

    const result = calculateModuleProgress(pages, allProgress);

    expect(result.progressPercentage).toBe(0);
    expect(result.completedPages).toBe(0);
    expect(result.isComplete).toBe(false);
  });

  it("should calculate 50% progress for module with 2 of 4 pages completed", () => {
    const pages = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
    const allProgress = [
      { pageId: 1, completed: true },
      { pageId: 3, completed: true },
    ];

    const result = calculateModuleProgress(pages, allProgress);

    expect(result.progressPercentage).toBe(50);
    expect(result.completedPages).toBe(2);
    expect(result.isComplete).toBe(false);
  });

  it("should ignore progress for pages not in module", () => {
    const pages = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const allProgress = [
      { pageId: 1, completed: true },
      { pageId: 99, completed: true }, // Page not in module
      { pageId: 100, completed: true }, // Page not in module
    ];

    const result = calculateModuleProgress(pages, allProgress);

    expect(result.progressPercentage).toBe(33);
    expect(result.completedPages).toBe(1);
    expect(result.isComplete).toBe(false);
  });

  it("should handle mixed completed and incomplete progress correctly", () => {
    const pages = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
    const allProgress = [
      { pageId: 1, completed: true },
      { pageId: 2, completed: false },
      { pageId: 3, completed: true },
      { pageId: 4, completed: false },
    ];

    const result = calculateModuleProgress(pages, allProgress);

    expect(result.progressPercentage).toBe(50);
    expect(result.completedPages).toBe(2);
    expect(result.isComplete).toBe(false);
  });
});
