#!/usr/bin/env node

import mysql from 'mysql2/promise';

const connection = await mysql.createConnection(process.env.DATABASE_URL);

console.log('🎯 Criando Página 3: Aplicações Práticas...\n');

const [modules] = await connection.execute(
  'SELECT id FROM modules WHERE slug = ?',
  ['porcentagem']
);

const moduleId = modules[0].id;

const page3Content = `# Aplicações Práticas de Porcentagem

Agora que você domina os cálculos, vamos aplicar porcentagens em situações reais do dia a dia. Estas são as aplicações mais comuns que você encontrará na vida adulta.

## 1. Descontos em Compras

### Desconto Simples

**Situação:** Uma TV custa R$ 2.000 e está com 25% de desconto. Quanto você vai pagar?

**Solução:**
- Desconto: 25% de 2000 = 0,25 × 2000 = R$ 500
- Preço final: R$ 2000 - R$ 500 = **R$ 1.500**

**Método rápido:**
- 100% - 25% = 75%
- Preço final: 0,75 × 2000 = **R$ 1.500**

### Descontos Progressivos

**Situação:** Uma loja anuncia "50% + 20% de desconto". Um produto custa R$ 100. Quanto você pagará?

**Atenção:** NÃO é 70% de desconto!

**Solução correta:**
1. Primeiro desconto (50%): 100 × 0,5 = R$ 50
2. Segundo desconto (20% sobre R$ 50): 50 × 0,8 = **R$ 40**

**Desconto total real:** (100 - 40) / 100 = **60%** (não 70%!)

### Comparando Descontos

**Qual é melhor?**
- Opção A: 30% de desconto
- Opção B: "Compre 2, leve 3"

**Para Opção B:**
- Você paga 2 e leva 3 = paga 2/3 do preço
- 2/3 = 0,6667 = 66,67%
- Desconto: 100% - 66,67% = **33,33%**

**Resposta:** Opção B é melhor (33,33% > 30%)

## 2. Juros e Investimentos

### Juros Simples

**Conceito:** O juro é calculado sempre sobre o valor inicial.

**Fórmula:**
$$J = C \\times i \\times t$$

Onde:
- J = Juros
- C = Capital inicial
- i = Taxa de juros (em decimal)
- t = Tempo

**Exemplo:** Você investiu R$ 1.000 a 5% ao mês por 6 meses.

- Juros mensais: 1000 × 0,05 = R$ 50
- Juros totais: 50 × 6 = R$ 300
- Montante final: R$ 1000 + R$ 300 = **R$ 1.300**

### Juros Compostos (Básico)

**Conceito:** O juro é calculado sobre o montante acumulado (juro sobre juro).

**Exemplo simplificado:** R$ 1.000 a 10% ao mês por 3 meses.

- Mês 1: 1000 × 1,1 = R$ 1.100
- Mês 2: 1100 × 1,1 = R$ 1.210
- Mês 3: 1210 × 1,1 = **R$ 1.331**

**Comparação:**
- Juros simples: R$ 1.300
- Juros compostos: R$ 1.331
- Diferença: R$ 31 a mais com juros compostos

### Rendimento de Poupança

**Situação:** Você depositou R$ 5.000 na poupança que rende 0,5% ao mês. Quanto terá em 12 meses?

**Cálculo (juros simples aproximado):**
- Rendimento mensal: 5000 × 0,005 = R$ 25
- Rendimento anual: 25 × 12 = R$ 300
- Total: R$ 5000 + R$ 300 = **R$ 5.300**

## 3. Impostos e Taxas

### ICMS (Imposto sobre Circulação de Mercadorias)

**Situação:** Um produto custa R$ 100 sem impostos. O ICMS é 18%. Qual o preço final?

**Solução:**
- Imposto: 18% de 100 = R$ 18
- Preço final: R$ 100 + R$ 18 = **R$ 118**

### Desconto de INSS

**Situação:** Seu salário bruto é R$ 3.000 e o INSS é 11%. Quanto é descontado?

**Solução:**
- Desconto: 11% de 3000 = 0,11 × 3000 = **R$ 330**
- Salário líquido: R$ 3000 - R$ 330 = **R$ 2.670**

## 4. Aumentos e Reajustes

### Aumento Salarial

**Situação:** Seu salário é R$ 2.500 e você recebeu aumento de 8%. Qual o novo salário?

**Solução:**
- Aumento: 8% de 2500 = 0,08 × 2500 = R$ 200
- Novo salário: R$ 2500 + R$ 200 = **R$ 2.700**

**Método rápido:**
- 100% + 8% = 108%
- Novo salário: 1,08 × 2500 = **R$ 2.700**

### Inflação

**Situação:** Um produto custava R$ 50 no ano passado. A inflação foi 6%. Quanto custa hoje?

**Solução:**
- Aumento: 6% de 50 = 0,06 × 50 = R$ 3
- Preço atual: R$ 50 + R$ 3 = **R$ 53**

## 5. Gorjetas e Taxas de Serviço

### Calculando Gorjeta

**Situação:** Conta do restaurante: R$ 120. Você quer deixar 10% de gorjeta.

**Solução rápida:**
- 10% de 120 = R$ 12
- Total a pagar: R$ 120 + R$ 12 = **R$ 132**

**Dica:** Para 10%, basta mover a vírgula uma casa para a esquerda!

### Taxa de Serviço Opcional

**Situação:** Conta de R$ 85 com sugestão de 15% de taxa de serviço.

**Solução:**
- 10% de 85 = R$ 8,50
- 5% de 85 = R$ 4,25 (metade de 10%)
- Total da taxa: R$ 8,50 + R$ 4,25 = R$ 12,75
- Conta final: R$ 85 + R$ 12,75 = **R$ 97,75**

## 6. Parcelamento e Juros

### Parcelamento sem Juros

**Situação:** Produto de R$ 600 em 3× sem juros. Quanto é cada parcela?

**Solução:**
- Parcela: 600 ÷ 3 = **R$ 200**

### Parcelamento com Juros

**Situação:** Produto de R$ 1.000 em 5× com juros de 2% ao mês.

**Cálculo aproximado (juros simples):**
- Juros totais: 1000 × 0,02 × 5 = R$ 100
- Total a pagar: R$ 1000 + R$ 100 = R$ 1.100
- Parcela: 1100 ÷ 5 = **R$ 220**

## 7. Comparação de Preços

### Preço por Unidade

**Situação:** Qual é mais barato?
- Pacote A: 500g por R$ 8
- Pacote B: 750g por R$ 11

**Solução:**
- Pacote A: 8 ÷ 500 = R$ 0,016 por grama
- Pacote B: 11 ÷ 750 = R$ 0,0147 por grama

**Resposta:** Pacote B é mais barato (R$ 0,0147 < R$ 0,016)

### Economia Percentual

**Situação:** Você comprou um produto por R$ 80 que custava R$ 100. Quanto economizou em %?

**Solução:**
- Economia: R$ 100 - R$ 80 = R$ 20
- Porcentagem: (20/100) × 100 = **20%**

## Dicas Práticas

### 1. Sempre Calcule o Preço Final

Não se deixe enganar por "descontos" que na verdade são preços normais. Compare sempre com outros lugares.

### 2. Desconfie de Descontos Muito Grandes

"70% de desconto" pode significar que o preço original estava inflacionado.

### 3. Parcelamento sem Juros é Melhor

Se você tem o dinheiro, parcele sem juros e invista o resto. Se tem juros, pague à vista se possível.

### 4. Compare Taxas de Juros

Uma diferença de 1% ao mês pode significar muito dinheiro ao longo do tempo.

### 5. Use Calculadoras

Para cálculos complexos (juros compostos, financiamentos), use calculadoras online ou apps.

## Resumo das Aplicações

| Situação | Fórmula Rápida |
|----------|----------------|
| Desconto | Preço × (1 - taxa) |
| Aumento | Preço × (1 + taxa) |
| Juros simples | Capital × taxa × tempo |
| Gorjeta 10% | Mova vírgula 1 casa |
| Comparar preços | Divida por quantidade |`;

