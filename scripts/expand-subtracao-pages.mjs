#!/usr/bin/env node

import mysql from 'mysql2/promise';

const connection = await mysql.createConnection(process.env.DATABASE_URL);

// Buscar IDs das páginas de Subtração (devem estar após as 3 páginas de Adição)
const [subPages] = await connection.execute(
  'SELECT id, title, slug, `order` FROM pages WHERE moduleId = 1 AND `order` > 3 ORDER BY `order` LIMIT 3'
);

console.log('Páginas de Subtração encontradas:', subPages.length);

if (subPages.length === 0) {
  console.log('⚠️  Nenhuma página de Subtração encontrada. Criando páginas...');
  
  // Criar 3 páginas de Subtração
  await connection.execute(`
    INSERT INTO pages (moduleId, title, slug, \`order\`, mainText, conceptSummary, estimatedMinutes)
    VALUES 
    (1, 'O que é Subtração?', 'o-que-e-subtracao', 4, '', 'Conceito fundamental de subtração', 15),
    (1, 'Subtração na Reta Numérica', 'subtracao-reta-numerica', 5, '', 'Visualizando subtração como movimento', 15),
    (1, 'Subtração com Reagrupamento', 'subtracao-reagrupamento', 6, '', 'Técnica do "empresta um"', 20)
  `);
  
  // Buscar novamente
  const [newPages] = await connection.execute(
    'SELECT id, title, slug, `order` FROM pages WHERE moduleId = 1 AND `order` > 3 ORDER BY `order` LIMIT 3'
  );
  subPages.length = 0;
  subPages.push(...newPages);
}

