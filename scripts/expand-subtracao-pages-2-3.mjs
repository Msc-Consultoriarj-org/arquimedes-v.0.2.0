#!/usr/bin/env node

import mysql from 'mysql2/promise';

const connection = await mysql.createConnection(process.env.DATABASE_URL);

// Buscar IDs das páginas de Subtração
const [subPages] = await connection.execute(
  'SELECT id, title, slug, `order` FROM pages WHERE moduleId = 1 AND `order` >= 4 ORDER BY `order` LIMIT 3'
);

if (subPages.length < 3) {
  console.log('❌ Erro: Páginas de Subtração não encontradas');
  process.exit(1);
}

// Página 2: Subtração na Reta Numérica (com visualizações NumberLine)
const subtracao2Content = `# Subtração na Reta Numérica: Visualizando o Movimento para Trás

## Introdução: Vendo a Subtração em Ação

Na aula anterior, aprendemos que a adição é um movimento para a **direita** na reta numérica. Agora vamos descobrir que a subtração é o movimento oposto: um **movimento para a esquerda**. Essa visualização torna a subtração muito mais concreta e intuitiva!

Nesta aula, vamos explorar como usar a reta numérica para visualizar subtrações, entender por que a subtração é a operação inversa da adição, e desenvolver estratégias visuais para resolver problemas complexos.

## Subtração como Movimento para a Esquerda

Na reta numérica, a **subtração** é representada por um **movimento para a esquerda**. Quando subtraímos um número positivo, estamos "andando para trás" na reta.

**Exemplo:** $7 - 3 = 4$

1. Começamos no número **7**
2. Subtraímos **3**, então andamos **3 passos para a esquerda**
3. Chegamos no número **4**

\`\`\`
    0   1   2   3   4   5   6   7   8
                    ↑   ←   ←   ←   ↑
                chegada          início
\`\`\`

<NumberLine
  start={0}
  end={10}
  highlight={[7, 4]}
  label="7 - 3 = 4"
/>

**Observação:** Perceba que a subtração é exatamente o oposto da adição. Se $4 + 3 = 7$ (movimento para direita), então $7 - 3 = 4$ (movimento para esquerda).

## Exemplo Prático 1: Subtração Simples

Vamos visualizar $9 - 5 = 4$ na reta numérica:

**Passo a passo:**

1. Localize o número **9** na reta
2. A partir do 9, conte **5 unidades para a esquerda**
3. Você chegará no número **4**

\`\`\`
    0   1   2   3   4   5   6   7   8   9   10
                    ↑   ←   ←   ←   ←   ←   ↑
                chegada                  início
\`\`\`

<NumberLine
  start={0}
  end={10}
  highlight={[9, 4]}
  label="9 - 5 = 4"
/>

**Resposta:** $9 - 5 = 4$

**Verificação:** $4 + 5 = 9$ ✓

## Exemplo Prático 2: Subtrações Sucessivas

Agora vamos fazer duas subtrações seguidas: $10 - 3 - 2 = ?$

**Passo a passo:**

1. Começamos no **10**
2. Subtraímos **3**: andamos 3 passos para a esquerda, chegando no **7**
3. Subtraímos **2**: andamos mais 2 passos para a esquerda, chegando no **5**

\`\`\`
    0   1   2   3   4   5   6   7   8   9   10
                    ↑   ←   ←   ↑   ←   ←   ←   ↑
                  fim      -2      -3      início
\`\`\`

<NumberLine
  start={0}
  end={10}
  highlight={[10, 7, 5]}
  label="10 - 3 - 2 = 5"
/>

**Resposta:** $10 - 3 - 2 = 5$

**Observação:** Podemos também pensar como $10 - (3 + 2) = 10 - 5 = 5$

## Exemplo Prático 3: Comparando Adição e Subtração

Vamos ver visualmente como adição e subtração são operações inversas:

**Adição:** $3 + 4 = 7$ (movimento para direita)
**Subtração:** $7 - 4 = 3$ (movimento para esquerda, voltando ao início)

\`\`\`
Adição:
    0   1   2   3   4   5   6   7   8
            ↑   →   →   →   →   ↑
        início              fim

Subtração:
    0   1   2   3   4   5   6   7   8
            ↑   ←   ←   ←   ←   ↑
          fim              início
\`\`\`

<NumberLine
  start={0}
  end={8}
  highlight={[3, 7]}
  label="3 + 4 = 7 e 7 - 4 = 3"
/>

**Conclusão:** A subtração "desfaz" o que a adição fez!

## Exercícios Interativos com a Reta Numérica

<ExerciseCard
  question="Usando a reta numérica, calcule: 8 - 5"
  options={["2", "3", "4", "5"]}
  correctAnswer="3"
  explanation="Começando no 8 e andando 5 passos para a esquerda, chegamos no 3."
/>

<ExerciseCard
  question="Na reta numérica, se você está no número 10 e anda 6 passos para a esquerda, onde você chega?"
  options={["3", "4", "5", "6"]}
  correctAnswer="4"
  explanation="10 - 6 = 4. Você parte do 10 e anda 6 unidades para a esquerda."
/>

<ExerciseCard
  question="Calcule usando a reta numérica: 12 - 3 - 4"
  options={["4", "5", "6", "7"]}
  correctAnswer="5"
  explanation="12 - 3 = 9, depois 9 - 4 = 5. Na reta: comece no 12, ande 3 para esquerda (chega no 9), depois ande mais 4 para esquerda (chega no 5)."
/>

<ExerciseCard
  question="Se você está no número 15 e precisa chegar no 8, quantos passos para a esquerda você deve dar?"
  options={["5", "6", "7", "8"]}
  correctAnswer="7"
  explanation="15 - 8 = 7. Você precisa andar 7 passos para a esquerda, ou seja, subtrair 7."
/>

## Estratégia 1: Saltos Inteligentes

Em vez de dar muitos passos pequenos, podemos dar "saltos" maiores para facilitar o cálculo.

**Exemplo:** $23 - 8 = ?$

Em vez de contar 8 unidades uma por uma, podemos:
1. Dar um salto de 3 unidades (de 23 para 20)
2. Dar um salto de 5 unidades (de 20 para 15)

Total: $23 - 3 - 5 = 23 - 8 = 15$

<NumberLine
  start={10}
  end={25}
  highlight={[23, 20, 15]}
  label="23 - 8 = 15 (saltos: -3, -5)"
/>

**Dica:** Sempre tente chegar em números "redondos" (terminados em 0) primeiro!

## Estratégia 2: Completar a Dezena

Podemos usar a reta numérica para visualizar a estratégia de "completar a dezena".

**Exemplo:** $34 - 17 = ?$

1. De 17 até 20: faltam 3
2. De 20 até 34: faltam 14
3. Total: $3 + 14 = 17$

\`\`\`
   15   16   17   18   19   20   ...   30   31   32   33   34
                ↑    →    →    →   ↑    ...              →    ↑
            início   (+3)      20         ...         (+14)  fim
\`\`\`

**Resposta:** $34 - 17 = 17$

## Subtração com Números Maiores

A reta numérica funciona com qualquer número! Para números maiores, usamos uma escala diferente.

**Exemplo:** $80 - 30 = 50$

\`\`\`
    0    10    20    30    40    50    60    70    80    90
                          ↑     ←     ←     ←     ←     ↑
                        fim                          início
\`\`\`

Cada "passo" aqui representa 10 unidades. Começamos no 80 e damos 3 passos de 10 unidades cada para a esquerda, chegando no 50.

<NumberLine
  start={0}
  end={100}
  step={10}
  highlight={[80, 50]}
  label="80 - 30 = 50"
/>

## Aplicações Práticas com Visualização

### Exemplo 1: Temperatura

**Situação:** A temperatura estava em 25°C pela manhã e caiu 8°C à noite. Qual é a temperatura agora?

**Solução visual:**

\`\`\`
   15   16   17   18   19   20   21   22   23   24   25   26
                    ↑    ←    ←    ←    ←    ←    ←    ←    ↑
                  fim                                    início
\`\`\`

$25 - 8 = 17$

**Resposta:** A temperatura agora é **17°C**.

### Exemplo 2: Distância Restante

**Situação:** Você precisa percorrer 50 km. Já percorreu 32 km. Quanto falta?

**Solução visual:**

\`\`\`
    0    10    20    30    40    50
         ←     ←     ←     ↑     ↑
       falta              já    total
                        percorreu
\`\`\`

$50 - 32 = 18$

**Resposta:** Faltam **18 km**.

## Exercícios Avançados

<ExerciseCard
  question="Use a estratégia de saltos para calcular: 45 - 18"
  options={["25", "26", "27", "28"]}
  correctAnswer="27"
  explanation="45 - 5 = 40 (salto de 5), depois 40 - 13 = 27 (salto de 13). Total: 5 + 13 = 18."
/>

<ExerciseCard
  question="Calcule usando completar a dezena: 52 - 27"
  options={["23", "24", "25", "26"]}
  correctAnswer="25"
  explanation="De 27 até 30: 3. De 30 até 52: 22. Total: 3 + 22 = 25."
/>

<ExerciseCard
  question="Na reta numérica de 0 a 100 (escala de 10), quantos saltos de 10 você precisa dar para ir de 90 até 40?"
  options={["4", "5", "6", "7"]}
  correctAnswer="5"
  explanation="90 - 40 = 50. Como cada salto vale 10, precisamos de 50 ÷ 10 = 5 saltos."
/>

## A Reta Numérica e Números Negativos (Prévia)

Quando subtraímos um número maior de um número menor, entramos no território dos **números negativos** (à esquerda do zero).

**Exemplo:** $3 - 5 = -2$

\`\`\`
   -3  -2  -1   0   1   2   3   4   5
    ↑   ←   ←   ←   ←   ←   ↑
  fim                      início
\`\`\`

**Observação:** Você aprenderá mais sobre números negativos em aulas futuras!

## Desafios Progressivos

**Desafio Nível 1:** Use a reta numérica para calcular $14 - 6$.

**Desafio Nível 2:** Calcule $28 - 13$ usando a estratégia de saltos inteligentes.

**Desafio Nível 3:** Use completar a dezena para resolver $63 - 38$.

**Desafio Nível 4:** Na reta numérica de 0 a 200 (escala de 20), calcule $180 - 80$.

**Desafio Nível 5:** Você tem R$ 75 e gasta R$ 28 em uma compra e R$ 19 em outra. Quanto sobrou? Visualize na reta numérica.

## Conclusão: A Reta Numérica Como Ferramenta Visual Poderosa

A reta numérica transforma a subtração de um conceito abstrato em um **movimento visual concreto**. Ela nos ajuda a:

**Entender a subtração intuitivamente:** Vemos o movimento para trás, não apenas números.

**Desenvolver estratégias eficientes:** Saltos inteligentes e completar dezenas ficam mais claros.

**Verificar respostas:** Podemos "voltar" fazendo adição e ver se chegamos ao ponto inicial.

**Conectar com o mundo real:** Distâncias, temperaturas, tempo - tudo pode ser visualizado na reta.

**Preparar para conceitos avançados:** Números negativos, equações, funções - tudo começa aqui!

Lembre-se: matemática não é sobre decorar regras, mas sobre **visualizar** e **entender** o que está acontecendo. A reta numérica é sua melhor aliada nessa jornada!

**Próximo passo:** Na próxima aula, vamos dominar a **subtração com reagrupamento** (o famoso "empresta um"), a técnica essencial para subtrair números grandes. Até lá!
`;