console.log('📄 Inserindo conteúdo da Página 3...');

const [page3] = await connection.execute(`
  INSERT INTO pages (moduleId, title, slug, \`order\`, mainText, conceptSummary, estimatedMinutes, videoUrl)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`, [
  moduleId,
  'Aplicações Práticas',
  'aplicacoes-praticas-porcentagem',
  3,
  page3Content,
  'Aplique porcentagens em situações reais: descontos progressivos, juros simples e compostos, impostos, gorjetas, parcelamentos e comparação de preços. Domine as finanças do dia a dia!',
  30,
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
]);

const page3Id = page3.insertId;
console.log(`   ✅ Página 3 criada (ID: ${page3Id})`);

// Exercícios da Página 3
await connection.execute(`
  INSERT INTO exercises (pageId, \`order\`, type, question, expectedAnswer, alternativeAnswers, hints)
  VALUES 
  (?, 1, 'simple_input', 'Um produto de R$ 500 está com 20% de desconto. Qual o preço final?', '400', '["R$ 400", "R$400"]', '["20% de 500 = 100", "500 - 100 = ?"]'),
  (?, 2, 'simple_input', 'Você investiu R$ 2000 a 3% ao mês por 4 meses (juros simples). Quanto de juros você ganhou?', '240', '["R$ 240", "R$240"]', '["Juros mensais: 2000 × 0,03 = 60", "60 × 4 = ?"]'),
  (?, 3, 'simple_input', 'Um salário de R$ 3500 teve desconto de 12% de INSS. Qual o valor descontado?', '420', '["R$ 420", "R$420"]', '["12% de 3500", "0,12 × 3500 = ?"]'),
  (?, 4, 'simple_input', 'Conta de restaurante: R$ 80. Você quer deixar 15% de gorjeta. Qual o total a pagar?', '92', '["R$ 92", "R$92"]', '["15% de 80 = 12", "80 + 12 = ?"]'),
  (?, 5, 'simple_input', 'Um produto custava R$ 200 e agora custa R$ 250. Qual foi o aumento percentual? (apenas o número)', '25', '["25%"]', '["Aumento: 250 - 200 = 50", "(50/200) × 100 = ?"]')
`, [page3Id, page3Id, page3Id, page3Id, page3Id]);

console.log('   ✅ 5 exercícios criados\n');

await connection.end();
console.log('🎉 Página 3 do Módulo Porcentagem criada com sucesso!');
console.log('\n✨ MÓDULO PORCENTAGEM COMPLETO! ✨');
console.log('📚 3 páginas criadas');
console.log('✏️ 14 exercícios interativos');
console.log('🎥 3 vídeos educacionais');
