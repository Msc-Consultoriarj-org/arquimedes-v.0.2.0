import { drizzle } from "drizzle-orm/mysql2";
import { disciplines, modules, standaloneExercises, standaloneVideos } from "../drizzle/schema.ts";
import { eq } from "drizzle-orm";

const db = drizzle(process.env.DATABASE_URL);

console.log("🔗 Vinculando exercícios e vídeos aos módulos...\n");

// Get Aritmética discipline
const aritmetica = await db.select().from(disciplines).where(eq(disciplines.slug, "aritmetica")).limit(1);
if (aritmetica.length === 0) {
  console.log("❌ Disciplina Aritmética não encontrada");
  process.exit(1);
}

const disciplineId = aritmetica[0].id;
console.log(`✅ Disciplina Aritmética encontrada (ID: ${disciplineId})\n`);

// Get all modules
const mods = await db.select().from(modules).where(eq(modules.disciplineId, disciplineId));
console.log(`✅ ${mods.length} módulos encontrados\n`);

// Module mapping by keywords in title/question
const moduleKeywords = {
  "Adição e Subtração": ["adição", "subtração", "somar", "subtrair", "soma", "diferença", "+", "-"],
  "Multiplicação": ["multiplicação", "multiplicar", "produto", "vezes", "×", "*"],
  "Divisão": ["divisão", "dividir", "quociente", "÷", "/"],
  "Frações": ["fração", "frações", "numerador", "denominador", "meio", "terço", "quarto"],
  "Números Decimais": ["decimal", "decimais", "vírgula", "centésimo", "milésimo"],
  "Porcentagem": ["porcentagem", "%", "por cento", "percentual"],
  "Razão e Proporção": ["razão", "proporção", "proporcional", "diretamente", "inversamente"],
  "Potenciação": ["potência", "potenciação", "elevado", "ao quadrado", "ao cubo", "^"],
  "Radiciação": ["raiz", "radiciação", "√", "raiz quadrada", "raiz cúbica"],
};

// Get module IDs by name
const moduleMap = {};
mods.forEach((m) => {
  moduleMap[m.name] = m.id;
});

console.log("📝 Vinculando exercícios...\n");

// Get all exercises
const exercises = await db.select().from(standaloneExercises);
console.log(`Total de exercícios: ${exercises.length}`);

let exercisesUpdated = 0;

for (const exercise of exercises) {
  let moduleId = null;
  
  // Try to match by keywords
  const text = `${exercise.title} ${exercise.question}`.toLowerCase();
  
  for (const [moduleName, keywords] of Object.entries(moduleKeywords)) {
    if (keywords.some((keyword) => text.includes(keyword.toLowerCase()))) {
      moduleId = moduleMap[moduleName];
      if (moduleId) break;
    }
  }
  
  // If no match, assign to first module (Adição e Subtração)
  if (!moduleId) {
    moduleId = mods[0].id;
  }
  
  // Update exercise
  await db
    .update(standaloneExercises)
    .set({ moduleId, disciplineId })
    .where(eq(standaloneExercises.id, exercise.id));
  
  exercisesUpdated++;
}

console.log(`✅ ${exercisesUpdated} exercícios vinculados aos módulos\n`);

console.log("🎥 Vinculando vídeos...\n");

// Get all videos
const videos = await db.select().from(standaloneVideos);
console.log(`Total de vídeos: ${videos.length}`);

let videosUpdated = 0;

for (const video of videos) {
  let moduleId = null;
  
  // Try to match by keywords
  const text = `${video.title} ${video.description || ""}`.toLowerCase();
  
  for (const [moduleName, keywords] of Object.entries(moduleKeywords)) {
    if (keywords.some((keyword) => text.includes(keyword.toLowerCase()))) {
      moduleId = moduleMap[moduleName];
      if (moduleId) break;
    }
  }
  
  // If no match, assign to first module (Adição e Subtração)
  if (!moduleId) {
    moduleId = mods[0].id;
  }
  
  // Update video
  await db
    .update(standaloneVideos)
    .set({ moduleId, disciplineId })
    .where(eq(standaloneVideos.id, video.id));
  
  videosUpdated++;
}

console.log(`✅ ${videosUpdated} vídeos vinculados aos módulos\n`);

// Show distribution
console.log("📊 Distribuição por módulo:\n");

for (const mod of mods) {
  const exCount = exercises.filter((ex) => {
    const text = `${ex.title} ${ex.question}`.toLowerCase();
    const keywords = moduleKeywords[mod.name] || [];
    return keywords.some((k) => text.includes(k.toLowerCase()));
  }).length;
  
  const vidCount = videos.filter((v) => {
    const text = `${v.title} ${v.description || ""}`.toLowerCase();
    const keywords = moduleKeywords[mod.name] || [];
    return keywords.some((k) => text.includes(k.toLowerCase()));
  }).length;
  
  console.log(`${mod.name}: ${exCount} exercícios, ${vidCount} vídeos`);
}

console.log("\n✅ Vinculação concluída!");
