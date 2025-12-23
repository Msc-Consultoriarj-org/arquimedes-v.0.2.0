#!/usr/bin/env node

import mysql from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';
import { pages } from '../drizzle/schema.ts';
import { eq } from 'drizzle-orm';

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection);

// Buscar páginas do Módulo 1 (Adição e Subtração)
const adicaoPages = await db.select({
  id: pages.id,
  title: pages.title,
  slug: pages.slug,
  mainText: pages.mainText,
  orderIndex: pages.orderIndex
}).from(pages).where(eq(pages.moduleId, 1)).orderBy(pages.orderIndex);

console.log('\n📚 Páginas de Adição e Subtração (Módulo 1):\n');
adicaoPages.forEach(p => {
  const length = p.mainText ? p.mainText.length : 0;
  const words = p.mainText ? p.mainText.split(/\s+/).length : 0;
  console.log(`${p.orderIndex}. ${p.title}`);
  console.log(`   Slug: ${p.slug}`);
  console.log(`   Tamanho: ${length} caracteres (~${words} palavras)`);
  console.log('');
});

await connection.end();
