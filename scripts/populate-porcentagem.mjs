#!/usr/bin/env node

import mysql from 'mysql2/promise';

const connection = await mysql.createConnection(process.env.DATABASE_URL);

console.log('🎯 Populando Módulo 6: Porcentagem...\n');

// Obter ID do módulo
const [modules] = await connection.execute(
  'SELECT id FROM modules WHERE slug = ?',
  ['porcentagem']
);

if (modules.length === 0) {
  console.error('❌ Módulo Porcentagem não encontrado!');
  await connection.end();
  process.exit(1);
}

const moduleId = modules[0].id;
console.log(`✅ Módulo encontrado (ID: ${moduleId})\n`);

// ============================================
// PÁGINA 1: CONCEITO DE PORCENTAGEM
// ============================================

const page1Content = `# Conceito de Porcentagem

**Porcentagem** é uma das ferramentas matemáticas mais úteis do dia a dia. Ela aparece em descontos de lojas, taxas de juros, estatísticas, notas escolares e muito mais. Dominar porcentagens é essencial para tomar decisões financeiras inteligentes e entender informações do mundo real.

## O que Significa "Porcentagem"?

A palavra **porcentagem** vem do latim *per centum*, que significa "por cem". O símbolo **%** representa essa ideia de "dividir por 100".

**Definição:** Uma porcentagem é uma fração cujo denominador é sempre 100.

- **50%** significa "50 de cada 100" ou "50/100"
- **25%** significa "25 de cada 100" ou "25/100"
- **100%** significa "100 de cada 100" ou "o todo completo"

## Representações Equivalentes

Toda porcentagem pode ser escrita de três formas diferentes:

| Porcentagem | Fração | Decimal |
|-------------|--------|---------|
| 10% | 10/100 = 1/10 | 0,1 |
| 25% | 25/100 = 1/4 | 0,25 |
| 50% | 50/100 = 1/2 | 0,5 |
| 75% | 75/100 = 3/4 | 0,75 |
| 100% | 100/100 = 1 | 1,0 |

## Visualizando Porcentagens

Imagine uma barra dividida em 100 quadradinhos:

- **10%** = 10 quadradinhos pintados (1/10 da barra)
- **50%** = 50 quadradinhos pintados (metade da barra)
- **75%** = 75 quadradinhos pintados (3/4 da barra)
- **100%** = todos os 100 quadradinhos pintados (barra completa)

## Conversões Básicas

### De Porcentagem para Decimal

**Regra:** Divida por 100 (ou mova a vírgula duas casas para a esquerda)

**Exemplos:**
- 30% = 30 ÷ 100 = **0,3**
- 75% = 75 ÷ 100 = **0,75**
- 5% = 5 ÷ 100 = **0,05**
- 150% = 150 ÷ 100 = **1,5**

### De Decimal para Porcentagem

**Regra:** Multiplique por 100 (ou mova a vírgula duas casas para a direita)

**Exemplos:**
- 0,25 = 0,25 × 100 = **25%**
- 0,8 = 0,8 × 100 = **80%**
- 1,5 = 1,5 × 100 = **150%**
- 0,03 = 0,03 × 100 = **3%**

### De Fração para Porcentagem

**Regra:** Divida o numerador pelo denominador e multiplique por 100

**Exemplos:**
- 1/4 = 0,25 = 0,25 × 100 = **25%**
- 3/5 = 0,6 = 0,6 × 100 = **60%**
- 7/10 = 0,7 = 0,7 × 100 = **70%**

## Exemplos do Dia a Dia

### 1. Bateria do Celular

Quando seu celular mostra "80% de bateria", significa que 80 de cada 100 unidades de carga estão disponíveis. Se a bateria total é 3000 mAh, então você tem 2400 mAh disponíveis (80% de 3000).

### 2. Notas Escolares

Se você acertou 18 de 20 questões em uma prova:
- Fração: 18/20
- Simplificando: 9/10
- Porcentagem: 9/10 = 0,9 = **90%**

### 3. Descontos em Lojas

"20% de desconto" significa que você pagará apenas 80% do preço original:
- Preço: R$ 100
- Desconto: 20% de R$ 100 = R$ 20
- Preço final: R$ 100 - R$ 20 = **R$ 80**

## Porcentagens Maiores que 100%

Sim, porcentagens podem ser maiores que 100%! Isso acontece quando algo cresce além do valor original.

**Exemplo:** Se uma ação valia R$ 50 e agora vale R$ 75:
- Aumento: R$ 75 - R$ 50 = R$ 25
- Porcentagem de aumento: (25/50) × 100 = **50%**
- Valor atual em relação ao original: (75/50) × 100 = **150%**

## Dica Importante

Porcentagens são sempre **relativas** a um valor base. 10% de 100 é diferente de 10% de 1000:
- 10% de 100 = 10
- 10% de 1000 = 100

Sempre pergunte: "10% **de quê**?"`;

console.log('📄 Criando Página 1: Conceito de Porcentagem...');

const [page1] = await connection.execute(`
  INSERT INTO pages (moduleId, title, slug, \`order\`, mainText, conceptSummary, estimatedMinutes, videoUrl)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`, [
  moduleId,
  'Conceito de Porcentagem',
  'conceito-de-porcentagem',
  1,
  page1Content,
  'Porcentagem significa "por cem" e pode ser representada como fração, decimal ou percentual. É essencial para entender descontos, juros e estatísticas do dia a dia.',
  20,
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
]);

const page1Id = page1.insertId;
console.log(`   ✅ Página 1 criada (ID: ${page1Id})`);

// Exercícios da Página 1
await connection.execute(`
  INSERT INTO exercises (pageId, \`order\`, type, question, expectedAnswer, alternativeAnswers, hints)
  VALUES 
  (?, 1, 'simple_input', 'Converta 40% para decimal', '0.4', '["0,4", "0.40", "0,40"]', '["Divida por 100", "40 ÷ 100 = ?"]'),
  (?, 2, 'simple_input', 'Converta 0,75 para porcentagem (apenas o número, sem o símbolo %)', '75', '["75%"]', '["Multiplique por 100", "0,75 × 100 = ?"]'),
  (?, 3, 'simple_input', 'Quanto é 50% de 200?', '100', NULL, '["50% é metade", "200 ÷ 2 = ?"]'),
  (?, 4, 'simple_input', 'Converta a fração 1/4 para porcentagem (apenas o número)', '25', '["25%"]', '["1/4 = 0,25", "0,25 × 100 = ?"]')
`, [page1Id, page1Id, page1Id, page1Id]);

console.log('   ✅ 4 exercícios criados\n');

await connection.end();
console.log('🎉 Página 1 do Módulo Porcentagem criada com sucesso!');
