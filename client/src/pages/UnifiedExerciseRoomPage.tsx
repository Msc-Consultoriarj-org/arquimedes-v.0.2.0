import { useState, useEffect, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Sidebar } from "@/components/Sidebar";
import { Target, Trophy, TrendingUp, Search, Filter, Sparkles, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { ExerciseCard } from "@/components/ExerciseCard";

export default function UnifiedExerciseRoomPage() {

  const [activeModule, setActiveModule] = useState("1");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterDifficulty, setFilterDifficulty] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [answeredExercises, setAnsweredExercises] = useState<Record<number, { correct: boolean; selectedIdx: number }>>({}); // Rastrear respostas

  // Queries
  const { data: modules } = trpc.modules.listByDiscipline.useQuery({ disciplineId: 1 }); // 1 = Aritmética
  const { data: exercises, isLoading, refetch } = trpc.standaloneExercises.getByModule.useQuery(
    { moduleId: parseInt(activeModule) },
    { enabled: !!activeModule }
  );

  // Mutations
  const addPointsMutation = trpc.points.addPoints.useMutation();
  const awardXPMutation = trpc.gamification.awardXP.useMutation();
  const markCompleteMutation = trpc.standaloneExercises.markComplete.useMutation();
  
  // Query de exercícios completados (IDs apenas)
  const { data: completedExercises = [] } = trpc.standaloneExercises.getCompleted.useQuery();
  
  // Query de exercícios completados com detalhes (para restaurar estado visual)
  const { data: completedDetails = [] } = trpc.standaloneExercises.getCompletedDetailed.useQuery();
  
  // Inicializar estado de exercícios respondidos a partir do banco de dados
  useEffect(() => {
    if (completedDetails.length > 0) {
      const initialState: Record<number, { correct: boolean; selectedIdx: number }> = {};
      completedDetails.forEach(detail => {
        if (detail.selectedAnswer !== null) {
          initialState[detail.exerciseId] = {
            correct: detail.isCorrect,
            selectedIdx: detail.selectedAnswer
          };
        }
      });
      setAnsweredExercises(initialState);
    }
  }, [completedDetails]);

  // IDs dos exercícios completados
  const completedIds = new Set(completedDetails.map(d => d.exerciseId));

  // Filtrar exercícios (remover completados)
  const filteredExercises = exercises?.filter((ex) => {
    const isCompleted = completedIds.has(ex.id);
    const matchesType = filterType === "all" || ex.exerciseType === filterType;
    const matchesDifficulty = filterDifficulty === "all" || ex.difficulty === filterDifficulty;
    const matchesSearch = searchQuery === "" || 
      ex.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.question.toLowerCase().includes(searchQuery.toLowerCase());
    return !isCompleted && matchesType && matchesDifficulty && matchesSearch;
  }) || [];

  // Estatísticas calculadas a partir dos exercícios completados
  const stats = useMemo(() => {
    const completed = completedDetails.length;
    const correct = completedDetails.filter(d => d.isCorrect).length;
    
    // Calcular pontos ganhos: somar pointsEarned de cada exercício
    // Se pointsEarned for NULL (exercícios antigos), usar pontos padrão do exercício
    let pointsGained = 0;
    completedDetails.forEach(detail => {
      // Buscar o exercício correspondente para pegar os pontos
      const exercise = exercises?.find(ex => ex.id === detail.exerciseId);
      if (exercise) {
        pointsGained += exercise.points;
      }
    });
    
    const accuracy = completed > 0 ? Math.round((correct / completed) * 100) : 0;
    
    return {
      completed,
      pointsGained,
      accuracy,
    };
  }, [completedDetails, exercises]);

  // Handler para resposta de exercício
  const handleAnswer = async (exerciseId: number, selectedIdx: number, correctIdx: number, points: number) => {
    // Prevenir responder novamente
    if (answeredExercises[exerciseId]) return;

    const isCorrect = selectedIdx === correctIdx;
    
    // Marcar como respondido
    setAnsweredExercises(prev => ({
      ...prev,
      [exerciseId]: { correct: isCorrect, selectedIdx }
    }));

    if (isCorrect) {
      try {
        // Adicionar pontos
        await addPointsMutation.mutateAsync({
          action: "exercise_completed",
          points,
          relatedId: exerciseId,
        });
        
        // Adicionar XP (+5 XP por exercício)
        await awardXPMutation.mutateAsync({
          amount: 5,
          reason: "Exercício completado",
          relatedId: exerciseId,
        });
        
        // Marcar como completado (com selectedAnswer)
        await markCompleteMutation.mutateAsync({
          exerciseId,
          isCorrect: true,
          selectedAnswer: selectedIdx,
        });
        
        // Verificar se módulo foi completado (backend fará a verificação e creditará bônus)
        // A lógica de verificação será chamada no backend automaticamente
        
        toast.success(`✅ Resposta Correta! +${points} pontos +5 XP`);
      } catch (error) {
        console.error("Erro ao adicionar pontos:", error);
        toast.error("❌ Erro ao salvar pontos");
      }
    } else {
      toast.error("❌ Resposta incorreta. Veja a explicação abaixo!");
    }
  };

  // Badges de dificuldade
  const getDifficultyBadge = (difficulty: string) => {
    const variants: Record<string, { color: string; label: string }> = {
      easy: { color: "bg-green-500", label: "Fácil" },
      moderate: { color: "bg-yellow-500", label: "Médio" },
      hard: { color: "bg-red-500", label: "Difícil" },
    };
    const variant = variants[difficulty] || variants.easy;
    return <Badge className={`${variant.color} text-white`}>{variant.label}</Badge>;
  };

  // Badges de tipo
  const getTypeBadge = (type: string) => {
    const labels: Record<string, string> = {
      multiple_choice: "Múltipla Escolha",
      fill_blanks: "Preencher Lacunas",
      slider: "Estimativa",
      matching: "Conectar",
    };
    return <Badge variant="outline">{labels[type] || type}</Badge>;
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 lg:ml-72">
        <div className="container mx-auto py-8 px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-8 h-8 text-primary" />
              <h1 className="text-4xl font-bold">Sala de Exercícios</h1>
            </div>
            <p className="text-muted-foreground">
              Pratique com exercícios interativos e ganhe pontos!
            </p>
          </motion.div>

          {/* Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Exercícios Completados</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{stats.completed}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pontos Ganhos</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{stats.pointsGained}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taxa de Acerto</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{stats.accuracy}%</div>
              </CardContent>
            </Card>
          </div>

          {/* Filtros */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filtros
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Busca */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar exercícios..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Filtro por tipo */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Tipo de Exercício</label>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os Tipos</SelectItem>
                      <SelectItem value="multiple_choice">Múltipla Escolha</SelectItem>
                      <SelectItem value="fill_blanks">Preencher Lacunas</SelectItem>
                      <SelectItem value="slider">Estimativa</SelectItem>
                      <SelectItem value="matching">Conectar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Filtro por dificuldade */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Dificuldade</label>
                  <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as Dificuldades</SelectItem>
                      <SelectItem value="easy">Fácil</SelectItem>
                      <SelectItem value="moderate">Médio</SelectItem>
                      <SelectItem value="hard">Difícil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Contador de resultados */}
              <div className="text-sm text-muted-foreground">
                {filteredExercises.length} exercício(s) encontrado(s)
              </div>
            </CardContent>
          </Card>

          {/* Tabs por Módulo */}
          <Tabs value={activeModule} onValueChange={setActiveModule}>
            <TabsList className="flex flex-wrap gap-2 h-auto bg-transparent mb-6">
              {modules?.map((module) => (
                <TabsTrigger
                  key={module.id}
                  value={module.id.toString()}
                  className="whitespace-nowrap flex-shrink-0"
                >
                  {module.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {modules?.map((module) => (
              <TabsContent key={module.id} value={module.id.toString()}>
                {isLoading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Carregando exercícios...</p>
                  </div>
                ) : filteredExercises.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Nenhum exercício encontrado com os filtros aplicados.</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredExercises.map((exercise) => {
                      const isCompleted = completedExercises.includes(exercise.id);
                      return (
                      <Card key={exercise.id} className={`hover:shadow-lg transition-shadow ${isCompleted ? 'border-green-500 border-2' : ''}`}>
                        <CardHeader>
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <CardTitle className="text-lg flex items-center gap-2">
                              {exercise.title}
                              {isCompleted && (
                                <Badge className="bg-green-500 text-white">
                                  ✓ Concluído
                                </Badge>
                              )}
                            </CardTitle>
                            <div className="flex gap-2 flex-shrink-0">
                              {getDifficultyBadge(exercise.difficulty)}
                              <Badge variant="secondary">{exercise.points} pts</Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getTypeBadge(exercise.exerciseType)}
                            {exercise.uniqueId && (
                              <Badge variant="outline" className="text-xs">
                                {exercise.uniqueId}
                              </Badge>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <p className="text-base">{exercise.question}</p>
                            
                            {exercise.exerciseType === "multiple_choice" && exercise.options && (
                              <div className="grid gap-2">
                                {(typeof exercise.options === 'string' ? JSON.parse(exercise.options) : exercise.options as string[]).map((option: string, idx: number) => {
                                  const correctIdx = parseInt(exercise.correctAnswer || "0");
                                  const answered = answeredExercises[exercise.id];
                                  const isThisSelected = answered?.selectedIdx === idx;
                                  const isThisCorrect = idx === correctIdx;
                                  
                                  // Determinar estilo do botão
                                  let buttonClass = "justify-start text-left h-auto py-3 px-4";
                                  if (answered) {
                                    if (isThisSelected && answered.correct) {
                                      buttonClass += " bg-green-500 text-white hover:bg-green-600 border-green-600";
                                    } else if (isThisSelected && !answered.correct) {
                                      buttonClass += " bg-red-500 text-white hover:bg-red-600 border-red-600";
                                    } else if (isThisCorrect && !answered.correct) {
                                      buttonClass += " bg-green-100 border-green-500 text-green-700";
                                    } else {
                                      buttonClass += " opacity-50";
                                    }
                                  } else {
                                    buttonClass += " hover:bg-primary/10";
                                  }
                                  
                                  return (
                                    <Button
                                      key={idx}
                                      variant="outline"
                                      className={buttonClass}
                                      disabled={!!answered}
                                      onClick={() => handleAnswer(exercise.id, idx, correctIdx, exercise.points)}
                                    >
                                      <span className="mr-2 font-bold">{String.fromCharCode(65 + idx)})</span>
                                      {option}
                                      {answered && isThisCorrect && !isThisSelected && " ✅"}
                                    </Button>
                                  );
                                })}
                              </div>
                            )}
                            
                            {exercise.stepByStepExplanation && (
                              <details className="mt-4">
                                <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                                  💡 Ver explicação passo-a-passo
                                </summary>
                                <div className="mt-2 p-4 bg-muted/50 rounded-lg text-sm whitespace-pre-wrap">
                                  {exercise.stepByStepExplanation}
                                </div>
                              </details>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                    })}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
