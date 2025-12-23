import { drizzle } from "drizzle-orm/mysql2";
import { achievementDefinitions } from "../drizzle/schema.ts";
import { eq } from "drizzle-orm";
import dotenv from "dotenv";

dotenv.config();

const db = drizzle(process.env.DATABASE_URL);

const achievements = [
  {
    key: "first_lesson",
    title: "Primeira Aula",
    description: "Complete sua primeira aula",
    icon: "BookOpen",
    category: "learning",
    requirement: 1,
    order: 1,
  },
  {
    key: "dedicated_student",
    title: "Estudante Dedicado",
    description: "Complete 5 aulas",
    icon: "GraduationCap",
    category: "learning",
    requirement: 5,
    order: 2,
  },
  {
    key: "streak_3_days",
    title: "Sequência de 3 Dias",
    description: "Acesse a plataforma por 3 dias consecutivos",
    icon: "Flame",
    category: "streak",
    requirement: 3,
    order: 3,
  },
  {
    key: "streak_7_days",
    title: "Sequência de 7 Dias",
    description: "Acesse a plataforma por 7 dias consecutivos",
    icon: "Zap",
    category: "streak",
    requirement: 7,
    order: 4,
  },
  {
    key: "master_addition",
    title: "Mestre da Adição",
    description: "Complete o módulo de Adição e Subtração",
    icon: "Plus",
    category: "mastery",
    requirement: 1,
    order: 5,
  },
  {
    key: "master_multiplication",
    title: "Mestre da Multiplicação",
    description: "Complete o módulo de Multiplicação",
    icon: "X",
    category: "mastery",
    requirement: 1,
    order: 6,
  },
  {
    key: "master_division",
    title: "Mestre da Divisão",
    description: "Complete o módulo de Divisão",
    icon: "Divide",
    category: "mastery",
    requirement: 1,
    order: 7,
  },
  {
    key: "explorer",
    title: "Explorador",
    description: "Assista 10 vídeos educacionais",
    icon: "Video",
    category: "practice",
    requirement: 10,
    order: 8,
  },
  {
    key: "practitioner",
    title: "Praticante",
    description: "Complete 50 exercícios corretamente",
    icon: "Target",
    category: "practice",
    requirement: 50,
    order: 9,
  },
  {
    key: "champion",
    title: "Campeão",
    description: "Complete 10 desafios do dia",
    icon: "Trophy",
    category: "practice",
    requirement: 10,
    order: 10,
  },
];

async function seedAchievements() {
  console.log("🏆 Populando conquistas...");

  for (const achievement of achievements) {
    try {
      // Check if achievement already exists
      const existing = await db
        .select()
        .from(achievementDefinitions)
        .where(eq(achievementDefinitions.key, achievement.key))
        .limit(1);

      if (existing.length === 0) {
        await db.insert(achievementDefinitions).values(achievement);
        console.log(`✅ Conquista criada: ${achievement.title}`);
      } else {
        console.log(`⏭️  Conquista já existe: ${achievement.title}`);
      }
    } catch (error) {
      console.error(`❌ Erro ao criar conquista ${achievement.title}:`, error);
    }
  }

  console.log("✅ Seed de conquistas concluído!");
  process.exit(0);
}

seedAchievements();
