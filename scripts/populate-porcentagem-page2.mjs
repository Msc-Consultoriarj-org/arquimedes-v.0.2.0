#!/usr/bin/env node

import mysql from 'mysql2/promise';

const connection = await mysql.createConnection(process.env.DATABASE_URL);

console.log('🎯 Criando Página 2: Cálculos de Porcentagem...\n');

const [modules] = await connection.execute(
  'SELECT id FROM modules WHERE slug = ?',
  ['porcentagem']
);

const moduleId = modules[0].id;

const page2Content = `# Cálculos de Porcentagem

Agora que você já entende o conceito de porcentagem, vamos aprender a **calcular** porcentagens em diferentes situações. Existem três tipos principais de cálculos que você precisa dominar.

## Os Três Tipos de Cálculos

### 1. Calcular X% de um Valor

**Pergunta:** "Quanto é 30% de 150?"

**Fórmula:**
$$\\text{Resultado} = \\frac{\\text{Porcentagem}}{100} \\times \\text{Valor}$$

**Passo a passo:**
1. Converta a porcentagem para decimal: 30% = 0,3
2. Multiplique pelo valor: 0,3 × 150 = **45**

**Resposta:** 30% de 150 é **45**

**Outros exemplos:**
- 20% de 80 = 0,2 × 80 = **16**
- 75% de 200 = 0,75 × 200 = **150**
- 5% de 1000 = 0,05 × 1000 = **50**

### 2. Descobrir que Porcentagem um Valor Representa

**Pergunta:** "40 é quantos % de 200?"

**Fórmula:**
$$\\text{Porcentagem} = \\frac{\\text{Parte}}{\\text{Total}} \\times 100$$

**Passo a passo:**
1. Divida a parte pelo total: 40 ÷ 200 = 0,2
2. Multiplique por 100: 0,2 × 100 = **20%**

**Resposta:** 40 é **20%** de 200

**Outros exemplos:**
- 25 é quantos % de 100? → (25/100) × 100 = **25%**
- 15 é quantos % de 60? → (15/60) × 100 = **25%**
- 80 é quantos % de 200? → (80/200) × 100 = **40%**

### 3. Descobrir o Valor Total

**Pergunta:** "30% de qual número é 60?"

**Fórmula:**
$$\\text{Total} = \\frac{\\text{Parte}}{\\text{Porcentagem}} \\times 100$$

**Passo a passo:**
1. Divida a parte pela porcentagem: 60 ÷ 30 = 2
2. Multiplique por 100: 2 × 100 = **200**

**Resposta:** 30% de **200** é 60

**Outros exemplos:**
- 20% de qual número é 40? → (40/20) × 100 = **200**
- 75% de qual número é 150? → (150/75) × 100 = **200**
- 10% de qual número é 25? → (25/10) × 100 = **250**

## Método Prático: Regra de Três

Você também pode usar **regra de três** para resolver qualquer problema de porcentagem:

**Exemplo:** Quanto é 35% de 80?

\`\`\`
100% → 80
35% → X
\`\`\`

**X = (35 × 80) ÷ 100 = 28**

## Calculando Aumentos e Reduções

### Aumento Percentual

**Exemplo:** Um produto custa R$ 100 e teve aumento de 20%. Qual o novo preço?

**Método 1 (Calcular o aumento):**
- Aumento: 20% de 100 = 0,2 × 100 = R$ 20
- Novo preço: R$ 100 + R$ 20 = **R$ 120**

**Método 2 (Multiplicar direto):**
- 100% + 20% = 120%
- Novo preço: 1,2 × 100 = **R$ 120**

### Redução Percentual

**Exemplo:** Um produto custa R$ 150 e teve desconto de 30%. Qual o novo preço?

**Método 1 (Calcular o desconto):**
- Desconto: 30% de 150 = 0,3 × 150 = R$ 45
- Novo preço: R$ 150 - R$ 45 = **R$ 105**

**Método 2 (Multiplicar direto):**
- 100% - 30% = 70%
- Novo preço: 0,7 × 150 = **R$ 105**

## Porcentagens Sucessivas

**Atenção:** Dois descontos de 10% **NÃO** são iguais a um desconto de 20%!

**Exemplo:** Produto de R$ 100 com dois descontos de 10%:

1. Primeiro desconto: 100 × 0,9 = R$ 90
2. Segundo desconto: 90 × 0,9 = **R$ 81**

Se fosse um desconto único de 20%:
- 100 × 0,8 = **R$ 80**

**Diferença:** R$ 81 ≠ R$ 80

**Regra:** Porcentagens sucessivas se multiplicam, não se somam!

## Dicas para Cálculo Mental

### Porcentagens Fáceis

- **10%** → Divida por 10 (mova a vírgula uma casa)
  - 10% de 80 = 8
- **50%** → Divida por 2 (metade)
  - 50% de 120 = 60
- **25%** → Divida por 4 (um quarto)
  - 25% de 200 = 50
- **1%** → Divida por 100
  - 1% de 300 = 3

### Truque: Use 10% como Base

Para calcular 30% de 80:
1. Calcule 10%: 80 ÷ 10 = 8
2. Multiplique por 3: 8 × 3 = **24**

Para calcular 15% de 200:
1. Calcule 10%: 200 ÷ 10 = 20
2. Calcule 5% (metade de 10%): 20 ÷ 2 = 10
3. Some: 20 + 10 = **30**

## Aplicação Prática: Gorjeta

Você foi a um restaurante e a conta deu R$ 85. Quer deixar 15% de gorjeta.

**Solução rápida:**
1. 10% de 85 = R$ 8,50
2. 5% de 85 = R$ 4,25 (metade de 10%)
3. Total da gorjeta: R$ 8,50 + R$ 4,25 = **R$ 12,75**
4. Conta final: R$ 85 + R$ 12,75 = **R$ 97,75**`;

