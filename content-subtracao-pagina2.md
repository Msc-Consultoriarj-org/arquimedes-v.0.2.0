# Subtração Página 2: Movimento na Reta Numérica

## Introdução: Visualizando a Subtração

Assim como a adição nos leva para a **direita** na reta numérica, a subtração nos leva para a **esquerda**. Quando subtraímos, estamos **voltando** ou **retirando** quantidades. É como andar para trás em uma linha de números.

<YouTubeEmbed videoId="PLACEHOLDER_SUBTRACAO_RETA" title="Subtração na Reta Numérica - Movimento Para a Esquerda" />

**Regra de Ouro:** Subtrair = Mover Para a Esquerda

**Exemplo do dia a dia:**
- Você tem R$ 500 na conta e paga uma conta de R$ 150 → você "anda" 150 para a esquerda, chegando em R$ 350
- A temperatura estava em 25°C e caiu 8°C → você se move 8 unidades para a esquerda, chegando em 17°C

## Parte 1: Movimentos Simples na Reta

### Exemplo Guiado: 10 - 3

Vamos visualizar passo a passo:

```
1. Comece no número 10
2. Dê 3 saltos para a ESQUERDA
3. Onde você chegou?

10 → 9 → 8 → 7
```

**Resposta: 7**

<NumberLine start={0} end={15} highlight={[10, 7]} operation="subtraction" from={10} amount={3} />

### Exercícios de Aquecimento

<ExerciseCard 
  question="Comece em 15, subtraia 5. Onde você chega?"
  expectedAnswer="10"
  hints={["Dê 5 saltos para a esquerda a partir do 15", "15 → 14 → 13 → 12 → 11 → 10"]}
  type="simple_input"
/>

<ExerciseCard 
  question="Comece em 20, subtraia 8. Onde você chega?"
  expectedAnswer="12"
  hints={["Conte 8 números para trás a partir do 20", "20 - 8 = 12"]}
  type="simple_input"
/>

<ExerciseCard 
  question="Comece em 30, subtraia 12. Onde você chega?"
  expectedAnswer="18"
  hints={["Você pode fazer em duas etapas: 30 - 10 = 20, depois 20 - 2 = 18", "Ou conte 12 para trás"]}
  type="simple_input"
/>

<ExerciseCard 
  question="Comece em 50, subtraia 25. Onde você chega?"
  expectedAnswer="25"
  hints={["50 - 25 é metade de 50", "Pense: qual número + 25 = 50?"]}
  type="simple_input"
/>

<ExerciseCard 
  question="Comece em 100, subtraia 45. Onde você chega?"
  expectedAnswer="55"
  hints={["100 - 40 = 60, depois 60 - 5 = 55", "Ou: 100 - 50 = 50, depois 50 + 5 = 55"]}
  type="simple_input"
/>

## Parte 2: Subtração Como "Quanto Falta?"

A subtração também responde à pergunta: **"Quanto falta para chegar?"**

**Exemplo:** Você tem R$ 300 e quer comprar um celular de R$ 800. Quanto falta?

```
800 - 300 = 500
```

**Faltam R$ 500**

Na reta numérica, você está no 300 e quer chegar no 800. A distância entre eles é 500.

### Exercícios: Quanto Falta?

<ExerciseCard 
  question="Você tem R$ 150 e precisa de R$ 400. Quanto falta?"
  expectedAnswer="250"
  alternativeAnswers={["R$ 250", "250 reais"]}
  hints={["400 - 150 = ?", "Pense: 150 + ? = 400"]}
  type="simple_input"
/>

<ExerciseCard 
  question="Você caminhou 3 km de uma trilha de 10 km. Quanto falta?"
  expectedAnswer="7"
  alternativeAnswers={["7 km", "7km"]}
  hints={["10 - 3 = ?", "Você já fez 3, faltam..."]}
  type="simple_input"
/>

<ExerciseCard 
  question="Você leu 85 páginas de um livro de 200 páginas. Quantas faltam?"
  expectedAnswer="115"
  alternativeAnswers={["115 páginas"]}
  hints={["200 - 85 = ?", "Decomponha: 200 - 80 = 120, depois 120 - 5 = 115"]}
  type="simple_input"
/>

<ExerciseCard 
  question="Você economizou R$ 1.200 para uma viagem de R$ 2.500. Quanto falta?"
  expectedAnswer="1300"
  alternativeAnswers={["R$ 1.300", "1300 reais", "R$ 1300"]}
  hints={["2.500 - 1.200 = ?", "2.500 - 1.000 = 1.500, depois 1.500 - 200 = 1.300"]}
  type="simple_input"
