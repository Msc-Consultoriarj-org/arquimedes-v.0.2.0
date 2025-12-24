import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sidebar } from "@/components/Sidebar";
import { CheckCircle2, Trophy, Target, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";

export default function ExercisesCompletedPage() {
  const [, setLocation] = useLocation();
  const { data: user, isLoading: isLoadingAuth } = trpc.auth.me.useQuery();
  const isAuthenticated = !!user;

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoadingAuth && !isAuthenticated) {
      setLocation("/login");
    }
  }, [isAuthenticated, isLoadingAuth, setLocation]);

  // Query exercícios completados (Sala de Exercícios)
  const { data: completedStandalone = [] } = trpc.standaloneExercises.getCompletedDetailed.useQuery();
  
  // Query exercícios interativos completados
  const { data: completedInteractive = [] } = trpc.standaloneExercises.getCompletedInteractive.useQuery();

  // Buscar detalhes dos exercícios
  const { data: allStandaloneExercises = [] } = trpc.standaloneExercises.getAll.useQuery();

  // Estatísticas
  const totalCompleted = completedStandalone.length + completedInteractive.length;
  const totalCorrect = completedStandalone.filter(e => e.isCorrect).length + completedInteractive.length;
  const accuracy = totalCompleted > 0 ? Math.round((totalCorrect / totalCompleted) * 100) : 0;
  
  // Calcular pontos totais
  const pointsFromStandalone = completedStandalone.reduce((sum, completion) => {
    const exercise = allStandaloneExercises.find(ex => ex.id === completion.exerciseId);
    return sum + (exercise?.points || 0);
  }, 0);
  
  const pointsFromInteractive = completedInteractive.reduce((sum, ex) => sum + (ex.pointsEarned || 0), 0);
  const totalPoints = pointsFromStandalone + pointsFromInteractive;

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

  if (!isAuthenticated) {
    return null;
  }

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
              <CheckCircle2 className="w-8 h-8 text-green-600" />
              <h1 className="text-4xl font-bold">Exercícios Resolvidos</h1>
            </div>
            <p className="text-muted-foreground">
              Revise todos os exercícios que você já completou
            </p>
          </motion.div>

          {/* Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Completados</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{totalCompleted}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {completedStandalone.length} estáticos + {completedInteractive.length} interativos
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pontos Ganhos</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{totalPoints}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {pointsFromStandalone} estáticos + {pointsFromInteractive} interativos
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taxa de Acerto</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{accuracy}%</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {totalCorrect} de {totalCompleted} corretos
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="standalone" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="standalone">
                Sala de Exercícios ({completedStandalone.length})
              </TabsTrigger>
              <TabsTrigger value="interactive">
                Exercícios Interativos ({completedInteractive.length})
              </TabsTrigger>
            </TabsList>

            {/* Sala de Exercícios Completados */}
            <TabsContent value="standalone">
              {completedStandalone.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Você ainda não completou nenhum exercício da Sala de Exercícios
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {completedStandalone.map((completion) => {
                    const exercise = allStandaloneExercises.find(ex => ex.id === completion.exerciseId);
                    if (!exercise) return null;

                    return (
                      <Card key={completion.exerciseId} className="hover:shadow-md transition-shadow">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <CardTitle className="text-lg flex items-center gap-2">
                                {completion.isCorrect ? (
                                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                                ) : (
                                  <span className="text-red-600">✗</span>
                                )}
                                {exercise.title}
                              </CardTitle>
                              <CardDescription className="mt-2">
                                {exercise.question}
                              </CardDescription>
                            </div>
                            <div className="flex flex-col gap-2 items-end ml-4">
                              {getDifficultyBadge(exercise.difficulty)}
                              <Badge variant="outline">{exercise.points} pts</Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="text-sm">
                              <span className="font-medium">Sua resposta: </span>
                              <span className={completion.isCorrect ? "text-green-600" : "text-red-600"}>
                                {Array.isArray(exercise.options) && (exercise.options as string[])[completion.selectedAnswer || 0]}
                              </span>
                            </div>
                            {!completion.isCorrect && (
                              <div className="text-sm">
                                <span className="font-medium">Resposta correta: </span>
                                <span className="text-green-600">
                                  {exercise.correctAnswer !== null && Array.isArray(exercise.options) && (exercise.options as string[])[parseInt(exercise.correctAnswer)]}
                                </span>
                              </div>
                            )}
                            {exercise.hint && (
                              <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                                <p className="text-sm font-medium mb-1">Explicação:</p>
                                <p className="text-sm text-muted-foreground">{exercise.hint}</p>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </TabsContent>

            {/* Exercícios Interativos Completados */}
            <TabsContent value="interactive">
              {completedInteractive.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Você ainda não completou nenhum exercício interativo
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {completedInteractive.map((exercise) => (
                    <Card key={exercise.uniqueId} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg flex items-center gap-2">
                              <CheckCircle2 className="h-5 w-5 text-green-600" />
                              Exercício Interativo
                            </CardTitle>
                            <CardDescription className="mt-2">
                              ID: {exercise.uniqueId}
                            </CardDescription>
                          </div>
                          <Badge variant="outline">{exercise.pointsEarned || 0} pts</Badge>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
