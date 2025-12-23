#!/usr/bin/env node

import mysql from 'mysql2/promise';

const connection = await mysql.createConnection(process.env.DATABASE_URL);

console.log('Criando Módulos 5-8...\n');

// Verificar se os módulos já existem
const [existing] = await connection.execute(
  'SELECT slug FROM modules WHERE slug IN (?, ?, ?, ?)',
  ['proporcao-e-razao', 'porcentagem', 'exponenciacao', 'fatoracao']
);

if (existing.length > 0) {
  console.log('⚠️  Alguns módulos já existem. Pulando criação.');
  await connection.end();
  process.exit(0);
}

// Criar Módulo 5: Proporção e Razão
await connection.execute(
  "INSERT INTO modules (disciplineId, name, slug, description, \`order\`) VALUES (1, 'Proporção e Razão', 'proporcao-e-razao', 'Entenda relações proporcionais e comparações', 5)"
);

const [mod5] = await connection.execute('SELECT LAST_INSERT_ID() as id');
const mod5Id = mod5[0].id;
console.log('✅ Módulo 5 criado: Proporção e Razão (ID:', mod5Id, ')');

// Criar páginas do Módulo 5
await connection.execute(`
  INSERT INTO pages (moduleId, title, slug, \`order\`, mainText, conceptSummary, estimatedMinutes)
  VALUES 
  (?, 'O que é Proporção', 'o-que-e-proporcao', 1, 'Conteúdo em desenvolvimento', 'Conceito de proporção e relações', 15),
  (?, 'Razão e Comparação', 'razao-e-comparacao', 2, 'Conteúdo em desenvolvimento', 'Como comparar quantidades', 15),
  (?, 'Regra de Três Simples', 'regra-de-tres-simples', 3, 'Conteúdo em desenvolvimento', 'Resolvendo problemas proporcionais', 20)
`, [mod5Id, mod5Id, mod5Id]);
console.log('   → 3 páginas criadas\n');

// Criar Módulo 6: Porcentagem
await connection.execute(
  "INSERT INTO modules (disciplineId, name, slug, description, \`order\`) VALUES (1, 'Porcentagem', 'porcentagem', 'Domine cálculos com porcentagens', 6)"
);

const [mod6] = await connection.execute('SELECT LAST_INSERT_ID() as id');
const mod6Id = mod6[0].id;
console.log('✅ Módulo 6 criado: Porcentagem (ID:', mod6Id, ')');

await connection.execute(`
  INSERT INTO pages (moduleId, title, slug, \`order\`, mainText, conceptSummary, estimatedMinutes)
  VALUES 
  (?, 'Conceito de Porcentagem', 'conceito-de-porcentagem', 1, 'Conteúdo em desenvolvimento', 'O que significa "por cento"', 15),
  (?, 'Cálculos de Porcentagem', 'calculos-de-porcentagem', 2, 'Conteúdo em desenvolvimento', 'Como calcular porcentagens', 15),
  (?, 'Aplicações Práticas', 'aplicacoes-praticas-porcentagem', 3, 'Conteúdo em desenvolvimento', 'Descontos, juros e mais', 20)
`, [mod6Id, mod6Id, mod6Id]);
console.log('   → 3 páginas criadas\n');

// Criar Módulo 7: Exponenciação
await connection.execute(
  "INSERT INTO modules (disciplineId, name, slug, description, \`order\`) VALUES (1, 'Exponenciação', 'exponenciacao', 'Potências e expoentes explicados', 7)"
);

const [mod7] = await connection.execute('SELECT LAST_INSERT_ID() as id');
const mod7Id = mod7[0].id;
console.log('✅ Módulo 7 criado: Exponenciação (ID:', mod7Id, ')');

await connection.execute(`
  INSERT INTO pages (moduleId, title, slug, \`order\`, mainText, conceptSummary, estimatedMinutes)
  VALUES 
  (?, 'Potências e Expoentes', 'potencias-e-expoentes', 1, 'Conteúdo em desenvolvimento', 'Introdução às potências', 15),
  (?, 'Propriedades das Potências', 'propriedades-das-potencias', 2, 'Conteúdo em desenvolvimento', 'Regras de multiplicação e divisão', 15),
  (?, 'Notação Científica', 'notacao-cientifica', 3, 'Conteúdo em desenvolvimento', 'Representando números muito grandes ou pequenos', 20)
`, [mod7Id, mod7Id, mod7Id]);
console.log('   → 3 páginas criadas\n');

// Criar Módulo 8: Fatoração
await connection.execute(
  "INSERT INTO modules (disciplineId, name, slug, description, \`order\`) VALUES (1, 'Fatoração', 'fatoracao', 'Números primos, MDC e MMC', 8)"
);

const [mod8] = await connection.execute('SELECT LAST_INSERT_ID() as id');
const mod8Id = mod8[0].id;
console.log('✅ Módulo 8 criado: Fatoração (ID:', mod8Id, ')');

await connection.execute(`
  INSERT INTO pages (moduleId, title, slug, \`order\`, mainText, conceptSummary, estimatedMinutes)
  VALUES 
  (?, 'Números Primos', 'numeros-primos', 1, 'Conteúdo em desenvolvimento', 'O que são números primos', 15),
  (?, 'Fatoração em Primos', 'fatoracao-em-primos', 2, 'Conteúdo em desenvolvimento', 'Decompondo números', 15),
  (?, 'MDC e MMC', 'mdc-e-mmc', 3, 'Conteúdo em desenvolvimento', 'Máximo Divisor Comum e Mínimo Múltiplo Comum', 20)
`, [mod8Id, mod8Id, mod8Id]);
console.log('   → 3 páginas criadas\n');

await connection.end();
console.log('🎉 Estrutura dos Módulos 5-8 criada com sucesso!');
console.log('\nResumo:');
console.log('- Módulo 5: Proporção e Razão (3 páginas)');
console.log('- Módulo 6: Porcentagem (3 páginas)');
console.log('- Módulo 7: Exponenciação (3 páginas)');
console.log('- Módulo 8: Fatoração (3 páginas)');
console.log('\nTotal: 4 módulos, 12 páginas');
