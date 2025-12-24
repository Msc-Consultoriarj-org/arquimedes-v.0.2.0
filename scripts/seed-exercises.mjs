/**
 * Script Node.js para inserir os 135 novos exercícios no banco de dados
 * Usa o mesmo driver MySQL que o projeto
 */

import mysql from 'mysql2/promise';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Conectar ao banco
const connection = await mysql.createConnection(process.env.DATABASE_URL);

console.log('🔗 Conectado ao banco de dados');

// Mapeamento de módulos (IDs do banco)
const MODULES = {
  "SUB": 2,  // Subtração
  "DIV": 3,  // Divisão (temporariamente módulo 3)
  "POR": 3,  // Porcentagem
  "FRA": 3,  // Frações
  "PRO": 3,  // Proporção
  "POT": 3,  // Potenciação
  "RAD": 3,  // Radiciação
  "INT": 3,  // Números Inteiros
  "MUL": 3,  // Múltiplos/Divisores
  "EXP": 3,  // Expressões Numéricas
};

const DISCIPLINE_ID = 1; // Aritmética

// Ler arquivo markdown
const markdownPath = path.join(__dirname, '..', 'content', '150-novos-exercicios.md');
const content = fs.readFileSync(markdownPath, 'utf-8');

// Dividir por exercícios
const sections = content.split(/\n#### (EX-ARIT-\w+-\d+)\n/);

console.log(`📄 Arquivo lido: ${sections.length} seções encontradas`);

const exercises = [];

// Processar cada exercício (pula seção 0 que é o cabeçalho)
for (let i = 1; i < sections.length; i += 2) {
  const uniqueId = sections[i];
  const block = sections[i + 1];
  
  // Extrair campos usando regex
  const titleMatch = block.match(/\*\*Título:\*\* (.+)/);
  const questionMatch = block.match(/\*\*Pergunta:\*\* (.+)/);
  const correctMatch = block.match(/\*\*Resposta Correta:\*\* \w+ \(índice (\d+)\)/);
  const explanationMatch = block.match(/\*\*Explicação Passo-a-Passo:\*\*\n([\s\S]+?)(?=\n---|\n## |\Z)/);
  
  if (!titleMatch || !questionMatch || !correctMatch || !explanationMatch) {
    console.log(`⚠️  Pulando ${uniqueId} - campos incompletos`);
    continue;
  }
  
  const title = titleMatch[1].trim();
  const question = questionMatch[1].trim();
  const correctIdx = parseInt(correctMatch[1]);
  const explanation = explanationMatch[1].trim();
  
  // Extrair opções
  const optionsSection = block.match(/\*\*Opções:\*\*\n([\s\S]+?)\n\*\*Resposta/);
  const options = [];
  
  if (optionsSection) {
    const lines = optionsSection[1].split('\n');
    for (const line of lines) {
      if (line.trim().startsWith('- ')) {
        // Remove "- A) " ou "- B) " etc
        const optionText = line.replace(/^- [A-D]\) /, '').trim();
        options.push(optionText);
      }
    }
  }
  
  if (options.length !== 4) {
    console.log(`⚠️  Pulando ${uniqueId} - esperava 4 opções, encontrou ${options.length}`);
    continue;
  }
  
  // Determinar dificuldade e pontos
  const exerciseNum = parseInt(uniqueId.split('-')[3]);
  let difficulty, points;
  
  if (uniqueId.includes('-SUB-') || uniqueId.includes('-DIV-')) {
    // 20 exercícios: 8 fácil, 8 médio, 4 difícil
    if (exerciseNum <= 8) {
      difficulty = 'easy';
      points = 5;
    } else if (exerciseNum <= 16) {
      difficulty = 'moderate';
      points = 10;
    } else {
      difficulty = 'hard';
      points = 15;
    }
  } else if (uniqueId.includes('-POR-') || uniqueId.includes('-FRA-') || uniqueId.includes('-PRO-')) {
    // 15 exercícios: 6 fácil, 6 médio, 3 difícil
    if (exerciseNum <= 6) {
      difficulty = 'easy';
      points = 5;
    } else if (exerciseNum <= 12) {
      difficulty = 'moderate';
      points = 10;
    } else {
      difficulty = 'hard';
      points = 15;
    }
  } else {
    // 10 exercícios: 4 fácil, 4 médio, 2 difícil
    if (exerciseNum <= 4) {
      difficulty = 'easy';
      points = 5;
    } else if (exerciseNum <= 8) {
      difficulty = 'moderate';
      points = 10;
    } else {
      difficulty = 'hard';
      points = 15;
    }
  }
  
  // Extrair código do módulo
  const moduleCode = uniqueId.split('-')[2];
  const moduleId = MODULES[moduleCode] || 3;
  
  exercises.push({
    uniqueId,
    title,
    question,
    exerciseType: 'multiple_choice',
    options: JSON.stringify(options),
    correctAnswer: correctIdx.toString(),
    stepByStepExplanation: explanation,
    hint: null,
    difficulty,
    points,
    disciplineId: DISCIPLINE_ID,
    moduleId
  });
}

console.log(`✅ ${exercises.length} exercícios parseados com sucesso\n`);
console.log('📝 Inserindo no banco de dados...\n');

// Inserir exercícios
let inserted = 0;
let skipped = 0;

for (const exercise of exercises) {
  try {
    await connection.execute(
      `INSERT INTO standalone_exercises (
        uniqueId, title, question, exerciseType, options, correctAnswer,
        stepByStepExplanation, hint, difficulty, points, disciplineId, moduleId
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        exercise.uniqueId,
        exercise.title,
        exercise.question,
        exercise.exerciseType,
        exercise.options,
        exercise.correctAnswer,
        exercise.stepByStepExplanation,
        exercise.hint,
        exercise.difficulty,
        exercise.points,
        exercise.disciplineId,
        exercise.moduleId
      ]
    );
    
    inserted++;
    console.log(`✓ ${exercise.uniqueId} - ${exercise.title}`);
  } catch (error) {
    skipped++;
    if (error.code === 'ER_DUP_ENTRY') {
      console.log(`⊘ ${exercise.uniqueId} - já existe (pulado)`);
    } else {
      console.log(`✗ ${exercise.uniqueId} - erro: ${error.message}`);
    }
  }
}

await connection.end();

console.log(`\n✅ Seed concluído!`);
console.log(`   Inseridos: ${inserted}`);
console.log(`   Pulados: ${skipped}`);
console.log(`   Total: ${exercises.length}`);
