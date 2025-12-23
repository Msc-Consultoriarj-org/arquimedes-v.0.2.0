import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { pages } from './drizzle/schema.js';
import { eq } from 'drizzle-orm';
import fs from 'fs';

const conn = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(conn);

// Ler documento completo
const fullDoc = fs.readFileSync('/home/ubuntu/arquimedes/docs/conteudo/MULTIPLICACAO_EXPANDIDA.md', 'utf-8');

// Extrair conteúdo de cada página usando regex
const page1Match = fullDoc.match(/## Página 1:.*?\n\n### Conteúdo:\n\n([\s\S]*?)(?=\n---\n\n## Página 2:)/);
const page2Match = fullDoc.match(/## Página 2:.*?\n\n### Conteúdo:\n\n([\s\S]*?)(?=\n---\n\n## Página 3:)/);
const page3Match = fullDoc.match(/## Página 3:.*?\n\n### Conteúdo:\n\n([\s\S]*?)$/);

if (!page1Match || !page2Match || !page3Match) {
  console.error('✗ Erro ao extrair conteúdo do documento');
  process.exit(1);
}

const page1Content = page1Match[1].trim();
const page2Content = page2Match[1].trim();
const page3Content = page3Match[1].trim();

console.log('Aplicando conteúdo de Multiplicação ao banco de dados...\n');

// Atualizar Página 1
console.log('1. Atualizando Página 1 (soma-repetida)...');
await db.update(pages)
  .set({ mainText: page1Content })
  .where(eq(pages.slug, 'soma-repetida'));
console.log('   ✓ Página 1 atualizada');

// Atualizar Página 2
console.log('2. Atualizando Página 2 (tabuada)...');
await db.update(pages)
  .set({ mainText: page2Content })
  .where(eq(pages.slug, 'tabuada'));
console.log('   ✓ Página 2 atualizada');

// Atualizar Página 3
console.log('3. Atualizando Página 3 (multiplicacao-avancada)...');
await db.update(pages)
  .set({ mainText: page3Content })
  .where(eq(pages.slug, 'multiplicacao-avancada'));
console.log('   ✓ Página 3 atualizada');

await conn.end();
console.log('\n✓ Todo o conteúdo de Multiplicação foi aplicado com sucesso!');