/>

<ExerciseCard 
  question="Uma meta de vendas é R$ 5.000. Você já vendeu R$ 3.750. Quanto falta?"
  expectedAnswer="1250"
  alternativeAnswers={["R$ 1.250", "1250 reais", "R$ 1250"]}
  hints={["5.000 - 3.750 = ?", "5.000 - 3.000 = 2.000, depois 2.000 - 750 = 1.250"]}
  type="simple_input"
/>

## Parte 3: Subtração com Decomposição

Quando os números são grandes, podemos **decompor** a subtração em partes menores.

**Exemplo: 87 - 34**

**Método 1: Subtrair dezenas e unidades separadamente**
```
87 - 34
= (80 - 30) + (7 - 4)
= 50 + 3
= 53
```

**Método 2: Subtrair em etapas**
```
87 - 30 = 57
57 - 4 = 53
```

### Exercícios: Decomposição

<ExerciseCard 
  question="56 - 23 = ?"
  expectedAnswer="33"
  hints={["(50 - 20) + (6 - 3)", "Ou: 56 - 20 = 36, depois 36 - 3 = 33"]}
  type="simple_input"
/>

<ExerciseCard 
  question="78 - 45 = ?"
  expectedAnswer="33"
  hints={["78 - 40 = 38, depois 38 - 5 = 33", "Ou: (70 - 40) + (8 - 5) = 30 + 3 = 33"]}
  type="simple_input"
/>

<ExerciseCard 
  question="92 - 57 = ?"
  expectedAnswer="35"
  hints={["92 - 50 = 42, depois 42 - 7 = 35", "Ou: 92 - 60 = 32, depois 32 + 3 = 35"]}
  type="simple_input"
/>

<ExerciseCard 
  question="145 - 68 = ?"
  expectedAnswer="77"
  hints={["145 - 60 = 85, depois 85 - 8 = 77", "Ou: 145 - 70 = 75, depois 75 + 2 = 77"]}
  type="simple_input"
/>

<ExerciseCard 
  question="234 - 127 = ?"
  expectedAnswer="107"
  hints={["234 - 100 = 134, depois 134 - 27 = 107", "Decomponha: 134 - 20 = 114, depois 114 - 7 = 107"]}
  type="simple_input"
/>

## Parte 4: Situações Práticas de Orçamento

### Exemplo: Controle de Gastos

Você tem R$ 800 para gastar no mês. Vamos acompanhar seus gastos:

```
Saldo inicial: R$ 800
- Supermercado: R$ 280
Saldo: 800 - 280 = 520

- Conta de luz: R$ 150
Saldo: 520 - 150 = 370

- Internet: R$ 100
Saldo: 370 - 100 = 270

Saldo final: R$ 270
```

### Exercícios: Orçamento Pessoal

<ExerciseCard 
  question="Você tem R$ 500. Gasta R$ 180 no supermercado. Quanto sobra?"
  expectedAnswer="320"
  alternativeAnswers={["R$ 320", "320 reais"]}
  hints={["500 - 180 = ?", "500 - 200 = 300, depois 300 + 20 = 320"]}
  type="simple_input"
/>

<ExerciseCard 
  question="Você recebeu R$ 1.200 de salário. Pagou R$ 450 de aluguel e R$ 200 de contas. Quanto sobra?"
  expectedAnswer="550"
  alternativeAnswers={["R$ 550", "550 reais"]}
  hints={["Primeiro some os gastos: 450 + 200 = 650", "Depois: 1.200 - 650 = 550"]}
  type="simple_input"
/>

<ExerciseCard 
  question="Você tinha R$ 2.000 na poupança. Retirou R$ 750 para uma emergência. Quanto ficou?"
  expectedAnswer="1250"
  alternativeAnswers={["R$ 1.250", "1250 reais", "R$ 1250"]}
  hints={["2.000 - 750 = ?", "2.000 - 1.000 = 1.000, depois 1.000 + 250 = 1.250"]}
  type="simple_input"
/>

<ExerciseCard 
  question="Você comprou um sofá de R$ 1.800 e deu R$ 500 de entrada. Quanto falta pagar?"
  expectedAnswer="1300"
  alternativeAnswers={["R$ 1.300", "1300 reais", "R$ 1300"]}
  hints={["1.800 - 500 = ?", "1.800 - 500 = 1.300"]}
  type="simple_input"
/>

