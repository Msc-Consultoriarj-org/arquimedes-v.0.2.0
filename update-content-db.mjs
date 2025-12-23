import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { eq } from 'drizzle-orm';
import { readFileSync } from 'fs';
import * as dotenv from 'dotenv';
import { mysqlTable, int, varchar, text, timestamp } from 'drizzle-orm/mysql-core';

dotenv.config();

// Definir schema inline
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

// Ler conteúdo dos arquivos
const content2 = readFileSync('/home/ubuntu/arquimedes/content-adicao-pagina2.md', 'utf-8');
const content3 = readFileSync('/home/ubuntu/arquimedes/content-adicao-pagina3.md', 'utf-8');
const content4 = readFileSync('/home/ubuntu/arquimedes/content-subtracao-pagina1.md', 'utf-8');

console.log('📝 Atualizando páginas com conteúdo expandido...');

// Atualizar Adição Página 2 (ID 2)
await db.update(pages)
  .set({ mainText: content2 })
  .where(eq(pages.id, 2));
console.log('✅ Adição Página 2 atualizada (2.871 palavras)');

// Atualizar Adição Página 3 (ID 3)
await db.update(pages)
  .set({ mainText: content3 })
  .where(eq(pages.id, 3));
console.log('✅ Adição Página 3 atualizada (2.189 palavras)');

// Atualizar Subtração Página 1 (ID 4)
await db.update(pages)
  .set({ mainText: content4 })
  .where(eq(pages.id, 4));
console.log('✅ Subtração Página 1 atualizada (2.199 palavras)');

console.log('\n🎉 Total: 7.259 palavras de conteúdo expandido inseridas!');

await connection.end();