// Página 3: Subtração com Reagrupamento (exercícios variados)
const subtracao3Content = `# Subtração com Reagrupamento: Dominando o "Empresta Um"

## Introdução: Quando Precisamos "Emprestar"

Até agora, trabalhamos com subtrações relativamente simples. Mas e quando o dígito do minuendo é menor que o dígito do subtraendo? Por exemplo, como fazemos $52 - 27$ quando não podemos fazer $2 - 7$ diretamente?

É aí que entra a **subtração com reagrupamento**, também conhecida como "empresta um". Nesta aula, vamos dominar essa técnica fundamental que permite subtrair qualquer número, não importa quão complexo seja!

## O Conceito de Reagrupamento na Subtração

**Reagrupamento** na subtração é o processo de "emprestar" 1 unidade da posição à esquerda quando não conseguimos subtrair diretamente. Essa 1 unidade vale 10 na posição atual.

**Por que isso funciona?** Nosso sistema numérico é **decimal** (base 10). Isso significa que:
- 1 dezena = 10 unidades
- 1 centena = 10 dezenas = 100 unidades
- 1 milhar = 10 centenas = 1000 unidades

Quando "emprestamos" 1 dezena, estamos transformando-a em 10 unidades!

## Entendendo o Processo Visualmente

Vamos entender $52 - 27$ de forma visual:

**Representação inicial:**
- 52 = 5 dezenas + 2 unidades
- 27 = 2 dezenas + 7 unidades

**Problema:** Não podemos fazer $2 - 7$ (unidades)

**Solução:** "Emprestamos" 1 dezena:
- 5 dezenas → 4 dezenas
- 2 unidades + 10 unidades (emprestadas) = 12 unidades

**Agora podemos subtrair:**
- Unidades: $12 - 7 = 5$
- Dezenas: $4 - 2 = 2$

**Resposta:** $52 - 27 = 25$

## Passo a Passo: Subtração com Reagrupamento

Vamos resolver $345 - 178$ passo a passo:

### Passo 1: Alinhar os Números por Posição

\`\`\`
  345
- 178
-----
\`\`\`

**Importante:** Sempre alinhe pela direita!

### Passo 2: Subtrair a Coluna das Unidades

Tentamos fazer $5 - 8$, mas 5 é menor que 8. Precisamos emprestar!

**Emprestamos 1 dezena (10 unidades):**
- 4 dezenas → 3 dezenas
- 5 unidades + 10 = 15 unidades

Agora: $15 - 8 = 7$

\`\`\`
  3 ¹⁵
  345
- 178
-----
    7
\`\`\`

### Passo 3: Subtrair a Coluna das Dezenas

Tentamos fazer $3 - 7$ (lembre-se que já emprestamos 1), mas 3 é menor que 7. Precisamos emprestar novamente!

**Emprestamos 1 centena (10 dezenas):**
- 3 centenas → 2 centenas
- 3 dezenas + 10 = 13 dezenas

Agora: $13 - 7 = 6$

\`\`\`
 ² ¹³ ¹⁵
  345
- 178
-----
   67
\`\`\`

### Passo 4: Subtrair a Coluna das Centenas

$2 - 1 = 1$

\`\`\`
 ² ¹³ ¹⁵
  345
- 178
-----
  167
\`\`\`

**Resposta final:** $345 - 178 = 167$

**Verificação:** $167 + 178 = 345$ ✓

## Exemplo Prático 1: Calculando Troco

**Situação:** Você comprou um livro que custou R$ 38 e pagou com uma nota de R$ 50. Quanto de troco você deve receber?

**Solução:**

\`\`\`
  50
- 38
----
\`\`\`

**Unidades:** Não podemos fazer $0 - 8$. Emprestamos 1 dezena:
- 5 dezenas → 4 dezenas
- 0 + 10 = 10 unidades
- $10 - 8 = 2$

**Dezenas:** $4 - 3 = 1$

\`\`\`
 ⁴ ¹⁰
  50
- 38
----
  12
\`\`\`

**Resposta:** Você deve receber **R$ 12** de troco.

## Exemplo Prático 2: Diferença de População

**Situação:** Uma cidade tinha 5.432 habitantes em 2020 e 3.678 em 2010. Quantos habitantes a mais a cidade tinha em 2020?

**Solução:**

\`\`\`
  5432
- 3678
------
\`\`\`

**Unidades:** $2 - 8$ → Emprestar! $12 - 8 = 4$

**Dezenas:** $2 - 7$ (já emprestamos 1) → Emprestar! $12 - 7 = 5$

**Centenas:** $3 - 6$ (já emprestamos 1) → Emprestar! $13 - 6 = 7$

**Milhares:** $4 - 3 = 1$

\`\`\`
 ⁴ ¹³ ¹² ¹²
  5432
- 3678
------
  1754
\`\`\`

**Resposta:** A cidade tinha **1.754 habitantes** a mais em 2020.

## Exercícios Interativos: Nível Básico

<ExerciseCard
  question="Calcule: 43 - 17"
  options={["24", "25", "26", "27"]}
  correctAnswer="26"
  explanation="Unidades: 13 - 7 = 6 (emprestamos 1 dezena). Dezenas: 3 - 1 = 2. Resposta: 26."
/>

<ExerciseCard
  question="Resolva: 81 - 35"
  options={["44", "45", "46", "47"]}
  correctAnswer="46"
  explanation="Unidades: 11 - 5 = 6 (emprestamos 1 dezena). Dezenas: 7 - 3 = 4. Resposta: 46."
/>

<ExerciseCard
  question="Calcule: 124 - 67"
  options={["55", "56", "57", "58"]}
  correctAnswer="57"
  explanation="Unidades: 14 - 7 = 7. Dezenas: 1 - 6 → emprestar! 11 - 6 = 5. Centenas: 0 - 0 = 0. Resposta: 57."
/>

## Exercícios Interativos: Nível Intermediário

<ExerciseCard
  question="Uma escola tinha 456 alunos e 189 se transferiram. Quantos alunos restaram?"
  options={["265", "266", "267", "268"]}
  correctAnswer="267"
  explanation="456 - 189 = 267. Faça a subtração com reagrupamento coluna por coluna."
/>

<ExerciseCard
  question="Um caminhão transportava 3.250 kg de carga e descarregou 1.875 kg. Quanto de carga ainda resta?"
  options={["1275", "1325", "1375", "1425"]}
  correctAnswer="1375"
  explanation="3250 - 1875 = 1375. Unidades: 10 - 5 = 5. Dezenas: 4 - 7 → emprestar! 14 - 7 = 7. Centenas: 1 - 8 → emprestar! 11 - 8 = 3. Milhares: 2 - 1 = 1."
/>

## Exercícios Interativos: Nível Avançado

<ExerciseCard
  question="Calcule: 8.000 - 3.456"
  options={["4444", "4544", "4644", "4744"]}
  correctAnswer="4544"
  explanation="8000 - 3456 = 4544. Precisamos emprestar várias vezes dos zeros. Unidades: 10 - 6 = 4. Dezenas: 9 - 5 = 4 (após emprestar). Centenas: 9 - 4 = 5. Milhares: 7 - 3 = 4."
/>

<ExerciseCard
  question="Uma empresa tinha R$ 15.000 em caixa e gastou R$ 7.845 em despesas. Quanto sobrou?"
  options={["7055", "7155", "7255", "7355"]}
  correctAnswer="7155"
  explanation="15000 - 7845 = 7155. Faça a subtração com cuidado, emprestando quando necessário."
/>

<ExerciseCard
  question="Calcule: 10.000 - 6.789"
  options={["3111", "3211", "3311", "3411"]}
  correctAnswer="3211"
  explanation="10000 - 6789 = 3211. Empreste dos zeros sucessivamente. Unidades: 10 - 9 = 1. Dezenas: 9 - 8 = 1. Centenas: 9 - 7 = 2. Milhares: 9 - 6 = 3."
/>

## Caso Especial: Subtraindo de Números com Zeros

Subtrair de números como 100, 1000, 5000 requer atenção especial, pois precisamos "emprestar" através de vários zeros.

**Exemplo:** $500 - 237 = ?$

\`\`\`
  500
- 237
-----
\`\`\`

**Passo 1:** Unidades - $0 - 7$ → Precisamos emprestar, mas a dezena é 0!

**Passo 2:** Emprestamos da centena:
- 5 centenas → 4 centenas
- 0 dezenas + 10 dezenas = 10 dezenas
- Mas ainda precisamos emprestar para as unidades!

**Passo 3:** Emprestamos 1 dezena para as unidades:
- 10 dezenas → 9 dezenas
- 0 unidades + 10 unidades = 10 unidades

**Agora podemos subtrair:**

\`\`\`
 ⁴ ⁹ ¹⁰
  500
- 237
-----
  263
\`\`\`

- Unidades: $10 - 7 = 3$
- Dezenas: $9 - 3 = 6$
- Centenas: $4 - 2 = 2$

**Resposta:** $500 - 237 = 263$

## Estratégias para Evitar Erros

### Estratégia 1: Sempre Alinhe pela Direita

❌ Errado:
\`\`\`
345
- 78
----
\`\`\`

✅ Correto:
\`\`\`
  345
-  78
-----
\`\`\`

### Estratégia 2: Marque os Empréstimos Claramente

Use números pequenos acima para indicar o reagrupamento. Isso evita confusão!

### Estratégia 3: Verifique com Adição

Sempre verifique sua resposta: $\\text{Diferença} + \\text{Subtraendo} = \\text{Minuendo}$

### Estratégia 4: Pratique com Números Menores Primeiro

Domine subtrações de 2 dígitos antes de tentar 3 ou 4 dígitos.

### Estratégia 5: Cuidado com Zeros Consecutivos

Quando o minuendo tem vários zeros (como 1000, 5000), tome cuidado extra ao emprestar.

## Desafios Progressivos

**Desafio Nível 1:** $64 - 28 = ?$

**Desafio Nível 2:** $312 - 157 = ?$

**Desafio Nível 3:** $1.000 - 456 = ?$

**Desafio Nível 4:** $5.234 - 2.867 = ?$

**Desafio Nível 5 (Super Desafio):** Uma empresa tinha R$ 25.000 em caixa. Gastou R$ 8.765 em salários, R$ 3.890 em aluguel e R$ 2.456 em materiais. Quanto sobrou em caixa?

## Aplicações no Mundo Real

### Finanças

**Exemplo:** Você tem R$ 1.500 na conta. Paga R$ 687 de aluguel. Quanto sobra?

$1.500 - 687 = 813$

**Resposta:** Sobram R$ 813.

### Medidas e Distâncias

**Exemplo:** Uma maratona tem 42 km. Você já correu 28 km. Quanto falta?

$42 - 28 = 14$

**Resposta:** Faltam 14 km.

### Tempo

**Exemplo:** Um filme dura 135 minutos. Você já assistiu 78 minutos. Quanto tempo falta?

$135 - 78 = 57$

**Resposta:** Faltam 57 minutos.

### Estoque e Inventário

**Exemplo:** Uma loja tinha 850 unidades de um produto. Vendeu 376 unidades. Quantas restam?

$850 - 376 = 474$

**Resposta:** Restam 474 unidades.

## Erros Comuns e Como Corrigi-los

### Erro 1: Esquecer de Emprestar

❌ Errado:
\`\`\`
  52
- 27
----
  35  (ERRADO!)
\`\`\`

✅ Correto: Empreste 1 dezena para as unidades!

### Erro 2: Emprestar Incorretamente

Lembre-se: quando empresta 1 dezena, você adiciona 10 às unidades, não 1!

### Erro 3: Não Reduzir a Posição que Emprestou

Se você emprestou 1 dezena, precisa subtrair 1 das dezenas!

## Conclusão: Dominando a Subtração Completa

Parabéns! Você agora domina a subtração com reagrupamento, uma habilidade fundamental que permite subtrair qualquer número, não importa quão grande ou complexo seja.

**Pontos-chave para lembrar:**

**Alinhe sempre pela direita:** Garanta que cada posição esteja corretamente alinhada.

**Subtraia coluna por coluna, da direita para a esquerda:** Comece pelas unidades.

**Empreste quando necessário:** Se o dígito de cima for menor que o de baixo, empreste da posição à esquerda.

**Marque claramente os empréstimos:** Use números pequenos acima para não se perder.

**Verifique com adição:** Sempre confirme sua resposta.

**Pratique regularmente:** A prática leva à perfeição!

Com essas habilidades, você está pronto para enfrentar qualquer desafio de subtração e avançar para operações mais complexas. Continue praticando e você se tornará cada vez mais rápido e preciso!

**Próximo passo:** Agora que você domina adição e subtração, está pronto para aprender sobre **multiplicação**, uma forma poderosa de fazer adições repetidas de forma eficiente. Até a próxima aula!
`;

console.log('Atualizando Páginas 2 e 3 de Subtração...');

await connection.execute(
  `UPDATE pages SET mainText = ? WHERE id = ?`,
  [subtracao2Content, subPages[1].id]
);
console.log('✅ Página 2 de Subtração atualizada!');

await connection.execute(
  `UPDATE pages SET mainText = ? WHERE id = ?`,
  [subtracao3Content, subPages[2].id]
);
console.log('✅ Página 3 de Subtração atualizada!');

await connection.end();
console.log('\n🎉 Expansão completa de Subtração concluída!');
console.log('Página 2:', subtracao2Content.length, 'caracteres (~', Math.round(subtracao2Content.length / 5), 'palavras)');
console.log('Página 3:', subtracao3Content.length, 'caracteres (~', Math.round(subtracao3Content.length / 5), 'palavras)');
