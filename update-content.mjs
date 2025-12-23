import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { pages } from './drizzle/schema.ts';
import { eq } from 'drizzle-orm';
import { readFileSync } from 'fs';

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection);

// Ler conteúdos dos arquivos
const adicaoPag2 = readFileSync('/home/ubuntu/arquimedes/content-adicao-pagina2.md', 'utf-8');
const adicaoPag3 = readFileSync('/home/ubuntu/arquimedes/content-adicao-pagina3.md', 'utf-8');
const subtracaoPag1 = readFileSync('/home/ubuntu/arquimedes/content-subtracao-pagina1.md', 'utf-8');

console.log('📝 Atualizando banco de dados com conteúdo expandido...\n');

// Atualizar Adição Página 2 (ID 2)
console.log('1️⃣ Atualizando Adição Página 2 (Reta Numérica)...');
await db.update(pages)
  .set({ 
    mainText: adicaoPag2,
    estimatedMinutes: 45,
    videoUrl: 'PLACEHOLDER_RETA_NUMERICA'
  })
  .where(eq(pages.id, 2));
console.log('✅ Página 2 atualizada! (' + adicaoPag2.split(' ').length + ' palavras)\n');

// Atualizar Adição Página 3 (ID 3)
console.log('2️⃣ Atualizando Adição Página 3 (Exercícios)...');
await db.update(pages)
  .set({ 
    mainText: adicaoPag3,
    estimatedMinutes: 50,
    videoUrl: 'PLACEHOLDER_EXERCICIOS_ADICAO'
  })
  .where(eq(pages.id, 3));
console.log('✅ Página 3 atualizada! (' + adicaoPag3.split(' ').length + ' palavras)\n');

// Atualizar Subtração Página 1 (ID 4)
console.log('3️⃣ Atualizando Subtração Página 1 (Conceito)...');
await db.update(pages)
  .set({ 
    mainText: subtracaoPag1,
    estimatedMinutes: 45,
    videoUrl: 'PLACEHOLDER_SUBTRACAO_CONCEITO'
  })
  .where(eq(pages.id, 4));
console.log('✅ Página 4 atualizada! (' + subtracaoPag1.split(' ').length + ' palavras)\n');

console.log('🎉 Todas as 3 páginas foram atualizadas com sucesso!');
console.log('📊 Total de palavras adicionadas: ' + (adicaoPag2.split(' ').length + adicaoPag3.split(' ').length + subtracaoPag1.split(' ').length));

await connection.end();
