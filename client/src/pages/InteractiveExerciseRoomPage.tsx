import { useState, useEffect } from "react";
import { MobileNav } from "@/components/MobileNav";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Target, Sparkles, Trophy, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FillInBlanks } from "@/components/interactive/FillInBlanks";
import { InteractiveSlider } from "@/components/interactive/InteractiveSlider";
import { MatchingGame } from "@/components/interactive/MatchingGame";
import { useSounds } from "@/lib/sounds";
import { useHaptic } from "@/lib/useHaptic";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function InteractiveExerciseRoomPage() {
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const [totalPoints, setTotalPoints] = useState(0);
  
  const { playSuccess, playError } = useSounds();
  const haptic = useHaptic();

  // Query de exercícios interativos completados
  const { data: completedInteractiveData = [] } = trpc.standaloneExercises.getCompletedInteractive.useQuery();
  
  // Inicializar estado com exercícios já completados do banco
  useEffect(() => {
    if (completedInteractiveData.length > 0) {
      setCompletedExercises(new Set(completedInteractiveData.map(c => c.uniqueId)));
      const totalPts = completedInteractiveData.reduce((sum, c) => sum + c.pointsEarned, 0);
      setTotalPoints(totalPts);
    }
  }, [completedInteractiveData]);

  const addPointsMutation = trpc.points.addPoints.useMutation({
    onSuccess: () => {
      // Pontos adicionados com sucesso
    },
  });
  
  const markInteractiveCompleteMutation = trpc.standaloneExercises.markInteractiveComplete.useMutation();

  const handleExerciseComplete = async (exerciseId: string, points: number, isCorrect: boolean) => {
    if (completedExercises.has(exerciseId)) {
      toast.info("Você já completou este exercício!");
      return;
    }

    if (isCorrect) {
      setCompletedExercises(prev => new Set(prev).add(exerciseId));
      setTotalPoints(prev => prev + points);
      
      // Feedback multissensorial
      playSuccess();
      haptic.success();
      toast.success(`+${points} pontos! 🎉`);
      
      // Adicionar pontos ao sistema
      await addPointsMutation.mutateAsync({
        action: "exercise_completed",
        points,
        relatedId: undefined,
      });
      
      // Marcar como completado no banco
      await markInteractiveCompleteMutation.mutateAsync({
        uniqueId: exerciseId,
        isCorrect: true,
        pointsEarned: points,
      });
    } else {
      playError();
      haptic.error();
      toast.error("Resposta incorreta. Tente novamente!");
    }
  };

  const getDifficultyColor = (difficulty: "easy" | "moderate" | "hard") => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-700 border-green-300";
      case "moderate":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "hard":
        return "bg-red-100 text-red-700 border-red-300";
    }
  };

  const getDifficultyLabel = (difficulty: "easy" | "moderate" | "hard") => {
    switch (difficulty) {
      case "easy":
        return "Fácil";
      case "moderate":
        return "Moderado";
      case "hard":
        return "Difícil";
    }
  };

  return (
    <>
      <MobileNav />
      <Sidebar />
      <div className="lg:ml-72 min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="h-10 w-10 text-purple-600" />
              <h1 className="text-4xl font-bold text-gray-900">Sala de Exercícios Interativos</h1>
            </div>
            <p className="text-lg text-gray-600">
              Pratique com componentes interativos avançados e ganhe pontos!
            </p>
          </div>

          {/* Info Alert */}
          {completedExercises.size > 0 && (
            <Alert className="mb-6 bg-blue-50 border-blue-200">
              <Info className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                Você já completou {completedExercises.size} exercício(s)! Para revisar suas respostas, acesse a página{" "}
                <a href="/exercicios-resolvidos" className="font-semibold underline hover:text-blue-600">
                  Exercícios Resolvidos
                </a>
                .
              </AlertDescription>
            </Alert>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="border-purple-200 bg-purple-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <Target className="h-4 w-4 text-purple-600" />
                  Exercícios Completados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-purple-600">{completedExercises.size}</p>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-blue-600" />
                  Pontos Ganhos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-blue-600">{totalPoints}</p>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-green-600" />
                  Taxa de Acerto
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-600">
                  {completedExercises.size > 0 ? "100%" : "0%"}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs por Módulo */}
          <Tabs defaultValue="adicao" className="w-full">
            <TabsList className="w-full flex flex-wrap gap-2 h-auto bg-white p-2 rounded-lg shadow-sm overflow-x-auto">
              <TabsTrigger value="adicao" className="whitespace-nowrap flex-shrink-0">
                ➕ Adição
              </TabsTrigger>
              <TabsTrigger value="subtracao" className="whitespace-nowrap flex-shrink-0">
                ➖ Subtração
              </TabsTrigger>
              <TabsTrigger value="multiplicacao" className="whitespace-nowrap flex-shrink-0">
                ✖️ Multiplicação
              </TabsTrigger>
              <TabsTrigger value="divisao" className="whitespace-nowrap flex-shrink-0">
                ➗ Divisão
              </TabsTrigger>
              <TabsTrigger value="fracoes" className="whitespace-nowrap flex-shrink-0">
                🍕 Frações
              </TabsTrigger>
              <TabsTrigger value="proporcao" className="whitespace-nowrap flex-shrink-0">
                ⚖️ Proporção
              </TabsTrigger>
              <TabsTrigger value="porcentagem" className="whitespace-nowrap flex-shrink-0">
                💯 Porcentagem
              </TabsTrigger>
            </TabsList>

            {/* Módulo 1: Adição */}
            <TabsContent value="adicao" className="space-y-6 mt-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Exercícios de Adição</h2>

              {/* FillInBlanks - Fácil (60%) */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Complete a Operação</CardTitle>
                    <Badge className={getDifficultyColor("easy")}>
                      {getDifficultyLabel("easy")} • 5 pts
                    </Badge>
                  </div>
                  <CardDescription>
                    Preencha as lacunas para completar a adição
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FillInBlanks
                    showFeedback={true}
                    text="João tinha R$ {blank1} e ganhou R$ 15. Agora ele tem R$ 35. Quanto João tinha inicialmente?"
                    blanks={[{ id: "blank1", correctAnswer: "20", acceptableAnswers: ["vinte"] }]}
                    onComplete={(isCorrect) => handleExerciseComplete("adicao-fill-1", 5, isCorrect)}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Soma de Compras</CardTitle>
                    <Badge className={getDifficultyColor("easy")}>
                      {getDifficultyLabel("easy")} • 5 pts
                    </Badge>
                  </div>
                  <CardDescription>
                    Complete a conta do supermercado
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FillInBlanks
                    showFeedback={true}
                    text="No supermercado, Maria comprou arroz por R$ 12, feijão por R$ {blank1} e óleo por R$ 8. O total foi R$ 27. Quanto custou o feijão?"
                    blanks={[{ id: "blank1", correctAnswer: "7", acceptableAnswers: ["sete"] }]}
                    onComplete={(isCorrect) => handleExerciseComplete("adicao-fill-2", 5, isCorrect)}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Distância Total</CardTitle>
                    <Badge className={getDifficultyColor("easy")}>
                      {getDifficultyLabel("easy")} • 5 pts
                    </Badge>
                  </div>
                  <CardDescription>
                    Calcule a distância percorrida
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FillInBlanks
                    showFeedback={true}
                    text="Pedro correu 3 km pela manhã e {blank1} km à tarde. No total, ele correu 8 km. Quantos km Pedro correu à tarde?"
                    blanks={[{ id: "blank1", correctAnswer: "5", acceptableAnswers: ["cinco"] }]}
                    onComplete={(isCorrect) => handleExerciseComplete("adicao-fill-3", 5, isCorrect)}
                  />
                </CardContent>
              </Card>

              {/* InteractiveSlider - Moderado (30%) */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Estimativa de Orçamento</CardTitle>
                    <Badge className={getDifficultyColor("moderate")}>
                      {getDifficultyLabel("moderate")} • 10 pts
                    </Badge>
                  </div>
                  <CardDescription>
                    Use o slider para estimar o valor total
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <InteractiveSlider
                    label="Você tem R$ 150 e quer comprar 3 itens: camisa (R$ 45), calça (R$ 80) e tênis (R$ 120). Estime quanto você vai gastar no total."
                    min={0}
                    max={300}
                    correctValue={245}
                    hint="Dica: Some os preços dos 3 itens que você quer comprar. Não precisa considerar o R$ 150 que você tem, apenas calcule o total da compra."
                    unit="R$"
                    showFeedback={true}
                    onSubmit={(value: number, isCorrect: boolean) => handleExerciseComplete("adicao-slider-1", 10, isCorrect)}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Soma de Horas Trabalhadas</CardTitle>
                    <Badge className={getDifficultyColor("moderate")}>
                      {getDifficultyLabel("moderate")} • 10 pts
                    </Badge>
                  </div>
                  <CardDescription>
                    Estime o total de horas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <InteractiveSlider
                    label="Ana trabalhou 8h na segunda, 6h na terça, 7h na quarta e 9h na quinta. Quantas horas ela trabalhou no total?"
                    min={0}
                    max={50}
                    correctValue={30}
                    unit="h"
                    showFeedback={true}
                    onSubmit={(value: number, isCorrect: boolean) => handleExerciseComplete("adicao-slider-2", 10, isCorrect)}
                  />
                </CardContent>
              </Card>

              {/* MatchingGame - Difícil (10%) */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Conecte as Propriedades da Adição</CardTitle>
                    <Badge className={getDifficultyColor("hard")}>
                      {getDifficultyLabel("hard")} • 15 pts
                    </Badge>
                  </div>
                  <CardDescription>
                    Arraste para conectar cada propriedade com seu exemplo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MatchingGame
                    pairs={[
                      { id: "1", left: "Comutativa", right: "5 + 3 = 3 + 5" },
                      { id: "2", left: "Associativa", right: "(2 + 3) + 4 = 2 + (3 + 4)" },
                      { id: "3", left: "Elemento Neutro", right: "7 + 0 = 7" },
                    ]}
                    hint="Dica: A propriedade COMUTATIVA diz que a ordem não altera o resultado. A ASSOCIATIVA permite reagrupar os números. O ELEMENTO NEUTRO é o zero, que não muda o valor quando somado."
                    onComplete={(isCorrect) => handleExerciseComplete("adicao-match-1", 15, isCorrect)}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Módulo 2: Subtração */}
            <TabsContent value="subtracao" className="space-y-6 mt-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Exercícios de Subtração</h2>

              {/* FillInBlanks - Fácil */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Calculando o Troco</CardTitle>
                    <Badge className={getDifficultyColor("easy")}>
                      {getDifficultyLabel("easy")} • 5 pts
                    </Badge>
                  </div>
                  <CardDescription>
                    Complete a operação de troco
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FillInBlanks
                    showFeedback={true}
                    text="Carlos pagou R$ 50 por uma compra de R$ 37. Ele recebeu R$ [blank] de troco."
                    blanks={[{ id: "1", correctAnswer: "", acceptableAnswers: ["13", "treze"] }]}
                    onComplete={(isCorrect) => handleExerciseComplete("subtracao-fill-1", 5, isCorrect)}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Diferença de Idade</CardTitle>
                    <Badge className={getDifficultyColor("easy")}>
                      {getDifficultyLabel("easy")} • 5 pts
                    </Badge>
                  </div>
                  <CardDescription>
                    Calcule a diferença
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FillInBlanks
                    showFeedback={true}
                    text="Luís tem 28 anos e sua irmã tem 19 anos. A diferença de idade entre eles é de [blank] anos."
                    blanks={[{ id: "1", correctAnswer: "", acceptableAnswers: ["9", "nove"] }]}
                    onComplete={(isCorrect) => handleExerciseComplete("subtracao-fill-2", 5, isCorrect)}
                  />
                </CardContent>
              </Card>

              {/* InteractiveSlider - Moderado */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Quanto Falta para a Meta?</CardTitle>
                    <Badge className={getDifficultyColor("moderate")}>
                      {getDifficultyLabel("moderate")} • 10 pts
                    </Badge>
                  </div>
                  <CardDescription>
                    Estime quanto falta
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <InteractiveSlider
                    label="Beatriz quer economizar R$ 500 para comprar um celular. Ela já tem R$ 320. Quanto ainda falta?"
                    min={0}
                    max={500}
                    correctValue={180}
                    // tolerance={10}
                    unit="R$"
                    onSubmit={(value: number, isCorrect: boolean) => handleExerciseComplete("subtracao-slider-1", 10, isCorrect)}
                  />
                </CardContent>
              </Card>

              {/* MatchingGame - Difícil */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Tipos de Subtração</CardTitle>
                    <Badge className={getDifficultyColor("hard")}>
                      {getDifficultyLabel("hard")} • 15 pts
                    </Badge>
                  </div>
                  <CardDescription>
                    Conecte cada tipo com seu exemplo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MatchingGame
                    pairs={[
                      { id: "1", left: "Tirar/Remover", right: "Tinha 10 maçãs, comi 3" },
                      { id: "2", left: "Comparar", right: "João tem 12 anos, Maria tem 8" },
                      { id: "3", left: "Completar", right: "Tenho R$ 20, faltam R$ 5 para R$ 25" },
                    ]}
                    hint="Dica: TIRAR/REMOVER é quando algo é retirado. COMPARAR é encontrar a diferença entre dois valores. COMPLETAR é descobrir quanto falta para chegar a um total."
                    onComplete={(isCorrect) => handleExerciseComplete("subtracao-match-1", 15, isCorrect)}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Módulo 3: Multiplicação */}
            <TabsContent value="multiplicacao" className="space-y-6 mt-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Exercícios de Multiplicação</h2>

              {/* FillInBlanks - Fácil */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Soma Repetida</CardTitle>
                    <Badge className={getDifficultyColor("easy")}>
                      {getDifficultyLabel("easy")} • 5 pts
                    </Badge>
                  </div>
                  <CardDescription>
                    Complete a multiplicação
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FillInBlanks
                    showFeedback={true}
                    text="Se cada caixa tem 6 ovos e você comprou 4 caixas, você tem [blank] ovos no total."
                    blanks={[{ id: "1", correctAnswer: "", acceptableAnswers: ["24", "vinte e quatro"] }]}
                    onComplete={(isCorrect) => handleExerciseComplete("multiplicacao-fill-1", 5, isCorrect)}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Preço Total</CardTitle>
                    <Badge className={getDifficultyColor("easy")}>
                      {getDifficultyLabel("easy")} • 5 pts
                    </Badge>
                  </div>
                  <CardDescription>
                    Calcule o valor total
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FillInBlanks
                    showFeedback={true}
                    text="Cada caneta custa R$ 3. Se você comprar 7 canetas, vai gastar R$ [blank]."
                    blanks={[{ id: "1", correctAnswer: "", acceptableAnswers: ["21", "vinte e um"] }]}
                    onComplete={(isCorrect) => handleExerciseComplete("multiplicacao-fill-2", 5, isCorrect)}
                  />
                </CardContent>
              </Card>

              {/* InteractiveSlider - Moderado */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Área do Retângulo</CardTitle>
                    <Badge className={getDifficultyColor("moderate")}>
                      {getDifficultyLabel("moderate")} • 10 pts
                    </Badge>
                  </div>
                  <CardDescription>
                    Estime a área
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <InteractiveSlider
                    label="Um retângulo tem 12 metros de comprimento e 8 metros de largura. Qual é a área em m²?"
                    min={0}
                    max={200}
                    correctValue={96}
                    hint="Dica: A área de um retângulo é calculada multiplicando comprimento × largura. Pense em quantos quadrados de 1m² cabem dentro do retângulo."
                    unit="m²"
                    onSubmit={(value: number, isCorrect: boolean) => handleExerciseComplete("multiplicacao-slider-1", 10, isCorrect)}
                  />
                </CardContent>
              </Card>

              {/* MatchingGame - Difícil */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Propriedades da Multiplicação</CardTitle>
                    <Badge className={getDifficultyColor("hard")}>
                      {getDifficultyLabel("hard")} • 15 pts
                    </Badge>
                  </div>
                  <CardDescription>
                    Conecte as propriedades
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MatchingGame
                    pairs={[
                      { id: "1", left: "Comutativa", right: "4 × 5 = 5 × 4" },
                      { id: "2", left: "Associativa", right: "(2 × 3) × 4 = 2 × (3 × 4)" },
                      { id: "3", left: "Distributiva", right: "3 × (4 + 5) = 3 × 4 + 3 × 5" },
                    ]}
                    hint="Dica: COMUTATIVA permite trocar a ordem. ASSOCIATIVA permite reagrupar. DISTRIBUTIVA distribui a multiplicação sobre a soma (multiplica cada termo dentro dos parênteses)."
                    onComplete={(isCorrect) => handleExerciseComplete("multiplicacao-match-1", 15, isCorrect)}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Módulo 4: Divisão */}
            <TabsContent value="divisao" className="space-y-6 mt-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Exercícios de Divisão</h2>

              {/* FillInBlanks - Fácil */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Repartição Justa</CardTitle>
                    <Badge className={getDifficultyColor("easy")}>
                      {getDifficultyLabel("easy")} • 5 pts
                    </Badge>
                  </div>
                  <CardDescription>
                    Divida igualmente
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FillInBlanks
                    showFeedback={true}
                    text="12 chocolates serão divididos igualmente entre 3 crianças. Cada criança receberá [blank] chocolates."
                    blanks={[{ id: "1", correctAnswer: "", acceptableAnswers: ["4", "quatro"] }]}
                    onComplete={(isCorrect) => handleExerciseComplete("divisao-fill-1", 5, isCorrect)}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Preço Unitário</CardTitle>
                    <Badge className={getDifficultyColor("easy")}>
                      {getDifficultyLabel("easy")} • 5 pts
                    </Badge>
                  </div>
                  <CardDescription>
                    Calcule o preço de cada item
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FillInBlanks
                    showFeedback={true}
                    text="Um pacote com 5 canetas custa R$ 15. Cada caneta custa R$ [blank]."
                    blanks={[{ id: "1", correctAnswer: "", acceptableAnswers: ["3", "três"] }]}
                    onComplete={(isCorrect) => handleExerciseComplete("divisao-fill-2", 5, isCorrect)}
                  />
                </CardContent>
              </Card>

              {/* InteractiveSlider - Moderado */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Divisão de Lucro</CardTitle>
                    <Badge className={getDifficultyColor("moderate")}>
                      {getDifficultyLabel("moderate")} • 10 pts
                    </Badge>
                  </div>
                  <CardDescription>
                    Estime a parte de cada um
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <InteractiveSlider
                    label="Três sócios vão dividir um lucro de R$ 1.200 igualmente. Quanto cada um vai receber?"
                    min={0}
                    max={1000}
                    correctValue={400}
                    // tolerance={20}
                    unit="R$"
                    onSubmit={(value: number, isCorrect: boolean) => handleExerciseComplete("divisao-slider-1", 10, isCorrect)}
                  />
                </CardContent>
              </Card>

              {/* MatchingGame - Difícil */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Conceitos de Divisão</CardTitle>
                    <Badge className={getDifficultyColor("hard")}>
                      {getDifficultyLabel("hard")} • 15 pts
                    </Badge>
                  </div>
                  <CardDescription>
                    Conecte os termos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MatchingGame
                    pairs={[
                      { id: "1", left: "Dividendo", right: "O número que será dividido" },
                      { id: "2", left: "Divisor", right: "O número pelo qual dividimos" },
                      { id: "3", left: "Quociente", right: "O resultado da divisão" },
                    ]}
                    hint="Dica: Em 20 ÷ 4 = 5, o DIVIDENDO é 20 (o que está sendo dividido), o DIVISOR é 4 (por quanto dividimos), e o QUOCIENTE é 5 (o resultado)."
                    onComplete={(isCorrect) => handleExerciseComplete("divisao-match-1", 15, isCorrect)}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Módulo 5: Frações */}
            <TabsContent value="fracoes" className="space-y-6 mt-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Exercícios de Frações</h2>

              {/* FillInBlanks - Fácil */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Metade da Pizza</CardTitle>
                    <Badge className={getDifficultyColor("easy")}>
                      {getDifficultyLabel("easy")} • 5 pts
                    </Badge>
                  </div>
                  <CardDescription>
                    Complete a fração
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FillInBlanks
                    showFeedback={true}
                    text="Uma pizza foi dividida em 8 fatias. Você comeu 4 fatias. Você comeu [blank]/8 da pizza, que é o mesmo que 1/2."
                    blanks={[{ id: "1", correctAnswer: "", acceptableAnswers: ["4", "quatro"] }]}
                    onComplete={(isCorrect) => handleExerciseComplete("fracoes-fill-1", 5, isCorrect)}
                  />
                </CardContent>
              </Card>

              {/* InteractiveSlider - Moderado */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Fração de um Valor</CardTitle>
                    <Badge className={getDifficultyColor("moderate")}>
                      {getDifficultyLabel("moderate")} • 10 pts
                    </Badge>
                  </div>
                  <CardDescription>
                    Estime o valor
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <InteractiveSlider
                    label="Quanto é 3/4 de R$ 200?"
                    min={0}
                    max={200}
                    correctValue={150}
                    hint="Dica: Primeiro divida 200 por 4 (o denominador) para encontrar 1/4. Depois multiplique o resultado por 3 (o numerador) para encontrar 3/4."
                    unit="R$"
                    onSubmit={(value: number, isCorrect: boolean) => handleExerciseComplete("fracoes-slider-1", 10, isCorrect)}
                  />
                </CardContent>
              </Card>

              {/* MatchingGame - Difícil */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Frações Equivalentes</CardTitle>
                    <Badge className={getDifficultyColor("hard")}>
                      {getDifficultyLabel("hard")} • 15 pts
                    </Badge>
                  </div>
                  <CardDescription>
                    Conecte frações equivalentes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MatchingGame
                    pairs={[
                      { id: "1", left: "1/2", right: "2/4" },
                      { id: "2", left: "1/3", right: "2/6" },
                      { id: "3", left: "2/5", right: "4/10" },
                    ]}
                    hint="Dica: Frações equivalentes têm o mesmo valor. Para encontrá-las, multiplique o numerador E o denominador pelo mesmo número. Ex: 1/2 = (1×2)/(2×2) = 2/4."
                    onComplete={(isCorrect) => handleExerciseComplete("fracoes-match-1", 15, isCorrect)}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Módulo 6: Proporção */}
            <TabsContent value="proporcao" className="space-y-6 mt-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Exercícios de Proporção e Razão</h2>

              {/* FillInBlanks - Fácil */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Regra de Três Simples</CardTitle>
                    <Badge className={getDifficultyColor("easy")}>
                      {getDifficultyLabel("easy")} • 5 pts
                    </Badge>
                  </div>
                  <CardDescription>
                    Complete a proporção
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FillInBlanks
                    showFeedback={true}
                    text="Se 2 kg de arroz custam R$ 10, então 6 kg custam R$ [blank]."
                    blanks={[{ id: "1", correctAnswer: "", acceptableAnswers: ["30", "trinta"] }]}
                    onComplete={(isCorrect) => handleExerciseComplete("proporcao-fill-1", 5, isCorrect)}
                  />
                </CardContent>
              </Card>

              {/* InteractiveSlider - Moderado */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Velocidade Média</CardTitle>
                    <Badge className={getDifficultyColor("moderate")}>
                      {getDifficultyLabel("moderate")} • 10 pts
                    </Badge>
                  </div>
                  <CardDescription>
                    Estime a distância
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <InteractiveSlider
                    label="Um carro viaja a 60 km/h. Em 3 horas, quantos km ele percorre?"
                    min={0}
                    max={300}
                    correctValue={180}
                    // tolerance={10}
                    unit="km"
                    onSubmit={(value: number, isCorrect: boolean) => handleExerciseComplete("proporcao-slider-1", 10, isCorrect)}
                  />
                </CardContent>
              </Card>

              {/* MatchingGame - Difícil */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Tipos de Proporção</CardTitle>
                    <Badge className={getDifficultyColor("hard")}>
                      {getDifficultyLabel("hard")} • 15 pts
                    </Badge>
                  </div>
                  <CardDescription>
                    Conecte os conceitos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MatchingGame
                    pairs={[
                      { id: "1", left: "Diretamente Proporcional", right: "Mais velocidade, mais distância" },
                      { id: "2", left: "Inversamente Proporcional", right: "Mais pessoas, menos tempo" },
                      { id: "3", left: "Razão", right: "Comparação entre duas quantidades" },
                    ]}
                    hint="Dica: DIRETAMENTE proporcional = ambos aumentam juntos. INVERSAMENTE proporcional = um aumenta, o outro diminui. RAZÃO é uma divisão que compara valores (ex: 10/5 = 2)."
                    onComplete={(isCorrect) => handleExerciseComplete("proporcao-match-1", 15, isCorrect)}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Módulo 7: Porcentagem */}
            <TabsContent value="porcentagem" className="space-y-6 mt-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Exercícios de Porcentagem</h2>

              {/* FillInBlanks - Fácil */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Desconto Simples</CardTitle>
                    <Badge className={getDifficultyColor("easy")}>
                      {getDifficultyLabel("easy")} • 5 pts
                    </Badge>
                  </div>
                  <CardDescription>
                    Calcule o desconto
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FillInBlanks
                    showFeedback={true}
                    text="Uma camisa de R$ 100 está com 10% de desconto. O desconto é de R$ [blank]."
                    blanks={[{ id: "1", correctAnswer: "", acceptableAnswers: ["10", "dez"] }]}
                    onComplete={(isCorrect) => handleExerciseComplete("porcentagem-fill-1", 5, isCorrect)}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Preço Final</CardTitle>
                    <Badge className={getDifficultyColor("easy")}>
                      {getDifficultyLabel("easy")} • 5 pts
                    </Badge>
                  </div>
                  <CardDescription>
                    Calcule o preço após desconto
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FillInBlanks
                    showFeedback={true}
                    text="Um produto de R$ 50 com 20% de desconto custa R$ [blank]."
                    blanks={[{ id: "1", correctAnswer: "", acceptableAnswers: ["40", "quarenta"] }]}
                    onComplete={(isCorrect) => handleExerciseComplete("porcentagem-fill-2", 5, isCorrect)}
                  />
                </CardContent>
              </Card>

              {/* InteractiveSlider - Moderado */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Juros Simples</CardTitle>
                    <Badge className={getDifficultyColor("moderate")}>
                      {getDifficultyLabel("moderate")} • 10 pts
                    </Badge>
                  </div>
                  <CardDescription>
                    Estime o valor com juros
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <InteractiveSlider
                    label="Você investiu R$ 1.000 com juros de 5% ao mês. Após 1 mês, quanto você terá?"
                    min={1000}
                    max={1200}
                    correctValue={1050}
                    hint="Dica: Calcule 5% de 1.000 (que é 50) e some ao valor inicial. Ou pense: 100% + 5% = 105% do valor original."
                    unit="R$"
                    onSubmit={(value: number, isCorrect: boolean) => handleExerciseComplete("porcentagem-slider-1", 10, isCorrect)}
                  />
                </CardContent>
              </Card>

              {/* MatchingGame - Difícil */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Aplicações de Porcentagem</CardTitle>
                    <Badge className={getDifficultyColor("hard")}>
                      {getDifficultyLabel("hard")} • 15 pts
                    </Badge>
                  </div>
                  <CardDescription>
                    Conecte os conceitos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MatchingGame
                    pairs={[
                      { id: "1", left: "Desconto", right: "Redução no preço original" },
                      { id: "2", left: "Acréscimo", right: "Aumento sobre o valor inicial" },
                      { id: "3", left: "Juros", right: "Rendimento sobre capital investido" },
                    ]}
                    hint="Dica: DESCONTO diminui o valor (10% de desconto = pagar 90%). ACRÉSCIMO aumenta o valor (10% de acréscimo = pagar 110%). JUROS são ganhos ou pagos sobre dinheiro ao longo do tempo."
                    onComplete={(isCorrect) => handleExerciseComplete("porcentagem-match-1", 15, isCorrect)}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
