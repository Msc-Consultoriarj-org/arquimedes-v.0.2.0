import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection);

console.log("🌱 Seeding database...");

// Insert Matemática discipline
const [disciplineResult] = await connection.execute(
  "INSERT INTO disciplines (name, slug, description, `order`) VALUES (?, ?, ?, ?)",
  ["Matemática Básica", "matematica-basica", "Fundamentos de matemática para adultos", 1]
);
const disciplineId = disciplineResult.insertId;

console.log("✓ Created discipline: Matemática Básica");

// Insert Module 1: Adição e Subtração
const [module1Result] = await connection.execute(
  "INSERT INTO modules (disciplineId, name, slug, description, `order`) VALUES (?, ?, ?, ?, ?)",
  [disciplineId, "Adição e Subtração", "adicao-subtracao", "O Conceito de Combinar e Separar", 1]
);
const module1Id = module1Result.insertId;

// Insert Module 2: Multiplicação
const [module2Result] = await connection.execute(
  "INSERT INTO modules (disciplineId, name, slug, description, `order`) VALUES (?, ?, ?, ?, ?)",
  [disciplineId, "Multiplicação", "multiplicacao", "A Soma Repetida e a Área", 2]
);
const module2Id = module2Result.insertId;

// Insert Module 3: Divisão
const [module3Result] = await connection.execute(
  "INSERT INTO modules (disciplineId, name, slug, description, `order`) VALUES (?, ?, ?, ?, ?)",
  [disciplineId, "Divisão", "divisao", "Repartição Justa e Medida", 3]
);
const module3Id = module3Result.insertId;

console.log("✓ Created 3 modules");

// ============= MODULE 1: ADIÇÃO E SUBTRAÇÃO =============

// Page 1.1: O que é Adicionar
await connection.execute(
  `INSERT INTO pages (moduleId, title, slug, \`order\`, mainText, conceptSummary, estimatedMinutes) 
   VALUES (?, ?, ?, ?, ?, ?, ?)`,
  [
    module1Id,
    "O que é Adicionar (Combinar)",
    "o-que-e-adicionar",
    1,
    `A matemática começa com a contagem. E a primeira operação que aprendemos é a **Adição**. Adicionar é simplesmente **combinar** quantidades. Se você tem 3 maçãs e ganha mais 2, você está combinando dois grupos em um só. O foco não é o símbolo '+', mas a **ação de juntar**.

**Exemplo Prático:** Orçamento doméstico. Juntar o salário com uma renda extra.

**Conceito Chave:** A adição é **comutativa** (a ordem não importa: $3+2 = 2+3$).`,
    "As operações de Adição são ações de **Combinar** quantidades. A reta numérica é a ferramenta visual que confirma o sentido dessas ações.",
    25
  ]
);

// Page 1.2: A Reta Numérica
await connection.execute(
  `INSERT INTO pages (moduleId, title, slug, \`order\`, mainText, conceptSummary, estimatedMinutes) 
   VALUES (?, ?, ?, ?, ?, ?, ?)`,
  [
    module1Id,
    "A Reta Numérica: Visualizando o Movimento",
    "reta-numerica",
    2,
    `A reta numérica é o nosso mapa. A **Adição** é um movimento para a **direita** (para frente). Isso nos ajuda a entender o que realmente está acontecendo com os números.

Imagine que você está em uma linha reta. Se você está no número 5 e anda 3 passos para frente, você chega no 8. Isso é adição: $5 + 3 = 8$.

A visualização torna a matemática **concreta** e **menos abstrata**.`,
    "A reta numérica transforma operações abstratas em **movimentos visuais**. Adição é movimento para a direita.",
    30
  ]
);

// Page 1.3: O que é Subtrair
await connection.execute(
  `INSERT INTO pages (moduleId, title, slug, \`order\`, mainText, conceptSummary, estimatedMinutes) 
   VALUES (?, ?, ?, ?, ?, ?, ?)`,
  [
    module1Id,
    "O que é Subtrair (Separar e Comparar)",
    "o-que-e-subtrair",
    3,
    `A **Subtração** tem dois grandes papéis. O primeiro é **separar** ou tirar uma parte de um todo (ex: 'tinha 5, tirei 2, sobrou 3'). O segundo, e mais importante para o raciocínio, é **comparar** ou encontrar a **diferença** (ex: 'qual a diferença entre 5 e 2?').

**Exemplo Prático:** O conceito de "troco". A diferença entre o valor pago e o valor do produto.

**Conceito Chave:** A subtração **não é comutativa** (a ordem importa: $5-2 \\neq 2-5$).

Na reta numérica, a **Subtração** é um movimento para a **esquerda** (para trás).`,
    "A Subtração tem dois significados: **Separar** (tirar) e **Comparar** (diferença). A ordem importa na subtração.",
    30
  ]
);

