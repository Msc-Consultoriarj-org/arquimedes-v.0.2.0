import mysql from 'mysql2/promise';
import { readFileSync } from 'fs';

// Conectar ao banco
const connection = await mysql.createConnection({
  host: 'gateway01.us-east-1.prod.aws.tidbcloud.com',
  port: 4000,
  user: '2vQiSYfHd1UvQXB.root',
  password: 'Qd2hS7ySvnBLvBDO',
  database: 'manus_webdev_arquimedes',
  ssl: { rejectUnauthorized: true }
});

// Ler conteúdos
const subtracao1 = readFileSync('/tmp/subtracao_aula1.md', 'utf-8');
const subtracao2 = readFileSync('/tmp/subtracao_aula2.md', 'utf-8');
const subtracao3 = readFileSync('/tmp/subtracao_aula3.md', 'utf-8');
const porcentagem1 = readFileSync('/tmp/porcentagem_regra_tres.md', 'utf-8');
const porcentagem2 = readFileSync('/tmp/porcentagem_proporcoes.md', 'utf-8');
const porcentagem3 = readFileSync('/tmp/porcentagem_situacoes_reais.md', 'utf-8');

// Obter IDs dos módulos
const [subtracaoModule] = await connection.query(
  "SELECT id FROM modules WHERE slug = 'subtracao' AND disciplineId = 1"
);
const [porcentagemModule] = await connection.query(
  "SELECT id FROM modules WHERE slug = 'porcentagem' AND disciplineId = 1"
);

const subtracaoId = subtracaoModule[0].id;
const porcentagemId = porcentagemModule[0].id;

console.log(`Módulo Subtração ID: ${subtracaoId}`);
console.log(`Módulo Porcentagem ID: ${porcentagemId}`);

// Inserir aulas de Subtração
const aulasSubtracao = [
  { title: 'O que é Subtrair?', slug: 'o-que-e-subtrair', content: subtracao1, duration: 20, order: 1 },
  { title: 'Subtração com Empréstimo', slug: 'subtracao-com-emprestimo', content: subtracao2, duration: 25, order: 2 },
  { title: 'Aplicações Práticas da Subtração', slug: 'aplicacoes-praticas-subtracao', content: subtracao3, duration: 20, order: 3 },
];

for (const aula of aulasSubtracao) {
  await connection.query(
    `INSERT INTO pages (moduleId, title, slug, mainText, estimatedMinutes, \`order\`, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
    [subtracaoId, aula.title, aula.slug, aula.content, aula.duration, aula.order]
  );
  console.log(`✅ Inserida: ${aula.title}`);
}

// Inserir aulas de Porcentagem
const aulasPorcentagem = [
  { title: 'Regra de Três Simples', slug: 'regra-de-tres-simples', content: porcentagem1, duration: 25, order: 4 },
  { title: 'Proporções e Razões', slug: 'proporcoes-e-razoes', content: porcentagem2, duration: 20, order: 5 },
  { title: 'Porcentagem em Situações Reais', slug: 'porcentagem-situacoes-reais', content: porcentagem3, duration: 25, order: 6 },
];

for (const aula of aulasPorcentagem) {
  await connection.query(
    `INSERT INTO pages (moduleId, title, slug, mainText, estimatedMinutes, \`order\`, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
    [porcentagemId, aula.title, aula.slug, aula.content, aula.duration, aula.order]
  );
  console.log(`✅ Inserida: ${aula.title}`);
}

await connection.end();
console.log('\n🎉 Todas as 6 aulas foram inseridas com sucesso!');
