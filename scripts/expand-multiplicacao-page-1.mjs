import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from '../drizzle/schema.js';
import { eq } from 'drizzle-orm';

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection, { schema, mode: 'default' });

// Buscar página de Multiplicação Página 1
const pages = await db.select().from(schema.pages).where(
  eq(schema.pages.slug, 'soma-repetida')
);

if (pages.length === 0) {
  console.log('❌ Página "soma-repetida" não encontrada');
  process.exit(1);
}

const page = pages[0];

// Conteúdo expandido para Página 1 de Multiplicação
const expandedContent = `# Multiplicação: Soma Repetida

A multiplicação é uma das operações matemáticas mais poderosas e úteis que você aprenderá. Ela surge naturalmente quando precisamos somar o mesmo número várias vezes. Em vez de escrever 3 + 3 + 3 + 3, podemos simplesmente dizer "4 vezes 3" ou escrever 4 × 3. Essa operação economiza tempo, facilita cálculos e aparece constantemente no nosso dia a dia.

## O Conceito Fundamental

Multiplicação é essencialmente uma **soma repetida**. Quando multiplicamos dois números, estamos somando um deles várias vezes. O primeiro número (chamado de **multiplicando**) indica o valor que será somado, enquanto o segundo número (chamado de **multiplicador**) indica quantas vezes esse valor será somado.

Por exemplo, na operação 5 × 3:
- O número 5 é o multiplicando (o valor que será somado)
- O número 3 é o multiplicador (quantas vezes somaremos)
- O resultado é 15 (porque 5 + 5 + 5 = 15)

Podemos ler essa operação de duas formas equivalentes: "cinco vezes três" ou "três grupos de cinco". Ambas as interpretações levam ao mesmo resultado, mas cada uma oferece uma perspectiva diferente sobre o problema.

## Propriedades da Multiplicação

A multiplicação possui propriedades matemáticas que facilitam os cálculos e nos ajudam a entender melhor como ela funciona.

**Propriedade Comutativa:** A ordem dos fatores não altera o produto. Isso significa que 4 × 7 = 7 × 4. Você pode multiplicar os números em qualquer ordem e obterá o mesmo resultado. Essa propriedade é extremamente útil porque permite escolher a ordem que facilita o cálculo mental.

**Propriedade Associativa:** Quando multiplicamos três ou mais números, podemos agrupá-los de diferentes formas sem alterar o resultado. Por exemplo, (2 × 3) × 4 = 2 × (3 × 4) = 24. Isso nos dá flexibilidade para reorganizar cálculos complexos de forma mais conveniente.

**Propriedade Distributiva:** A multiplicação distribui sobre a adição. Isso significa que a × (b + c) = (a × b) + (a × c). Por exemplo, 3 × (4 + 2) = (3 × 4) + (3 × 2) = 12 + 6 = 18. Essa propriedade é fundamental para multiplicar números grandes mentalmente.

**Elemento Neutro:** O número 1 é o elemento neutro da multiplicação. Qualquer número multiplicado por 1 resulta nele mesmo: 7 × 1 = 7. Essa propriedade pode parecer óbvia, mas é essencial em álgebra e em muitas aplicações práticas.

**Elemento Absorvente:** O número 0 é o elemento absorvente da multiplicação. Qualquer número multiplicado por 0 resulta em 0: 9 × 0 = 0. Isso acontece porque estamos somando o número zero vezes, o que resulta em nada.

## Exemplos Práticos do Cotidiano

A multiplicação aparece constantemente em situações reais. Vamos explorar alguns exemplos práticos que demonstram como essa operação é útil no dia a dia.

### Exemplo 1: Compras no Supermercado

Maria foi ao supermercado e comprou 6 pacotes de biscoitos. Cada pacote custa R$ 4,50. Quanto ela gastou no total?

Para resolver esse problema, precisamos multiplicar o número de pacotes pelo preço de cada um:

6 × R$ 4,50 = R$ 27,00

Maria gastou R$ 27,00 em biscoitos. Sem a multiplicação, teríamos que somar R$ 4,50 seis vezes, o que seria muito mais trabalhoso. A multiplicação torna o cálculo rápido e eficiente.

### Exemplo 2: Organização de uma Festa

Pedro está organizando uma festa de aniversário e precisa preparar mesas para os convidados. Ele tem 8 mesas e quer colocar 6 cadeiras em cada mesa. Quantas cadeiras ele precisa no total?

Aqui, multiplicamos o número de mesas pela quantidade de cadeiras por mesa:

8 × 6 = 48 cadeiras

Pedro precisa de 48 cadeiras para acomodar todos os convidados confortavelmente. Esse tipo de cálculo é comum em planejamento de eventos, organização de espaços e logística.

### Exemplo 3: Cálculo de Área

Ana quer comprar um tapete para sua sala. A sala tem formato retangular com 5 metros de comprimento e 4 metros de largura. Qual é a área da sala em metros quadrados?

A área de um retângulo é calculada multiplicando o comprimento pela largura:

5 m × 4 m = 20 m²

A sala de Ana tem 20 metros quadrados de área. Esse cálculo é essencial em construção, decoração, jardinagem e muitas outras áreas práticas.

### Exemplo 4: Economia de Tempo

Carlos trabalha 8 horas por dia, 5 dias por semana. Quantas horas ele trabalha em uma semana?

Multiplicamos as horas diárias pelos dias trabalhados:

8 horas × 5 dias = 40 horas

Carlos trabalha 40 horas por semana. Esse tipo de cálculo é fundamental para planejamento de tempo, cálculo de salários, gestão de projetos e organização pessoal.

### Exemplo 5: Receitas Culinárias

Sofia está fazendo cookies para uma festa. A receita original rende 12 cookies, mas ela precisa de 48 cookies para servir todos os convidados. Quantas vezes ela precisa multiplicar a receita?

Para descobrir, dividimos a quantidade necessária pela quantidade que a receita rende:

48 ÷ 12 = 4 vezes

Sofia precisa fazer a receita 4 vezes. Isso significa que todos os ingredientes da receita original devem ser multiplicados por 4. Se a receita pede 2 xícaras de farinha, ela precisará de 2 × 4 = 8 xícaras de farinha.

## Visualizando a Multiplicação

Uma forma poderosa de entender a multiplicação é através de representações visuais. Imagine 4 × 3 como 4 fileiras de 3 objetos cada. Se você desenhar isso, terá uma matriz retangular com 12 objetos no total.

Essa visualização em forma de retângulo ou matriz é extremamente útil porque:
- Torna o conceito concreto e fácil de entender
- Mostra claramente por que a propriedade comutativa funciona (um retângulo 4×3 tem a mesma área que um retângulo 3×4)
- Facilita a compreensão de multiplicações maiores
- Conecta a multiplicação com o conceito de área

<MultiplicationMatrix rows={4} cols={3} />

## Estratégias de Cálculo Mental

Existem várias técnicas que facilitam a multiplicação mental, especialmente com números pequenos.

**Dobrar e Somar:** Para multiplicar por 4, você pode dobrar duas vezes. Por exemplo, 7 × 4 = (7 × 2) × 2 = 14 × 2 = 28. Essa técnica é rápida e confiável.

**Multiplicar por 5:** Para multiplicar qualquer número por 5, você pode multiplicar por 10 e dividir por 2. Por exemplo, 8 × 5 = (8 × 10) ÷ 2 = 80 ÷ 2 = 40.

**Multiplicar por 9:** Uma técnica interessante para multiplicar por 9 é multiplicar por 10 e subtrair o número original. Por exemplo, 6 × 9 = (6 × 10) - 6 = 60 - 6 = 54.

**Usar a Propriedade Distributiva:** Para multiplicar números maiores, você pode quebrá-los em partes menores. Por exemplo, 7 × 13 = 7 × (10 + 3) = (7 × 10) + (7 × 3) = 70 + 21 = 91.

## Aplicações no Mundo Real

A multiplicação é fundamental em inúmeras profissões e situações cotidianas.

**Finanças:** Calcular juros, investimentos, orçamentos mensais, custos de produção, preços de venda e lucros. Sem multiplicação, seria impossível fazer planejamento financeiro eficiente.

**Construção:** Calcular quantidades de materiais, áreas de superfícies, volumes de concreto, custos de mão de obra e prazos de projeto. Engenheiros e arquitetos usam multiplicação constantemente.

**Culinária:** Ajustar receitas para diferentes quantidades de porções, calcular proporções de ingredientes e planejar compras para eventos. Chefs profissionais dependem da multiplicação diariamente.

**Ciência:** Converter unidades de medida, calcular velocidades, determinar concentrações químicas e analisar dados experimentais. A multiplicação é a base de muitas fórmulas científicas.

**Tecnologia:** Processar imagens (cada pixel em uma tela), calcular taxas de transferência de dados, dimensionar recursos de servidor e otimizar algoritmos. Programadores usam multiplicação em praticamente todos os programas.

## Desafios para Praticar

Agora é sua vez de praticar! Tente resolver estes problemas mentalmente antes de usar papel ou calculadora.

**Desafio 1:** Uma caixa contém 12 ovos. Quantos ovos há em 7 caixas?

**Desafio 2:** Um ônibus transporta 45 passageiros. Quantos passageiros transportam 6 ônibus iguais?

**Desafio 3:** Um livro tem 8 capítulos, e cada capítulo tem 15 páginas. Quantas páginas tem o livro?

**Desafio 4:** Maria economiza R$ 25 por semana. Quanto ela economizará em 12 semanas?

**Desafio 5:** Um jardim retangular tem 9 metros de comprimento e 7 metros de largura. Qual é sua área?

## Conclusão

A multiplicação é muito mais do que uma operação matemática abstrata. Ela é uma ferramenta prática e poderosa que usamos constantemente, muitas vezes sem perceber. Dominar a multiplicação abre portas para conceitos matemáticos mais avançados, como divisão, frações, álgebra e geometria.

Ao entender a multiplicação como soma repetida, você constrói uma base sólida para compreender suas propriedades e aplicações. Com prática regular, os cálculos se tornarão automáticos, permitindo que você resolva problemas complexos com rapidez e confiança.

Continue praticando e explorando diferentes formas de visualizar e aplicar a multiplicação. Quanto mais você pratica, mais natural e intuitiva essa operação se torna!
`;

// Atualizar página no banco de dados
await db.update(schema.pages)
  .set({ content: expandedContent })
  .where(eq(schema.pages.id, page.id));

console.log('✅ Página 1 de Multiplicação expandida com sucesso!');
console.log(`   ID: ${page.id}`);
console.log(`   Slug: ${page.slug}`);
console.log(`   Tamanho: ~${expandedContent.length} caracteres (~${Math.round(expandedContent.split(' ').length)} palavras)`);

await connection.end();