<ExerciseCard 
  question="Você tinha R$ 3.500 e gastou R$ 890 em uma viagem. Quanto sobrou?"
  expectedAnswer="2610"
  alternativeAnswers={["R$ 2.610", "2610 reais", "R$ 2610"]}
  hints={["3.500 - 890 = ?", "3.500 - 900 = 2.600, depois 2.600 + 10 = 2.610"]}
  type="simple_input"
/>

## Parte 5: Troco e Pagamentos

Calcular troco é uma habilidade essencial no dia a dia.

**Exemplo:** Você compra algo de R$ 37 e paga com R$ 50. Quanto de troco?

```
50 - 37 = 13
Troco: R$ 13
```

### Exercícios: Calculando Troco

<ExerciseCard 
  question="Você compra algo de R$ 25 e paga com R$ 50. Quanto de troco?"
  expectedAnswer="25"
  alternativeAnswers={["R$ 25", "25 reais"]}
  hints={["50 - 25 = ?", "É metade de 50"]}
  type="simple_input"
/>

<ExerciseCard 
  question="Você compra algo de R$ 78 e paga com R$ 100. Quanto de troco?"
  expectedAnswer="22"
  alternativeAnswers={["R$ 22", "22 reais"]}
  hints={["100 - 78 = ?", "100 - 80 = 20, depois 20 + 2 = 22"]}
  type="simple_input"
/>

<ExerciseCard 
  question="Você compra algo de R$ 145 e paga com R$ 200. Quanto de troco?"
  expectedAnswer="55"
  alternativeAnswers={["R$ 55", "55 reais"]}
  hints={["200 - 145 = ?", "200 - 150 = 50, depois 50 + 5 = 55"]}
  type="simple_input"
/>

<ExerciseCard 
  question="Você compra algo de R$ 387 e paga com R$ 500. Quanto de troco?"
  expectedAnswer="113"
  alternativeAnswers={["R$ 113", "113 reais"]}
  hints={["500 - 387 = ?", "500 - 400 = 100, depois 100 + 13 = 113"]}
  type="simple_input"
/>

<ExerciseCard 
  question="Você compra algo de R$ 1.250 e paga com R$ 1.500. Quanto de troco?"
  expectedAnswer="250"
  alternativeAnswers={["R$ 250", "250 reais"]}
  hints={["1.500 - 1.250 = ?", "1.500 - 1.000 = 500, depois 500 - 250 = 250"]}
  type="simple_input"
/>

## Parte 6: Desafios Avançados

<ExerciseCard 
  question="Você tinha R$ 5.000. Pagou R$ 1.200 de aluguel, R$ 450 de contas, R$ 800 de supermercado e R$ 350 de transporte. Quanto sobrou?"
  expectedAnswer="2200"
  alternativeAnswers={["R$ 2.200", "2200 reais", "R$ 2200"]}
  hints={["Primeiro some todos os gastos: 1.200 + 450 + 800 + 350 = 2.800", "Depois: 5.000 - 2.800 = 2.200"]}
  type="simple_input"
/>

<ExerciseCard 
  question="Uma empresa tinha R$ 50.000 em caixa. Pagou R$ 12.500 de salários, R$ 8.750 de fornecedores e R$ 3.200 de impostos. Quanto sobrou?"
  expectedAnswer="25550"
  alternativeAnswers={["R$ 25.550", "25550 reais", "R$ 25550"]}
  hints={["Some os gastos: 12.500 + 8.750 + 3.200 = 24.450", "Depois: 50.000 - 24.450 = 25.550"]}
  type="simple_input"
/>

<ExerciseCard 
  question="Você quer comprar um carro de R$ 35.000. Tem R$ 8.500 de entrada e conseguiu um financiamento de R$ 20.000. Quanto ainda falta?"
  expectedAnswer="6500"
  alternativeAnswers={["R$ 6.500", "6500 reais", "R$ 6500"]}
  hints={["Você tem: 8.500 + 20.000 = 28.500", "Falta: 35.000 - 28.500 = 6.500"]}
  type="simple_input"
/>

## Resumo: Checklist de Domínio

Você dominou subtração na reta numérica quando consegue:

- ✓ Visualizar subtração como movimento para a esquerda
- ✓ Calcular "quanto falta" para atingir um objetivo
- ✓ Decompor subtrações grandes em partes menores
- ✓ Resolver problemas de orçamento e controle de gastos
- ✓ Calcular troco corretamente
- ✓ Resolver desafios com múltiplas subtrações

**Próximo passo:** Pratique com exercícios variados na Página 3!