console.log("✓ Created 3 pages for Module 1");

// ============= MODULE 2: MULTIPLICAÇÃO =============

// Page 2.1: Multiplicação como Soma Repetida
await connection.execute(
  `INSERT INTO pages (moduleId, title, slug, \`order\`, mainText, conceptSummary, estimatedMinutes) 
   VALUES (?, ?, ?, ?, ?, ?, ?)`,
  [
    module2Id,
    "Multiplicação: Uma Forma Rápida de Somar",
    "soma-repetida",
    1,
    `A **Multiplicação** não é uma operação nova, é apenas uma forma rápida de fazer a **Adição** quando os números que você está somando são iguais. Se você precisa somar $4 + 4 + 4 + 4 + 4$, é muito mais rápido dizer '5 vezes 4', ou $5 \\times 4$.

**Exemplo Prático:** Calcular o custo total de 6 itens iguais no supermercado.

**Conceito Chave:** O símbolo '$\\times$' ou '$\\cdot$' significa "vezes".`,
    "A Multiplicação é a **Adição Repetida** e pode ser visualizada como o cálculo da **Área** (matriz).",
    25
  ]
);

// Page 2.2: A Tabuada
await connection.execute(
  `INSERT INTO pages (moduleId, title, slug, \`order\`, mainText, conceptSummary, estimatedMinutes) 
   VALUES (?, ?, ?, ?, ?, ?, ?)`,
  [
    module2Id,
    "A Tabuada: Entendendo o Padrão",
    "tabuada",
    2,
    `A tabuada deve ser apresentada como uma **tabela de padrões**, não como algo a ser memorizado cegamente. Foco na tabuada até 5, usando a lógica da adição repetida.

A tabuada é um **mapa de padrões**. A tabuada do 2 é apenas a contagem de 2 em 2. A tabuada do 5 sempre termina em 0 ou 5. Entender o padrão torna a memorização muito mais fácil e **lógica**.

**Exemplo Prático:** Contar dinheiro em notas de 5 ou 10 reais.`,
    "A tabuada é um **mapa de padrões lógicos**. Entender o padrão facilita a memorização.",
    30
  ]
);

// Page 2.3: Visualização em Matrizes
await connection.execute(
  `INSERT INTO pages (moduleId, title, slug, \`order\`, mainText, conceptSummary, estimatedMinutes) 
   VALUES (?, ?, ?, ?, ?, ?, ?)`,
  [
    module2Id,
    "Visualização em Matrizes: A Conexão com a Área",
    "matrizes",
    3,
    `A visualização em **matrizes** (linhas e colunas) é crucial para dar um sentido físico à multiplicação.

Pense em uma caixa de ovos ou em um piso de azulejos. Se você tem 3 linhas e 4 colunas, você tem $3 \\times 4 = 12$ ovos ou azulejos. A multiplicação é o cálculo da **Área** de um retângulo. Isso conecta a aritmética com a geometria de forma imediata.

**Exemplo Prático:** Calcular quantos azulejos são necessários para cobrir uma parede.`,
    "A multiplicação pode ser visualizada como **matrizes** (linhas × colunas) e representa o cálculo de **área**.",
    30
  ]
);

console.log("✓ Created 3 pages for Module 2");

// ============= MODULE 3: DIVISÃO =============

// Page 3.1: Divisão como Operação Inversa
await connection.execute(
  `INSERT INTO pages (moduleId, title, slug, \`order\`, mainText, conceptSummary, estimatedMinutes) 
   VALUES (?, ?, ?, ?, ?, ?, ?)`,
  [
    module3Id,
    "Divisão: A Operação Inversa da Multiplicação",
    "operacao-inversa",
    1,
    `A **Divisão** é a operação que nos ajuda a responder duas perguntas principais. A primeira é: '**Como repartir algo em partes iguais?**' (Ex: dividir 12 doces entre 4 pessoas). A segunda é: '**Quantas vezes um número cabe dentro de outro?**' (Ex: Quantos grupos de 4 cabem em 12?).

**Exemplo Prático:** Dividir a conta do restaurante ou a gasolina entre amigos.

**Conceito Chave:** Dividendo, Divisor, Quociente e Resto.`,
    "A Divisão responde: 'Como repartir em partes iguais?' e 'Quantas vezes cabe?'. Conceitos: Dividendo, Divisor, Quociente e Resto.",
    30
  ]
);

// Page 3.2: Repartição Justa (O Quociente)
await connection.execute(
  `INSERT INTO pages (moduleId, title, slug, \`order\`, mainText, conceptSummary, estimatedMinutes) 
   VALUES (?, ?, ?, ?, ?, ?, ?)`,
  [
    module3Id,
    "Repartição Justa (O Quociente)",
    "quociente",
    2,
    `Quando você divide 12 por 4, o resultado (quociente) é 3. Isso significa que, se você repartir 12 em 4 partes iguais, cada parte terá 3. O foco aqui é na **justiça** da distribuição.

**Exemplo Prático:** Dividir uma pizza em fatias iguais para todos.

O **quociente** é o resultado da divisão quando ela é exata.`,
    "O **quociente** é o resultado da repartição justa. Quando dividimos 12 por 4, cada parte recebe 3.",
    25
  ]
);