// Conteúdo expandido para Subtração Página 1
const subtracao1Content = `# O que é Subtração? A Operação Inversa da Adição

## Introdução: Descobrindo a Subtração

Se a adição é sobre **juntar** e **aumentar**, a subtração é sobre **separar**, **tirar** ou **comparar**. A subtração é uma das quatro operações fundamentais da matemática e está presente em inúmeras situações do nosso dia a dia, desde calcular o troco em uma compra até medir quanto tempo falta para um evento importante.

Nesta aula, vamos explorar profundamente o conceito de subtração, entender sua relação com a adição, e aprender a aplicá-la em situações reais. Prepare-se para descobrir que a subtração não é apenas "tirar números", mas uma ferramenta poderosa para resolver problemas!

## O Conceito Fundamental: O que Significa "Subtrair"?

**Subtrair** significa **tirar**, **remover**, **diminuir** ou **encontrar a diferença** entre dois números. Quando subtraímos um número de outro, estamos descobrindo quanto resta ou qual é a diferença entre eles.

Em termos matemáticos, a subtração é representada pelo símbolo **−** (menos), e o resultado é chamado de **diferença** ou **resto**.

A estrutura básica de uma subtração é:

$$\\text{Minuendo} - \\text{Subtraendo} = \\text{Diferença}$$

Por exemplo, em $8 - 3 = 5$:
- **8** é o **minuendo** (o número do qual estamos tirando)
- **3** é o **subtraendo** (o número que estamos tirando)
- **5** é a **diferença** ou **resto** (o resultado final)

## Três Interpretações da Subtração

A subtração pode ser entendida de três formas diferentes, dependendo do contexto:

### 1. Tirar ou Remover (Subtração como Remoção)

Esta é a interpretação mais comum. Você tem uma quantidade e remove parte dela.

**Exemplo:** Você tem 10 maçãs e come 3. Quantas maçãs restam?

$$10 - 3 = 7$$

**Resposta:** Restam 7 maçãs.

### 2. Comparar (Subtração como Comparação)

Aqui usamos a subtração para encontrar a diferença entre duas quantidades.

**Exemplo:** João tem 12 anos e Maria tem 8 anos. Quantos anos João tem a mais que Maria?

$$12 - 8 = 4$$

**Resposta:** João tem 4 anos a mais que Maria.

### 3. Completar (Subtração como Complemento)

Nesta interpretação, queremos saber quanto falta para chegar a um determinado valor.

**Exemplo:** Você tem R$ 15 e quer comprar um jogo que custa R$ 23. Quanto dinheiro ainda falta?

$$23 - 15 = 8$$

**Resposta:** Falta R$ 8.

## A Relação entre Adição e Subtração

A subtração é a **operação inversa** da adição. Isso significa que uma "desfaz" o que a outra faz.

Se $5 + 3 = 8$, então $8 - 3 = 5$ e $8 - 5 = 3$.

Essa relação é fundamental para verificar se uma subtração está correta. Você pode sempre verificar uma subtração fazendo uma adição:

$$\\text{Se } a - b = c, \\text{ então } c + b = a$$

**Exemplo de verificação:**

$12 - 7 = 5$ está correto?

Vamos verificar: $5 + 7 = 12$ ✓

Sim, está correto!

## Propriedades da Subtração

Diferentemente da adição, a subtração **não** possui as propriedades comutativa e associativa. Isso significa que a ordem importa!

### A Ordem Importa (Não-Comutativa)

$$a - b \\neq b - a$$

**Exemplo:** $10 - 3 = 7$, mas $3 - 10 = -7$

Os resultados são diferentes! Por isso, é essencial manter a ordem correta em uma subtração.

### Subtrair Zero

Quando subtraímos zero de qualquer número, o resultado é o próprio número:

$$a - 0 = a$$

**Exemplo:** $15 - 0 = 15$

### Subtrair um Número Dele Mesmo

Quando subtraímos um número dele mesmo, o resultado é sempre zero:

$$a - a = 0$$

**Exemplo:** $9 - 9 = 0$

## Exemplo Prático 1: Troco em uma Compra

**Situação:** Você foi à padaria comprar pão e levou uma nota de R$ 20. O pão custou R$ 7. Quanto de troco você deve receber?

**Solução:**

Precisamos subtrair o valor gasto do valor que você tinha:

$$20 - 7 = 13$$

**Resposta:** Você deve receber **R$ 13** de troco.

**Verificação:** $13 + 7 = 20$ ✓

## Exemplo Prático 2: Diferença de Pontuação em um Jogo

**Situação:** Em um jogo de videogame, você fez 850 pontos e seu amigo fez 620 pontos. Quantos pontos você fez a mais que seu amigo?

**Solução:**

Para encontrar a diferença, subtraímos a menor pontuação da maior:

$$850 - 620 = 230$$

**Resposta:** Você fez **230 pontos** a mais que seu amigo.

**Observação:** Esta é a interpretação de "comparação" da subtração.

## Exemplo Prático 3: Quanto Falta para uma Meta

**Situação:** Você está economizando para comprar uma bicicleta que custa R$ 450. Você já economizou R$ 280. Quanto ainda falta para atingir sua meta?

**Solução:**

Subtraímos o que você já tem do valor total:

$$450 - 280 = 170$$

**Resposta:** Ainda falta **R$ 170** para atingir sua meta.

**Observação:** Esta é a interpretação de "completar" da subtração.

## Exemplo Prático 4: Tempo Restante

**Situação:** Uma aula de matemática dura 50 minutos. Já se passaram 32 minutos. Quanto tempo ainda resta de aula?

**Solução:**

$$50 - 32 = 18$$

**Resposta:** Ainda restam **18 minutos** de aula.

**Dica:** Problemas envolvendo tempo são muito comuns e a subtração é essencial para resolvê-los!

## Exemplo Prático 5: Estoque de uma Loja

**Situação:** Uma loja tinha 345 unidades de um produto em estoque. Durante o dia, foram vendidas 128 unidades. Quantas unidades restam no estoque?

**Solução:**

$$345 - 128 = 217$$

**Resposta:** Restam **217 unidades** no estoque.

**Aplicação real:** Controle de estoque é fundamental para o comércio, e a subtração é usada constantemente para esse fim.

## Subtração com Números Maiores: Introdução ao Reagrupamento

Quando o dígito do minuendo é menor que o dígito correspondente do subtraendo, precisamos usar a técnica do **reagrupamento** (também chamada de "empresta um").

**Exemplo simples:** $52 - 27 = ?$

Vamos analisar:
- **Unidades:** Não podemos fazer $2 - 7$ diretamente (2 é menor que 7)
- **Solução:** "Emprestamos" 1 dezena (10 unidades) das dezenas

\`\`\`
  5 2    →    4 12
- 2 7         - 2 7
-----         -----
               2 5
\`\`\`

1. Transformamos 5 dezenas em 4 dezenas + 10 unidades
2. Agora temos 12 unidades: $12 - 7 = 5$
3. Nas dezenas: $4 - 2 = 2$

**Resposta:** $52 - 27 = 25$

**Nota:** Vamos aprender essa técnica em detalhes na Página 3!

## Aplicações da Subtração no Mundo Real

A subtração está presente em inúmeras situações do dia a dia:

**Finanças:** Calcular troco, verificar saldo após pagamentos, controlar gastos, calcular lucros (receita - despesas).

**Tempo:** Calcular quanto tempo falta para um evento, medir duração de atividades, calcular diferenças de fuso horário.

**Medidas:** Calcular diferenças de altura, peso, distância, temperatura.

**Esportes:** Calcular diferenças de pontuação, medir melhorias de desempenho, comparar estatísticas.

**Ciência:** Calcular variações em experimentos, medir mudanças ao longo do tempo, comparar dados.

## Estratégias de Cálculo Mental para Subtração

### Estratégia 1: Subtrair em Partes

Para $47 - 19$, podemos:
1. Subtrair 10: $47 - 10 = 37$
2. Subtrair 9: $37 - 9 = 28$

**Resposta:** $47 - 19 = 28$

### Estratégia 2: Completar a Dezena

Para $63 - 28$, podemos:
1. Completar de 28 até 30: faltam 2
2. De 30 até 63: faltam 33
3. Total: $2 + 33 = 35$

**Resposta:** $63 - 28 = 35$

### Estratégia 3: Usar Números Redondos

Para $85 - 39$, podemos:
1. Subtrair 40 (mais fácil): $85 - 40 = 45$
2. Adicionar 1 de volta (porque subtraímos 1 a mais): $45 + 1 = 46$

**Resposta:** $85 - 39 = 46$

## Desafios para Praticar

Agora é sua vez de praticar! Tente resolver estes problemas:

**Desafio 1:** Maria tinha 25 figurinhas e deu 9 para seu irmão. Quantas figurinhas ela tem agora?

**Desafio 2:** Um ônibus saiu da estação com 48 passageiros. Na primeira parada, desceram 15 passageiros. Quantos passageiros continuaram no ônibus?

**Desafio 3:** Pedro tem 17 anos e sua irmã tem 12 anos. Qual é a diferença de idade entre eles?

**Desafio 4:** Uma escola tem 320 alunos. Se 145 são meninas, quantos são meninos?

**Desafio 5:** Você precisa economizar R$ 500 para uma viagem. Já economizou R$ 287. Quanto ainda falta?

## Erros Comuns e Como Evitá-los

### Erro 1: Inverter a Ordem

❌ Errado: Para "João tem 5 a mais que Maria", fazer $5 - 12$

✅ Correto: Se João tem 12 e Maria tem 7, fazemos $12 - 7 = 5$

### Erro 2: Esquecer de Verificar

Sempre verifique sua resposta usando adição:

Se $23 - 15 = 8$, então $8 + 15$ deve ser igual a $23$ ✓

### Erro 3: Confundir Minuendo e Subtraendo

Lembre-se: o número maior (do qual estamos tirando) vem primeiro!

## Conclusão: A Subtração Como Ferramenta Essencial

A subtração é muito mais do que apenas "tirar números". Ela é uma ferramenta fundamental para:

**Resolver problemas do dia a dia:** Troco, tempo, medidas, comparações.

**Tomar decisões informadas:** Quanto falta para uma meta? Qual é a diferença entre opções?

**Entender relações:** Como duas quantidades se comparam?

**Preparar para operações avançadas:** A subtração é a base para divisão e outras operações.

Ao dominar a subtração e suas três interpretações (tirar, comparar, completar), você está construindo uma base sólida para todo o seu aprendizado matemático futuro!

**Próximo passo:** Na próxima aula, vamos aprender a visualizar a subtração usando a **reta numérica**, tornando essa operação ainda mais concreta e intuitiva. Até lá!
`;

console.log('Atualizando Página 1 de Subtração...');
await connection.execute(
  `UPDATE pages SET mainText = ? WHERE id = ?`,
  [subtracao1Content, subPages[0].id]
);
console.log('✅ Página 1 de Subtração atualizada!');

await connection.end();
console.log('\n🎉 Expansão da Página 1 de Subtração concluída!');
console.log('Total de caracteres:', subtracao1Content.length);
console.log('Palavras aproximadas:', Math.round(subtracao1Content.length / 5));
