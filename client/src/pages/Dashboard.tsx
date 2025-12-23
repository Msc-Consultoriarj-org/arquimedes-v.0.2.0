import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { trpc } from "@/lib/trpc";
import { BookOpen, Trophy, Zap, ArrowRight, LogOut, TrendingUp, Calendar, Target, Award } from "lucide-react";
import { getModuleIcon, getModuleColor } from "@/components/MathIcons";
import { MobileNav } from "@/components/MobileNav";
import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";
import OnboardingModal from "@/components/OnboardingModal";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const { data: user, isLoading: isLoadingAuth } = trpc.auth.me.useQuery();
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  const isAuthenticated = !!user;

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoadingAuth && !isAuthenticated) {
      setLocation("/login");
    }
  }, [isAuthenticated, isLoadingAuth, setLocation]);
  
  // Mostrar onboarding para novos usuários
  useEffect(() => {
    if (user && !user.hasCompletedOnboarding) {
      setShowOnboarding(true);
    }
  }, [user]);

  const { data: enrolledDisciplines = [] } = trpc.enrollments.list.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  
  const { data: stats } = trpc.dashboard.stats.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  
  const { data: xpData } = trpc.gamification.xp.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  
  const { data: pointsSummary } = trpc.points.getSummary.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  
  const { data: recommendation } = trpc.dashboard.recommendations.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const checkDailyLoginMutation = trpc.points.checkDailyLogin.useMutation();

  // Check daily login points on mount
  useEffect(() => {
    if (isAuthenticated) {
      checkDailyLoginMutation.mutate();
    }
  }, [isAuthenticated]);

  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => {
      setLocation("/login");
    },
  });

  if (!isAuthenticated) {
    return null; // Will redirect via useEffect
  }

  const xpProgress = xpData ? (xpData.totalXP / xpData.xpToNextLevel) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <MobileNav />
      
      {/* Header minimalista */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Arquimedes</h1>
            <p className="text-sm text-gray-600">Olá, {user?.name?.split(' ')[0] || 'Estudante'}!</p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => logoutMutation.mutate()}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="container py-8 space-y-8">
        {/* Métricas Práticas de Desempenho */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* XP & Nível */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">XP & Nível</CardTitle>
              <Zap className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Nível {xpData?.level || 1}</div>
              <Progress value={xpProgress} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">
                {xpData?.totalXP || 0} / {xpData?.xpToNextLevel || 100} XP
              </p>
            </CardContent>
          </Card>

          {/* Total de Logins */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Logins</CardTitle>
              <Calendar className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalLogins || 0}</div>
              <p className="text-xs text-muted-foreground mt-2">
                Dias que você acessou
              </p>
            </CardContent>
          </Card>

          {/* Sequência Atual */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sequência</CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">🔥 {stats?.currentStreak || 0}</div>
              <p className="text-xs text-muted-foreground mt-2">
                Dias consecutivos
              </p>
            </CardContent>
          </Card>

          {/* Aulas Concluídas */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aulas Concluídas</CardTitle>
              <Target className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.completedLessons || 0}</div>
              <p className="text-xs text-muted-foreground mt-2">
                Taxa de acertos: {stats?.exerciseAccuracy || 0}%
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Pontos Acumulados */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              Pontos Acumulados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-sm text-muted-foreground">Hoje</p>
                <p className="text-2xl font-bold">{pointsSummary?.today || 0}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Esta Semana</p>
                <p className="text-2xl font-bold">{pointsSummary?.thisWeek || 0}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{pointsSummary?.allTime || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Continuar Aprendendo */}
        {recommendation && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Continuar Aprendendo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Link
                href={`/disciplina/${recommendation.discipline.slug}/modulo/${recommendation.module.slug}/aula/${recommendation.page.slug}`}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    {getModuleIcon(recommendation.module.slug)}
                  </div>
                  <div>
                    <p className="font-semibold">{recommendation.page.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {recommendation.discipline.name} • {recommendation.module.name}
                    </p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Disciplinas Inscritas */}
        {enrolledDisciplines.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Minhas Disciplinas</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {enrolledDisciplines.map((discipline) => (
                <Link
                  key={discipline.id}
                  href={`/disciplina/${discipline.slug}`}
                >
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {discipline.name === "Aritmética" && "🔢"}
                        {discipline.name === "Álgebra" && "📐"}
                        {discipline.name === "Geometria" && "📏"}
                        {discipline.name === "Cálculo" && "∫"}
                        {discipline.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{discipline.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Mensagem se não tiver disciplinas inscritas */}
        {enrolledDisciplines.length === 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Nenhuma disciplina inscrita</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Você ainda não está inscrito em nenhuma disciplina. Complete o tutorial para começar!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
      
      {/* Onboarding Modal */}
      <OnboardingModal 
        isOpen={showOnboarding} 
        onComplete={() => setShowOnboarding(false)}
      />
    </div>
  );
}
