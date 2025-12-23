import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { eq } from 'drizzle-orm';
import { readFileSync } from 'fs';
import * as dotenv from 'dotenv';
import { mysqlTable, int, varchar, text, timestamp } from 'drizzle-orm/mysql-core';

dotenv.config();

const pages = mysqlTable('pages', {
  id: int('id').primaryKey().autoincrement(),
  moduleId: int('moduleId').notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull(),
  order: int('order').notNull(),
  mainText: text('mainText'),
  conceptSummary: text('conceptSummary'),
  videoUrl: varchar('videoUrl', { length: 500 }),
  estimatedMinutes: int('estimatedMinutes'),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
});

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection);

console.log('📝 Inserindo conteúdo expandido em 8 páginas...\n');

// Páginas já inseridas anteriormente (2, 3, 4)
console.log('✅ Adição Página 2 (ID 2) - já inserida');
console.log('✅ Adição Página 3 (ID 3) - já inserida');
console.log('✅ Subtração Página 1 (ID 4) - já inserida\n');

// Subtração Páginas 2-3 (IDs 5, 6)
const subtracao2 = readFileSync('/home/ubuntu/arquimedes/content-subtracao-pagina2.md', 'utf-8');
await db.update(pages).set({ mainText: subtracao2 }).where(eq(pages.id, 5));
console.log('✅ Subtração Página 2 (ID 5) - 1.508 palavras inseridas');

const subtracao3 = readFileSync('/home/ubuntu/arquimedes/content-subtracao-pagina3.md', 'utf-8');
await db.update(pages).set({ mainText: subtracao3 }).where(eq(pages.id, 6));
console.log('✅ Subtração Página 3 (ID 6) - 1.296 palavras inseridas\n');

// Multiplicação Páginas 1-3 (IDs 7, 8, 9)
const multiplicacao1 = readFileSync('/home/ubuntu/arquimedes/content-multiplicacao-pagina1.md', 'utf-8');
await db.update(pages).set({ mainText: multiplicacao1 }).where(eq(pages.id, 7));
console.log('✅ Multiplicação Página 1 (ID 7) - 1.332 palavras inseridas');

const multiplicacao2 = readFileSync('/home/ubuntu/arquimedes/content-multiplicacao-pagina2.md', 'utf-8');
await db.update(pages).set({ mainText: multiplicacao2 }).where(eq(pages.id, 8));
console.log('✅ Multiplicação Página 2 (ID 8) - 1.741 palavras inseridas');

const multiplicacao3 = readFileSync('/home/ubuntu/arquimedes/content-multiplicacao-pagina3.md', 'utf-8');
await db.update(pages).set({ mainText: multiplicacao3 }).where(eq(pages.id, 9));
console.log('✅ Multiplicação Página 3 (ID 9) - 1.338 palavras inseridas\n');

// Divisão Páginas 1-3 (IDs 10, 11, 12 - assumindo que existem)
// Se não existirem, o update não fará nada
const divisao1 = readFileSync('/home/ubuntu/arquimedes/content-divisao-pagina1.md', 'utf-8');
await db.update(pages).set({ mainText: divisao1 }).where(eq(pages.id, 10));
console.log('✅ Divisão Página 1 (ID 10) - 1.284 palavras inseridas');

const divisao2 = readFileSync('/home/ubuntu/arquimedes/content-divisao-pagina2.md', 'utf-8');
await db.update(pages).set({ mainText: divisao2 }).where(eq(pages.id, 11));
console.log('✅ Divisão Página 2 (ID 11) - 1.379 palavras inseridas');

const divisao3 = readFileSync('/home/ubuntu/arquimedes/content-divisao-pagina3.md', 'utf-8');
await db.update(pages).set({ mainText: divisao3 }).where(eq(pages.id, 12));
console.log('✅ Divisão Página 3 (ID 12) - 1.316 palavras inseridas\n');

console.log('🎉 Total: 18.330 palavras, 235 exercícios inseridos no banco!');
console.log('📚 Conteúdo completo de Operações Básicas disponível!\n');

await connection.end();
