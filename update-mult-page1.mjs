import { db } from './server/db.js';
import { pages } from './drizzle/schema.js';
import { eq } from 'drizzle-orm';
import { readFileSync } from 'fs';

const content = readFileSync('/home/ubuntu/multiplicacao-page1-content.md', 'utf-8');

await db.update(pages)
  .set({ mainText: content })
  .where(eq(pages.slug, 'soma-repetida'));

console.log('✅ Página 1 atualizada!');
process.exit(0);
