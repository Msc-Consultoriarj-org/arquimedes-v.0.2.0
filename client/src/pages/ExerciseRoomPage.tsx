import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { CheckCircle2, XCircle, Trophy, Target, TrendingUp, BookOpen } from "lucide-react";

export default function ExerciseRoomPage() {
  const [currentAnswer, setCurrentAnswer] = useState<Record<number, string>>({});
  const [feedback, setFeedback] = useState<Record<number, { isCorrect: boolean; points: number }>>({});

  // Queries
  const { data: disciplines } = trpc.disciplines.list.useQuery();
  const aritmeticaId = disciplines?.find((d) => d.slug === "aritmetica")?.id;
  
  const { data: modules } = trpc.modules.listByDiscipline.useQuery(
    { disciplineId: aritmeticaId! },
    { enabled: !!aritmeticaId }
  );
  
  const { data: allExercises } = trpc.standaloneExercises.getAll.useQuery();
  const { data: stats } = trpc.standaloneExercises.getStats.useQuery();

  // Mutations
  const submitMutation = trpc.standaloneExercises.submit.useMutation({
    onSuccess: (data, variables) => {
      setFeedback((prev) => ({ ...prev, [variables.exerciseId]: { isCorrect: data.isCorrect, points: data.points } }));
      setCurrentAnswer((prev) => ({ ...prev, [variables.exerciseId]: "" }));
      
      // Refetch stats after submission
      setTimeout(() => {
        trpc.useUtils().standaloneExercises.getStats.invalidate();
      }, 500);
    },
  });

  // Group exercises by module
  const exercisesByModule = modules?.map((module) => ({
    module,
    exercises: allExercises?.filter((ex) => ex.moduleId === module.id) || [],
  })) || [];

  const handleSubmit = (exerciseId: number) => {
    const answer = parseInt(currentAnswer[exerciseId] || "");
    if (isNaN(answer)) {
      alert("Por favor, insira um número válido");
      return;
    }
    submitMutation.mutate({ exerciseId, userAnswer: answer });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "text-green-600 bg-green-50 border-green-200";
      case "moderate":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "hard":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "Fácil";
      case "moderate":
        return "Moderado";
      case "hard":
        return "Difícil";
      default:
        return difficulty;
    }
  };

  // Helper para fazer parse seguro de options
  const parseOptions = (options: any): string[] => {
    if (Array.isArray(options)) return options;
    if (typeof options === 'string') {
      try {
        const parsed = JSON.parse(options);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return [];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Sala de Exercícios</h1>
          <p className="text-lg text-gray-600">
            Pratique suas habilidades matemáticas organizadas por módulo
          </p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Total de Tentativas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-blue-600">{stats.totalAttempts}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Acertos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-600">{stats.correctAnswers}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Taxa de Acerto
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-purple-600">{stats.accuracy}%</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Modules Tabs */}
        {modules && modules.length > 0 ? (
          <Tabs defaultValue={modules[0]?.id.toString()} className="w-full">
            <TabsList className="w-full flex-wrap h-auto gap-2 bg-white p-2 rounded-lg shadow-sm">
              {modules.map((module) => {
                const exerciseCount = allExercises?.filter((ex) => ex.moduleId === module.id).length || 0;
                return (
                  <TabsTrigger
                    key={module.id}
                    value={module.id.toString()}
                    className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    <BookOpen className="h-4 w-4" />
                    {module.name}
                    <span className="ml-1 text-xs opacity-75">({exerciseCount})</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {exercisesByModule.map(({ module, exercises }) => (
              <TabsContent key={module.id} value={module.id.toString()} className="mt-6">
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-2xl">{module.name}</CardTitle>
                    <CardDescription>{module.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      {exercises.length} exercício{exercises.length !== 1 ? "s" : ""} disponível
                      {exercises.length !== 1 ? "is" : ""}
                    </p>
                  </CardContent>
                </Card>

                {/* Exercises Grid */}
                <div className="grid grid-cols-1 gap-6">
                  {exercises.length > 0 ? (
                    exercises.map((exercise) => {
                      const hasFeedback = feedback[exercise.id];
                      const isCorrect = hasFeedback && feedback[exercise.id].isCorrect;
                      const isIncorrect = hasFeedback && !feedback[exercise.id].isCorrect;

                      return (
                        <Card
                          key={exercise.id}
                          className={`transition-all ${
                            isCorrect
                              ? "border-green-500 bg-green-50"
                              : isIncorrect
                              ? "border-red-500 bg-red-50"
                              : ""
                          }`}
                        >
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <CardTitle className="text-xl mb-2">{exercise.question}</CardTitle>
                                <div className="flex items-center gap-2">
                                  <span
                                    className={`inline-block px-3 py-1 text-sm font-medium rounded-full border ${getDifficultyColor(
                                      exercise.difficulty
                                    )}`}
                                  >
                                    {getDifficultyLabel(exercise.difficulty)}
                                  </span>
                                  <span className="inline-flex items-center gap-1 text-sm text-gray-600">
                                    <Trophy className="h-4 w-4" />
                                    {exercise.points} pontos
                                  </span>
                                </div>
                              </div>
                            </div>
                          </CardHeader>

                          <CardContent>
                            <div className="space-y-4">
                              {/* Options */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {parseOptions(exercise.options).map((option: string, index: number) => (
                                  <div
                                    key={index}
                                    className="p-3 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition-colors"
                                  >
                                    <span className="font-medium text-gray-700">
                                      {String.fromCharCode(65 + index)}) {option}
                                    </span>
                                  </div>
                                ))}
                              </div>

                              {/* Answer Input */}
                              {!hasFeedback && (
                                <div className="flex flex-col sm:flex-row gap-3">
                                  <Input
                                    type="number"
                                    placeholder="Digite sua resposta..."
                                    value={currentAnswer[exercise.id] || ""}
                                    onChange={(e) =>
                                      setCurrentAnswer((prev) => ({ ...prev, [exercise.id]: e.target.value }))
                                    }
                                    className="flex-1"
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") {
                                        handleSubmit(exercise.id);
                                      }
                                    }}
                                  />
                                  <Button
                                    onClick={() => handleSubmit(exercise.id)}
                                    disabled={submitMutation.isPending || !currentAnswer[exercise.id]}
                                    className="w-full sm:w-auto"
                                  >
                                    {submitMutation.isPending ? "Enviando..." : "Enviar Resposta"}
                                  </Button>
                                </div>
                              )}

                              {/* Feedback */}
                              {hasFeedback && (
                                <div
                                  className={`flex items-center gap-2 p-4 rounded-lg ${
                                    isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {isCorrect ? (
                                    <>
                                      <CheckCircle2 className="h-5 w-5" />
                                      <span className="font-medium">
                                        Correto! +{feedback[exercise.id].points} pontos
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      <XCircle className="h-5 w-5" />
                                      <span className="font-medium">Incorreto. Tente novamente!</span>
                                    </>
                                  )}
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })
                  ) : (
                    <Card>
                      <CardContent className="py-12 text-center">
                        <p className="text-gray-500">Nenhum exercício disponível para este módulo ainda.</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-500">Carregando módulos...</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
