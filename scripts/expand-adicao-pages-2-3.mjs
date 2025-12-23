#!/usr/bin/env node

import mysql from 'mysql2/promise';

const connection = await mysql.createConnection(process.env.DATABASE_URL);

// Página 2: A Reta Numérica (Expandida com exercícios interativos)
const pagina2Content = `# A Reta Numérica: Visualizando a Adição no Espaço

## Introdução: O Mapa dos Números

Você já imaginou os números como pontos em uma linha infinita? Essa é a ideia por trás da **reta numérica**, uma das ferramentas mais poderosas para visualizar operações matemáticas. A reta numérica transforma conceitos abstratos em movimentos concretos, tornando a matemática mais intuitiva e fácil de entender.

Nesta aula, vamos explorar como a reta numérica funciona e como usá-la para visualizar adições de forma clara e precisa. Prepare-se para ver a matemática de uma forma completamente nova!

## O que é uma Reta Numérica?

Uma **reta numérica** é uma linha reta onde cada ponto representa um número. Os números são organizados em ordem crescente da esquerda para a direita:

\`\`\`
... -3  -2  -1   0   1   2   3   4   5   6   7   8 ...
    ←                                              →
\`\`\`

Características importantes da reta numérica:

**Zero no centro:** O número 0 geralmente fica no centro ou à esquerda, servindo como ponto de referência.

**Números positivos à direita:** Os números maiores que zero (1, 2, 3, ...) ficam à direita do zero.

**Números negativos à esquerda:** Os números menores que zero (-1, -2, -3, ...) ficam à esquerda do zero.

**Espaçamento uniforme:** A distância entre números consecutivos é sempre a mesma.

## Adição como Movimento para a Direita

Na reta numérica, a **adição** é representada por um **movimento para a direita**. Quando adicionamos um número positivo, estamos "andando" para a direita na reta.

**Exemplo:** $3 + 2 = 5$

1. Começamos no número **3**
2. Adicionamos **2**, então andamos **2 passos para a direita**
3. Chegamos no número **5**

\`\`\`
    0   1   2   3   4   5   6   7   8
                ↑   →   →   ↑
            início      chegada
\`\`\`

Essa visualização torna a adição muito mais concreta. Não estamos apenas "juntando números", estamos **movendo-nos ao longo de uma linha**!

## Exemplo Prático 1: Somando Pequenos Números

Vamos visualizar $4 + 3 = 7$ na reta numérica:

**Passo a passo:**

1. Localize o número **4** na reta
2. A partir do 4, conte **3 unidades para a direita**
3. Você chegará no número **7**

\`\`\`
    0   1   2   3   4   5   6   7   8   9
                    ↑   →   →   →   ↑
                início              fim
\`\`\`

**Resposta:** $4 + 3 = 7$

**Dica:** A reta numérica é especialmente útil para crianças que estão aprendendo adição, pois transforma o conceito abstrato em algo visual e tangível.

## Exemplo Prático 2: Adições Sucessivas

Agora vamos fazer duas adições seguidas: $2 + 3 + 4 = ?$

**Passo a passo:**

1. Começamos no **2**
2. Adicionamos **3**: andamos 3 passos para a direita, chegando no **5**
3. Adicionamos **4**: andamos mais 4 passos para a direita, chegando no **9**

\`\`\`
    0   1   2   3   4   5   6   7   8   9   10
            ↑   →   →   →   ↑   →   →   →   →   ↑
        início      +3      +4              fim
\`\`\`

**Resposta:** $2 + 3 + 4 = 9$

**Observação:** Perceba que não importa se fazemos $(2 + 3) + 4$ ou $2 + (3 + 4)$, o resultado final é o mesmo (propriedade associativa)!

## Exemplo Prático 3: Começando do Zero

Quando começamos do zero, a adição fica ainda mais simples:

**Exemplo:** $0 + 5 = 5$

1. Começamos no **0**
2. Andamos **5 passos para a direita**
3. Chegamos no **5**

\`\`\`
    0   1   2   3   4   5   6   7
    ↑   →   →   →   →   →   ↑
início                      fim
\`\`\`

**Resposta:** $0 + 5 = 5$

Isso confirma a propriedade do elemento neutro: adicionar zero não muda o número!

## Exercícios Interativos com a Reta Numérica

Agora é sua vez de praticar! Use a reta numérica mental ou desenhe uma no papel para resolver:

<ExerciseCard
  question="Usando a reta numérica, calcule: 5 + 4"
  options={["7", "8", "9", "10"]}
  correctAnswer="9"
  explanation="Começando no 5 e andando 4 passos para a direita, chegamos no 9."
/>

<ExerciseCard
  question="Na reta numérica, se você está no número 3 e anda 6 passos para a direita, onde você chega?"
  options={["7", "8", "9", "10"]}
  correctAnswer="9"
  explanation="3 + 6 = 9. Você parte do 3 e anda 6 unidades para a direita."
/>

<ExerciseCard
  question="Calcule usando a reta numérica: 1 + 2 + 3"
  options={["5", "6", "7", "8"]}
  correctAnswer="6"
  explanation="1 + 2 = 3, depois 3 + 3 = 6. Na reta: comece no 1, ande 2 para direita (chega no 3), depois ande mais 3 para direita (chega no 6)."
/>

<ExerciseCard
  question="Se você está no número 7 e precisa chegar no 12, quantos passos para a direita você deve dar?"
  options={["3", "4", "5", "6"]}
  correctAnswer="5"
  explanation="12 - 7 = 5. Você precisa andar 5 passos para a direita, ou seja, adicionar 5."
/>

## Adição com Números Maiores na Reta Numérica

A reta numérica funciona com qualquer número, não apenas com números pequenos. Para números maiores, podemos usar uma reta com escala diferente.

**Exemplo:** $20 + 30 = 50$

\`\`\`
    0    10    20    30    40    50    60
              ↑     →     →     →     ↑
          início                      fim
\`\`\`

Cada "passo" aqui representa 10 unidades. Começamos no 20 e damos 3 passos de 10 unidades cada, chegando no 50.

## A Reta Numérica e o Mundo Real

A reta numérica não é apenas uma ferramenta matemática abstrata. Ela aparece em muitas situações do dia a dia:

**Termômetros:** A temperatura é medida em uma escala vertical que funciona como uma reta numérica. Quando a temperatura sobe, estamos "adicionando" graus.

**Réguas e fitas métricas:** Quando medimos comprimentos, estamos usando uma reta numérica física. Adicionar 5 cm a 10 cm significa mover 5 unidades para a direita na régua.

**Linhas do tempo:** Quando estudamos história, usamos linhas do tempo que funcionam como retas numéricas horizontais. Adicionar anos significa mover-se para a direita na linha.

**Mapas e distâncias:** Quando calculamos distâncias em um mapa, estamos essencialmente usando uma reta numérica para somar trechos de uma viagem.

## Estratégias Avançadas com a Reta Numérica

### Estratégia 1: Saltos Inteligentes

Em vez de dar muitos passos pequenos, podemos dar "saltos" maiores para facilitar o cálculo.

**Exemplo:** $7 + 8 = ?$

Em vez de contar 8 unidades uma por uma, podemos:
1. Dar um salto de 3 unidades (de 7 para 10)
2. Dar um salto de 5 unidades (de 10 para 15)

Total: $7 + 3 + 5 = 7 + 8 = 15$

### Estratégia 2: Decomposição

Podemos decompor um número em partes menores para facilitar a visualização.

**Exemplo:** $15 + 7 = ?$

Decompomos 7 em 5 + 2:
1. $15 + 5 = 20$ (chegamos em um número redondo)
2. $20 + 2 = 22$ (adicionamos o resto)

**Resposta:** $15 + 7 = 22$

## Desafios Avançados

Agora tente resolver estes desafios mais complexos:

**Desafio 1:** Use a reta numérica para calcular $12 + 15$. Dica: Decomponha 15 em 8 + 7 para facilitar.

**Desafio 2:** Se você está no número 25 e precisa chegar no 50, quantos passos de 5 unidades você deve dar?

**Desafio 3:** Calcule $18 + 9$ usando a estratégia de "completar a dezena". Dica: 18 + 2 = 20, então...

## Conclusão: A Reta Numérica Como Ferramenta Universal

A reta numérica é muito mais do que um simples desenho. Ela é uma **representação visual poderosa** que nos ajuda a:

**Entender a adição de forma concreta:** Em vez de memorizar regras, visualizamos o movimento.

**Desenvolver intuição matemática:** Vemos padrões e relações entre números de forma natural.

**Resolver problemas complexos:** Estratégias como saltos e decomposição ficam mais claras.

**Conectar matemática com o mundo real:** Termômetros, réguas, linhas do tempo - tudo é uma reta numérica!

Lembre-se: matemática não é sobre decorar fórmulas, mas sobre **entender padrões** e **visualizar relações**. A reta numérica é sua aliada nessa jornada!

**Próximo passo:** Na próxima aula, vamos aprender sobre **adição com reagrupamento** (o famoso "vai um"), uma técnica essencial para somar números grandes. Até lá!
`;