console.log('📄 Inserindo conteúdo da Página 2...');

const [page2] = await connection.execute(`
  INSERT INTO pages (moduleId, title, slug, \`order\`, mainText, conceptSummary, estimatedMinutes, videoUrl)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`, [
  moduleId,
  'Cálculos de Porcentagem',
  'calculos-de-porcentagem',
  2,
  page2Content,
  'Aprenda os três tipos principais de cálculos: calcular X% de um valor, descobrir que porcentagem um valor representa, e encontrar o valor total. Domine aumentos, reduções e porcentagens sucessivas.',
  25,
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
]);

const page2Id = page2.insertId;
console.log(`   ✅ Página 2 criada (ID: ${page2Id})`);

// Exercícios da Página 2
await connection.execute(`
  INSERT INTO exercises (pageId, \`order\`, type, question, expectedAnswer, alternativeAnswers, hints)
  VALUES 
  (?, 1, 'simple_input', 'Quanto é 25% de 80?', '20', NULL, '["25% = 0,25", "0,25 × 80 = ?"]'),
  (?, 2, 'simple_input', '30 é quantos % de 150? (apenas o número)', '20', '["20%"]', '["Divida 30 por 150", "Multiplique o resultado por 100"]'),
  (?, 3, 'simple_input', 'Um produto de R$ 200 teve 15% de desconto. Qual o novo preço?', '170', '["R$ 170", "R$170"]', '["15% de 200 = 30", "200 - 30 = ?"]'),
  (?, 4, 'simple_input', 'Um salário de R$ 2000 teve aumento de 10%. Qual o novo salário?', '2200', '["R$ 2200", "R$2200"]', '["10% de 2000 = 200", "2000 + 200 = ?"]'),
  (?, 5, 'simple_input', '40% de qual número é 80?', '200', NULL, '["Use regra de três: 40% → 80, 100% → X", "(80 × 100) ÷ 40 = ?"]')
`, [page2Id, page2Id, page2Id, page2Id, page2Id]);

console.log('   ✅ 5 exercícios criados\n');

await connection.end();
console.log('🎉 Página 2 do Módulo Porcentagem criada com sucesso!');
