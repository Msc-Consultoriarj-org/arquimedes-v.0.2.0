#!/usr/bin/env node

import mysql from 'mysql2/promise';

const connection = await mysql.createConnection(process.env.DATABASE_URL);

// Página 1: O que é Adição? (Expandida com 3+ exemplos práticos)
const pagina1Content = `# O que é Adição? Descobrindo o Poder de Juntar

## Introdução: A Matemática do Crescimento

A adição é uma das operações matemáticas mais fundamentais e intuitivas que existem. Desde os primeiros anos de vida, praticamos adição sem nem perceber. Quando uma criança junta dois blocos de montar com três blocos que já tinha, ela está fazendo adição. Quando você conta quantas pessoas estão em uma sala e mais alguém entra, você está adicionando. A adição está em todo lugar, e dominar essa operação é essencial para o sucesso em matemática e na vida cotidiana.

Nesta aula, vamos explorar profundamente o conceito de adição, entender por que ela funciona, e ver como aplicá-la em situações reais do dia a dia. Prepare-se para descobrir que a matemática não é apenas números em um papel, mas uma ferramenta poderosa para entender o mundo ao nosso redor!

## O Conceito Fundamental: O que Significa "Adicionar"?

**Adicionar** significa **juntar**, **combinar** ou **aumentar**. Quando adicionamos dois ou mais números, estamos descobrindo o total que resulta de juntá-los. Em termos matemáticos, a adição é representada pelo símbolo **+** (mais), e o resultado é chamado de **soma**.

A estrutura básica de uma adição é:

$$\\text{Parcela 1} + \\text{Parcela 2} = \\text{Soma}$$

Por exemplo, em $5 + 3 = 8$:
- **5** e **3** são as **parcelas** (os números que estamos juntando)
- **8** é a **soma** (o resultado final)

Mas por que isso funciona? A adição funciona porque estamos contando elementos de conjuntos diferentes e descobrindo quantos elementos temos no total. Se você tem 5 maçãs em uma cesta e coloca mais 3 maçãs, agora você tem 8 maçãs no total. Simples, mas poderoso!

## Propriedades da Adição: Regras que Facilitam os Cálculos

A adição possui algumas propriedades matemáticas importantes que tornam os cálculos mais fáceis e eficientes. Vamos conhecer as principais:

### 1. Propriedade Comutativa

A ordem das parcelas não altera a soma. Isso significa que:

$$a + b = b + a$$

**Exemplo prático:** $3 + 5 = 5 + 3 = 8$

Não importa se você junta 3 maçãs com 5 laranjas ou 5 laranjas com 3 maçãs, o total de frutas será sempre 8. Essa propriedade é extremamente útil porque nos permite reorganizar os números de uma forma que facilite o cálculo mental.

### 2. Propriedade Associativa

Quando adicionamos três ou mais números, podemos agrupá-los de diferentes formas sem alterar o resultado:

$$(a + b) + c = a + (b + c)$$

**Exemplo prático:** $(2 + 3) + 4 = 2 + (3 + 4) = 9$

Você pode primeiro somar 2 + 3 = 5, e depois 5 + 4 = 9. Ou pode somar 3 + 4 = 7, e depois 2 + 7 = 9. O resultado é o mesmo! Essa propriedade é útil quando queremos encontrar combinações de números que sejam mais fáceis de calcular mentalmente.

### 3. Elemento Neutro (Zero)

Quando adicionamos zero a qualquer número, o resultado é o próprio número:

$$a + 0 = a$$

**Exemplo prático:** $7 + 0 = 7$

O zero é chamado de "elemento neutro" da adição porque ele não altera o valor do número. Se você tem 7 reais e não ganha nem perde nada (adiciona zero), você continua com 7 reais.

## Exemplo Prático 1: Compras no Supermercado

Imagine que você foi ao supermercado fazer compras e precisa calcular quanto gastou. Vamos ver como a adição é essencial nessa situação:

**Situação:** Você comprou os seguintes itens:
- 1 pacote de arroz: R$ 12,00
- 1 garrafa de óleo: R$ 8,00
- 1 pacote de feijão: R$ 9,00
- 1 caixa de leite: R$ 6,00

**Pergunta:** Quanto você gastou no total?

**Solução:**

Para descobrir o total, precisamos adicionar o preço de todos os itens:

$$12 + 8 + 9 + 6 = ?$$

Vamos calcular passo a passo:

1. Primeiro, somamos 12 + 8 = 20
2. Depois, somamos 20 + 9 = 29
3. Por fim, somamos 29 + 6 = 35

**Resposta:** Você gastou **R$ 35,00** no total.

**Dica de cálculo mental:** Você poderia usar a propriedade associativa para facilitar! Note que 12 + 8 = 20 e 9 + 6 = 15. Então, 20 + 15 = 35. Agrupar os números de forma inteligente torna o cálculo mais rápido!

## Exemplo Prático 2: Pontuação em um Jogo

Agora vamos ver como a adição aparece em jogos e competições:

**Situação:** Você está jogando um jogo de videogame e precisa somar seus pontos de três fases diferentes:
- Fase 1: 450 pontos
- Fase 2: 320 pontos
- Fase 3: 180 pontos

**Pergunta:** Quantos pontos você tem no total?

**Solução:**

$$450 + 320 + 180 = ?$$

Vamos calcular:

1. Primeiro, 450 + 320 = 770
2. Depois, 770 + 180 = 950

**Resposta:** Você tem **950 pontos** no total.

**Estratégia avançada:** Você poderia arredondar os números para facilitar o cálculo mental. Por exemplo, 450 + 320 ≈ 450 + 300 = 750, e depois adicionar os 20 que faltam: 750 + 20 = 770. Depois, 770 + 180 ≈ 770 + 200 = 970, e subtrair os 20 extras: 970 - 20 = 950. Essa técnica de arredondamento e ajuste é muito útil para cálculos rápidos!

## Exemplo Prático 3: Distâncias em uma Viagem

A adição também é fundamental quando trabalhamos com medidas, como distâncias:

**Situação:** Você está fazendo uma viagem de carro e precisa calcular a distância total percorrida. Você dividiu a viagem em três trechos:
- Trecho 1: 85 km
- Trecho 2: 120 km
- Trecho 3: 95 km

**Pergunta:** Qual é a distância total da viagem?

**Solução:**

$$85 + 120 + 95 = ?$$

Vamos calcular de forma inteligente:

1. Note que 85 + 95 = 180 (uma soma fácil!)
2. Agora, 180 + 120 = 300

**Resposta:** A distância total da viagem é **300 km**.

**Observação:** Perceba como usamos a propriedade comutativa para reorganizar os números (somamos 85 + 95 primeiro, em vez de seguir a ordem original). Isso tornou o cálculo muito mais simples!

## Exemplo Prático 4: Tempo de Estudo

Vamos ver como a adição funciona com tempo:

**Situação:** Você estudou matemática durante a semana e quer saber quantas horas dedicou ao estudo:
- Segunda-feira: 1 hora e 30 minutos
- Quarta-feira: 2 horas
- Sexta-feira: 1 hora e 45 minutos

**Pergunta:** Quantas horas você estudou no total?

**Solução:**

Primeiro, vamos converter tudo para minutos para facilitar:
- Segunda: 1h 30min = 90 minutos
- Quarta: 2h = 120 minutos
- Sexta: 1h 45min = 105 minutos

Agora somamos:

$$90 + 120 + 105 = 315 \\text{ minutos}$$

Para converter de volta para horas e minutos:
- 315 minutos ÷ 60 = 5 horas e 15 minutos

**Resposta:** Você estudou **5 horas e 15 minutos** no total.

**Dica:** Trabalhar com unidades de medida (como horas e minutos) requer atenção especial. Às vezes é mais fácil converter tudo para a menor unidade (minutos), fazer a adição, e depois converter de volta.

## Adição com Números Maiores

Até agora, trabalhamos com números relativamente pequenos. Mas a adição funciona da mesma forma com números grandes! A técnica mais comum é a **adição com reagrupamento** (também chamada de "vai um").

**Exemplo:** $347 + 286 = ?$

Vamos somar coluna por coluna, da direita para a esquerda:

\`\`\`
  347
+ 286
-----
\`\`\`

1. **Unidades:** 7 + 6 = 13. Escrevemos 3 e "vai 1" para as dezenas.
2. **Dezenas:** 4 + 8 = 12, mais o 1 que "veio" = 13. Escrevemos 3 e "vai 1" para as centenas.
3. **Centenas:** 3 + 2 = 5, mais o 1 que "veio" = 6.

\`\`\`
   ¹¹
  347
+ 286
-----
  633
\`\`\`

**Resposta:** $347 + 286 = 633$

## Aplicações da Adição no Mundo Real

A adição está presente em inúmeras situações do dia a dia:

**Finanças:** Calcular o total de gastos, somar receitas, verificar o saldo bancário após depósitos.

**Culinária:** Somar quantidades de ingredientes ao dobrar uma receita, calcular o tempo total de preparo.

**Esportes:** Somar pontos de uma equipe, calcular a pontuação total de um atleta em competições.

**Construção:** Calcular a quantidade total de materiais necessários, somar medidas de diferentes partes de uma estrutura.

**Ciência:** Somar dados coletados em experimentos, calcular totais em pesquisas estatísticas.

## Desafios para Praticar

Agora é sua vez de praticar! Tente resolver estes problemas:

**Desafio 1:** Maria tem 15 figurinhas, João tem 23 figurinhas e Pedro tem 18 figurinhas. Quantas figurinhas eles têm juntos?

**Desafio 2:** Uma loja vendeu 145 produtos na segunda-feira, 198 na terça-feira e 167 na quarta-feira. Quantos produtos foram vendidos no total nesses três dias?

**Desafio 3:** Um corredor percorreu 5 km na primeira semana, 8 km na segunda semana e 12 km na terceira semana. Quantos quilômetros ele percorreu no total?

## Conclusão: A Adição Como Ferramenta Essencial

A adição é muito mais do que apenas juntar números. Ela é uma ferramenta fundamental para resolver problemas reais, tomar decisões informadas e entender o mundo ao nosso redor. Ao dominar a adição e suas propriedades, você está construindo uma base sólida para todas as outras operações matemáticas que virão.

Lembre-se: a matemática não é sobre decorar fórmulas, mas sobre **entender padrões** e **resolver problemas**. A adição é o primeiro passo dessa jornada incrível!

**Próximo passo:** Na próxima aula, vamos aprender a visualizar a adição usando a **reta numérica**, uma ferramenta poderosa que torna a matemática ainda mais concreta e intuitiva. Até lá!
`;

console.log('Expandindo Página 1 de Adição...');
await connection.execute(
  'UPDATE pages SET mainText = ? WHERE moduleId = 1 AND `order` = 1',
  [pagina1Content]
);
console.log('✅ Página 1 expandida com sucesso!');

await connection.end();
console.log('\n🎉 Expansão concluída!');