// Página 3: Adição com Reagrupamento (Expandida com desafios progressivos)
const pagina3Content = `# Adição com Reagrupamento: Dominando Números Grandes

## Introdução: Além dos Números Simples

Até agora, trabalhamos com adições relativamente simples. Mas e quando precisamos somar números grandes, como 347 + 286? Ou quando a soma de uma coluna ultrapassa 9, como em 7 + 6 = 13? É aí que entra a **adição com reagrupamento**, também conhecida como "vai um".

Nesta aula, vamos dominar essa técnica fundamental que permite somar qualquer número, não importa quão grande seja. Prepare-se para se tornar um mestre da adição!

## O Conceito de Reagrupamento

**Reagrupamento** é o processo de transformar 10 unidades em 1 dezena, 10 dezenas em 1 centena, e assim por diante. Quando a soma de uma coluna resulta em um número maior que 9, precisamos "reagrupar" o excesso para a próxima coluna.

**Por que isso funciona?** Nosso sistema numérico é **decimal** (base 10), o que significa que cada posição vale 10 vezes mais que a posição à sua direita. Quando temos 10 ou mais unidades, podemos (e devemos) transformá-las em 1 dezena.

## Entendendo as Posições dos Números

Antes de aprender o reagrupamento, precisamos entender como os números são organizados em posições:

\`\`\`
Centenas | Dezenas | Unidades
    3    |    4    |    7     = 347
    2    |    8    |    6     = 286
\`\`\`

Cada posição tem um valor específico:
- **Unidades:** 1, 2, 3, ..., 9
- **Dezenas:** 10, 20, 30, ..., 90
- **Centenas:** 100, 200, 300, ..., 900

## Passo a Passo: Adição com Reagrupamento

Vamos resolver $347 + 286$ passo a passo:

### Passo 1: Alinhar os Números por Posição

\`\`\`
  347
+ 286
-----
\`\`\`

**Importante:** Sempre alinhe os números pela direita, garantindo que unidades fiquem embaixo de unidades, dezenas embaixo de dezenas, e assim por diante.

### Passo 2: Somar a Coluna das Unidades

$7 + 6 = 13$

Como 13 é maior que 9, precisamos reagrupar:
- Escrevemos o **3** (unidades) na coluna das unidades
- "Levamos" o **1** (que representa 1 dezena) para a próxima coluna

\`\`\`
   ¹
  347
+ 286
-----
    3
\`\`\`

### Passo 3: Somar a Coluna das Dezenas

$4 + 8 = 12$, mais o 1 que "veio" = $13$

Novamente, precisamos reagrupar:
- Escrevemos o **3** na coluna das dezenas
- "Levamos" o **1** (que representa 1 centena) para a próxima coluna

\`\`\`
  ¹¹
  347
+ 286
-----
   33
\`\`\`

### Passo 4: Somar a Coluna das Centenas

$3 + 2 = 5$, mais o 1 que "veio" = $6$

Como 6 é menor que 10, não precisamos reagrupar. Escrevemos 6 na coluna das centenas.

\`\`\`
  ¹¹
  347
+ 286
-----
  633
\`\`\`

**Resposta final:** $347 + 286 = 633$

## Exemplo Prático 1: Compras em uma Loja

**Situação:** Você comprou três itens em uma loja eletrônica:
- Fone de ouvido: R$ 189,00
- Mouse: R$ 145,00
- Teclado: R$ 278,00

**Pergunta:** Quanto você gastou no total?

**Solução:**

\`\`\`
  189
  145
+ 278
-----
\`\`\`

**Unidades:** $9 + 5 + 8 = 22$ → Escrevo 2, levo 2

\`\`\`
   ²
  189
  145
+ 278
-----
    2
\`\`\`

**Dezenas:** $8 + 4 + 7 = 19$, mais 2 que veio = $21$ → Escrevo 1, levo 2

\`\`\`
  ²²
  189
  145
+ 278
-----
   12
\`\`\`

**Centenas:** $1 + 1 + 2 = 4$, mais 2 que veio = $6$

\`\`\`
  ²²
  189
  145
+ 278
-----
  612
\`\`\`

**Resposta:** Você gastou **R$ 612,00** no total.

## Exemplo Prático 2: Distância Total de uma Corrida

**Situação:** Um corredor treinou durante três dias:
- Segunda-feira: 1.875 metros
- Quarta-feira: 2.450 metros
- Sexta-feira: 1.980 metros

**Pergunta:** Quantos metros ele correu no total?

**Solução:**

\`\`\`
  1875
  2450
+ 1980
------
\`\`\`

**Unidades:** $5 + 0 + 0 = 5$

**Dezenas:** $7 + 5 + 8 = 20$ → Escrevo 0, levo 2

**Centenas:** $8 + 4 + 9 = 21$, mais 2 = $23$ → Escrevo 3, levo 2

**Milhares:** $1 + 2 + 1 = 4$, mais 2 = $6$

\`\`\`
   ²²
  1875
  2450
+ 1980
------
  6305
\`\`\`

**Resposta:** Ele correu **6.305 metros** no total (ou 6,305 km).

## Exercícios Interativos: Nível Básico

<ExerciseCard
  question="Calcule: 45 + 38"
  options={["73", "83", "93", "103"]}
  correctAnswer="83"
  explanation="Unidades: 5 + 8 = 13 (escrevo 3, levo 1). Dezenas: 4 + 3 = 7, mais 1 = 8. Resposta: 83."
/>

<ExerciseCard
  question="Resolva: 127 + 86"
  options={["203", "213", "223", "233"]}
  correctAnswer="213"
  explanation="Unidades: 7 + 6 = 13 (escrevo 3, levo 1). Dezenas: 2 + 8 = 10, mais 1 = 11 (escrevo 1, levo 1). Centenas: 1 + 0 = 1, mais 1 = 2. Resposta: 213."
/>

<ExerciseCard
  question="Calcule: 456 + 789"
  options={["1145", "1235", "1245", "1345"]}
  correctAnswer="1245"
  explanation="Unidades: 6 + 9 = 15 (escrevo 5, levo 1). Dezenas: 5 + 8 = 13, mais 1 = 14 (escrevo 4, levo 1). Centenas: 4 + 7 = 11, mais 1 = 12. Resposta: 1245."
/>

## Exercícios Interativos: Nível Intermediário

<ExerciseCard
  question="Uma escola tem 387 alunos no turno da manhã e 459 no turno da tarde. Quantos alunos a escola tem no total?"
  options={["746", "836", "846", "946"]}
  correctAnswer="846"
  explanation="387 + 459 = 846. Unidades: 7 + 9 = 16. Dezenas: 8 + 5 + 1 = 14. Centenas: 3 + 4 + 1 = 8."
/>

<ExerciseCard
  question="Um caminhão transportou 1.568 kg de carga na primeira viagem e 2.745 kg na segunda. Quantos kg foram transportados no total?"
  options={["4213", "4313", "4413", "4513"]}
  correctAnswer="4313"
  explanation="1568 + 2745 = 4313. Some coluna por coluna com reagrupamento."
/>

## Exercícios Interativos: Nível Avançado

<ExerciseCard
  question="Calcule: 9.876 + 8.765 + 7.654"
  options={["26195", "26295", "26395", "26495"]}
  correctAnswer="26295"
  explanation="Some os três números coluna por coluna. Unidades: 6+5+4=15. Dezenas: 7+6+5+1=19. Centenas: 8+7+6+1=22. Milhares: 9+8+7+2=26. Resposta: 26.295."
/>

<ExerciseCard
  question="Uma empresa vendeu R$ 15.890 em janeiro, R$ 23.456 em fevereiro e R$ 18.975 em março. Qual foi o faturamento total no trimestre?"
  options={["58221", "58321", "58421", "58521"]}
  correctAnswer="58321"
  explanation="15890 + 23456 + 18975 = 58321. Faça a adição com reagrupamento cuidadosamente em cada coluna."
/>

## Estratégias para Evitar Erros

**Estratégia 1: Sempre alinhe os números pela direita**

❌ Errado:
\`\`\`
347
+ 86
----
\`\`\`

✅ Correto:
\`\`\`
  347
+  86
-----
\`\`\`

**Estratégia 2: Marque os "vai um" acima da próxima coluna**

Isso evita que você esqueça de adicionar o valor que "veio" da coluna anterior.

**Estratégia 3: Verifique sua resposta**

Você pode estimar o resultado arredondando os números. Por exemplo, $347 + 286$ é aproximadamente $350 + 290 = 640$. Se sua resposta for muito diferente disso, revise os cálculos!

**Estratégia 4: Pratique com números menores primeiro**

Antes de tentar somar números de 4 ou 5 dígitos, domine bem as adições de 2 e 3 dígitos.

## Desafios Progressivos

Agora é hora de testar suas habilidades! Tente resolver estes desafios em ordem crescente de dificuldade:

**Desafio Nível 1:** $56 + 78 = ?$

**Desafio Nível 2:** $234 + 567 = ?$

**Desafio Nível 3:** $1.489 + 2.876 = ?$

**Desafio Nível 4:** $15.678 + 24.893 + 31.567 = ?$

**Desafio Nível 5 (Super Desafio):** Uma empresa tem três filiais. A filial A faturou R$ 45.789, a filial B faturou R$ 67.345 e a filial C faturou R$ 89.123. Qual foi o faturamento total das três filiais?

## Aplicações no Mundo Real

A adição com reagrupamento é essencial em inúmeras situações:

**Finanças pessoais:** Somar gastos mensais, calcular economias acumuladas, planejar orçamentos.

**Comércio:** Calcular totais de vendas, somar estoques de diferentes produtos, contabilizar receitas.

**Engenharia:** Somar medidas de diferentes componentes, calcular cargas totais, dimensionar estruturas.

**Ciência:** Somar dados experimentais, calcular totais em pesquisas estatísticas, analisar grandes conjuntos de dados.

**Logística:** Calcular distâncias totais de rotas, somar pesos de cargas, planejar capacidades de transporte.

## Conclusão: Dominando a Adição Completa

Parabéns! Você agora domina a adição com reagrupamento, uma habilidade fundamental que permite somar qualquer número, não importa quão grande seja. Essa técnica é a base para operações mais avançadas que você aprenderá no futuro.

Lembre-se dos pontos-chave:

**Alinhe sempre os números pela direita:** Garanta que cada posição esteja corretamente alinhada.

**Some coluna por coluna, da direita para a esquerda:** Comece pelas unidades e vá até as maiores posições.

**Reagrupe quando necessário:** Quando a soma de uma coluna for 10 ou mais, "leve um" para a próxima coluna.

**Pratique regularmente:** A prática leva à perfeição. Quanto mais você praticar, mais rápido e preciso ficará!

**Próximo passo:** Agora que você domina a adição, está pronto para aprender sobre **subtração**, a operação inversa da adição. Até a próxima aula!
`;

console.log('Expandindo Páginas 2 e 3 de Adição...');

await connection.execute(
  'UPDATE pages SET mainText = ? WHERE moduleId = 1 AND `order` = 2',
  [pagina2Content]
);
console.log('✅ Página 2 expandida com sucesso!');

await connection.execute(
  'UPDATE pages SET mainText = ? WHERE moduleId = 1 AND `order` = 3',
  [pagina3Content]
);
console.log('✅ Página 3 expandida com sucesso!');

await connection.end();
console.log('\n🎉 Expansão das 3 páginas de Adição concluída!');