// Page 3.3: Conceito de Resto
await connection.execute(
  `INSERT INTO pages (moduleId, title, slug, \`order\`, mainText, conceptSummary, estimatedMinutes) 
   VALUES (?, ?, ?, ?, ?, ?, ?)`,
  [
    module3Id,
    "O Conceito de Resto",
    "resto",
    3,
    `Nem sempre a divisão é exata. Quando você divide 13 por 4, você consegue fazer 3 grupos de 4, mas sobra 1. Esse 1 que sobra é o **resto**.

**Exemplo Prático:** Dividir 13 balas entre 4 crianças. Cada uma recebe 3, e sobra 1.

O **resto** é sempre menor que o divisor. Se o resto é 0, a divisão é exata.

**Conceito Chave:** Dividendo = (Divisor × Quociente) + Resto`,
    "O **resto** é o que sobra quando a divisão não é exata. Resto é sempre menor que o divisor.",
    25
  ]
);

console.log("✓ Created 3 pages for Module 3");

// ============= ADD EXERCISES =============

// Get page IDs
const [pages] = await connection.execute("SELECT id, slug FROM pages ORDER BY id");

for (const page of pages) {
  if (page.slug === "o-que-e-adicionar") {
    // Exercise 1: Simple addition
    await connection.execute(
      `INSERT INTO exercises (pageId, \`order\`, type, question, expectedAnswer, alternativeAnswers) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        page.id,
        1,
        "simple_input",
        "Complete a sequência: $7 + ___ = 15$",
        "8",
        JSON.stringify(["oito"])
      ]
    );
    
    // Exercise 2: Practical problem
    await connection.execute(
      `INSERT INTO exercises (pageId, \`order\`, type, question, expectedAnswer) 
       VALUES (?, ?, ?, ?, ?)`,
      [
        page.id,
        2,
        "practical_problem",
        "Você tem R$ 23 na carteira e recebe mais R$ 10 de troco. Quanto você tem no total?",
        "33"
      ]
    );
  }
  
  if (page.slug === "o-que-e-subtrair") {
    await connection.execute(
      `INSERT INTO exercises (pageId, \`order\`, type, question, expectedAnswer) 
       VALUES (?, ?, ?, ?, ?)`,
      [
        page.id,
        1,
        "simple_input",
        "Complete: $23 - ___ = 10$",
        "13"
      ]
    );
    
    await connection.execute(
      `INSERT INTO exercises (pageId, \`order\`, type, question, expectedAnswer, alternativeAnswers) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        page.id,
        2,
        "practical_problem",
        "Você comprou um café por R$ 4,50 e um pão de queijo por R$ 3,00. Você pagou com uma nota de R$ 10,00. Qual o valor total da compra? Qual o troco?",
        "7.50",
        JSON.stringify(["7,50", "2.50", "2,50"])
      ]
    );
  }
  
  if (page.slug === "soma-repetida") {
    await connection.execute(
      `INSERT INTO exercises (pageId, \`order\`, type, question, expectedAnswer) 
       VALUES (?, ?, ?, ?, ?)`,
      [
        page.id,
        1,
        "simple_input",
        "Quanto é $5 \\times 4$?",
        "20"
      ]
    );
    
    await connection.execute(
      `INSERT INTO exercises (pageId, \`order\`, type, question, expectedAnswer) 
       VALUES (?, ?, ?, ?, ?)`,
      [
        page.id,
        2,
        "practical_problem",
        "Você está organizando uma festa e precisa de 5 pacotes de refrigerante, e cada pacote tem 6 latas. Quantas latas você terá no total?",
        "30"
      ]
    );
  }
  
  if (page.slug === "operacao-inversa") {
    await connection.execute(
      `INSERT INTO exercises (pageId, \`order\`, type, question, expectedAnswer) 
       VALUES (?, ?, ?, ?, ?)`,
      [
        page.id,
        1,
        "simple_input",
        "Quanto é $12 \\div 4$?",
        "3"
      ]
    );
    
    await connection.execute(
      `INSERT INTO exercises (pageId, \`order\`, type, question, expectedAnswer) 
       VALUES (?, ?, ?, ?, ?)`,
      [
        page.id,
        2,
        "practical_problem",
        "Você e 3 amigos vão dividir igualmente uma conta de R$ 120. Quanto cada um deve pagar?",
        "30"
      ]
    );
  }
}

console.log("✓ Created exercises for pages");

await connection.end();

console.log("\n✅ Database seeded successfully!");
