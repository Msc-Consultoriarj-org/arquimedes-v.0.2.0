import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { pages } from './drizzle/schema.js';
import { eq } from 'drizzle-orm';

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection);

const videos = {
  1: '25MKvVixayM',  // Adição Pág 1 - Conceito
  2: '1e8qtYBvcmo',  // Adição Pág 2 - Reta Numérica
  3: 'HjyCT6K5O1I',  // Adição Pág 3 - Exercícios
  4: 'd2sBQS4wVYI',  // Subtração Pág 1 - Conceito
  5: '2qLW90Fi7G4',  // Subtração Pág 2 - Movimento
  6: 'cJl92_ytkz0',  // Subtração Pág 3 - Exercícios
  7: 'izaSmMXZRgk',  // Multiplicação Pág 1 - Conceito
  8: 'dSvQnPtKiVg',  // Multiplicação Pág 2 - Tabuada
  9: 'BetgRvNQEC0',  // Multiplicação Pág 3 - Exercícios
  10: '61S-Rayhc7c', // Divisão Pág 1 - Conceito
  11: '7np0ToPuDuM', // Divisão Pág 2 - Com Resto
  12: 'SCAXCtGlgK8', // Divisão Pág 3 - Exercícios
};

console.log('Atualizando vídeos no banco de dados...\n');

for (const [pageId, videoId] of Object.entries(videos)) {
  await db.update(pages)
    .set({ videoUrl: videoId })
    .where(eq(pages.id, parseInt(pageId)));
  console.log(`✓ Página ${pageId}: vídeo ${videoId} atualizado`);
}

console.log('\n✅ Todos os vídeos foram atualizados com sucesso!');
await connection.end();
