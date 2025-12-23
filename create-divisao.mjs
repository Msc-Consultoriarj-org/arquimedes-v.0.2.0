import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { readFileSync } from 'fs';
import * as dotenv from 'dotenv';
import { mysqlTable, int, varchar, text, timestamp } from 'drizzle-orm/mysql-core';

dotenv.config();

const modules = mysqlTable('modules', {
  id: int('id').primaryKey().autoincrement(),
  disciplineId: int('disciplineId').notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull(),
  description: text('description'),
  order: int('order').notNull().default(0),
  createdAt: timestamp('createdAt').defaultNow(),
});

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

console.log('Creating Divisao module...');

const [moduleResult] = await db.insert(modules).values({
  disciplineId: 1,
  name: 'Divisão',
  slug: 'divisao',
  description: 'Aprenda a dividir números, entender divisão com resto e aplicar em situações práticas.',
  order: 4,
});

const divisaoModuleId = moduleResult.insertId;
console.log('Module created with ID:', divisaoModuleId);

const divisao1 = readFileSync('/home/ubuntu/arquimedes/content-divisao-pagina1.md', 'utf-8');
const divisao2 = readFileSync('/home/ubuntu/arquimedes/content-divisao-pagina2.md', 'utf-8');
const divisao3 = readFileSync('/home/ubuntu/arquimedes/content-divisao-pagina3.md', 'utf-8');

await db.insert(pages).values([
  {
    moduleId: divisaoModuleId,
    title: 'Divisão - Conceito de Repartição',
    slug: 'divisao-conceito',
    order: 1,
    mainText: divisao1,
    conceptSummary: 'Entenda divisão como repartição em partes iguais e sua relação com multiplicação.',
    estimatedMinutes: 25,
  },
  {
    moduleId: divisaoModuleId,
    title: 'Divisão com Resto',
    slug: 'divisao-resto',
    order: 2,
    mainText: divisao2,
    conceptSummary: 'Aprenda a calcular e interpretar o resto em divisões não exatas.',
    estimatedMinutes: 30,
  },
  {
    moduleId: divisaoModuleId,
    title: 'Exercícios Práticos de Divisão',
    slug: 'divisao-exercicios',
    order: 3,
    mainText: divisao3,
    conceptSummary: 'Pratique divisão em situações reais: contas, distribuição, trabalho e orçamento.',
    estimatedMinutes: 35,
  },
]);

console.log('All 3 Divisao pages created successfully!');
await connection.end();
