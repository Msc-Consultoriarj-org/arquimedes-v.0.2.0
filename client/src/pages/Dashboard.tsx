import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { trpc } from "@/lib/trpc";
import { BookOpen, Trophy, Zap, ArrowRight, LogOut, TrendingUp } from "lucide-react";
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

  const { data: disciplines = [] } = trpc.disciplines.list.useQuery();
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

      <div className="container py-8 space-y-8 max-w-6xl">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* XP Card */}
          <Card className="border-2 border-blue-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Zap className="h-4 w-4 text-blue-600" />
                XP & Nível
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gray-900">
                    Nível {xpData?.level || 1}
                  </span>
                  <span className="text-sm text-gray-500">
                    {xpData?.totalXP || 0} XP
                  </span>
                </div>
                <Progress value={xpProgress} className="h-2" />
                <p className="text-xs text-gray-500">
                  {xpData?.xpToNextLevel || 100} XP para próximo nível
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Points Today */}
          <Card className="border-2 border-green-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Trophy className="h-4 w-4 text-green-600" />
                Pontos Hoje
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-gray-900">
                  {pointsSummary?.today || 0}
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div>
                    <span className="font-medium">Semana:</span> {pointsSummary?.thisWeek || 0}
                  </div>
                  <div>
                    <span className="font-medium">Mês:</span> {pointsSummary?.thisMonth || 0}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Total Points */}
          <Card className="border-2 border-purple-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-purple-600" />
                Total Acumulado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-gray-900">
                  {pointsSummary?.allTime || 0}
                </div>
                <p className="text-xs text-gray-500">
                  Pontos totais conquistados
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Continue Learning */}
        {recommendation && (
          <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                Continuar Aprendendo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Link
                href={`/disciplina/${recommendation.discipline.slug}/modulo/${recommendation.module.slug}/aula/${recommendation.page.slug}`}
              >
                <div className="flex items-center justify-between p-4 rounded-lg bg-white border-2 border-blue-100 hover:border-blue-300 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${getModuleColor(recommendation.module.name)}`}>
                      {getModuleIcon(recommendation.module.name, { className: "h-6 w-6" })}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {recommendation.page.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {recommendation.discipline.name} • {recommendation.module.name}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Disciplines */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Disciplinas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {disciplines.map((discipline) => (
              <Link key={discipline.id} href={`/disciplina/${discipline.slug}`}>
                <Card className="border-2 border-gray-100 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center justify-between">
                      <span className="group-hover:text-blue-600 transition-colors">
                        {discipline.name}
                      </span>
                      <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                    </CardTitle>
                  </CardHeader>
                  {discipline.description && (
                    <CardContent className="pt-0">
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {discipline.description}
                      </p>
                    </CardContent>
                  )}
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {/* Onboarding Modal */}
      <OnboardingModal 
        isOpen={showOnboarding} 
        onComplete={() => setShowOnboarding(false)}
      />
    </div>
  );
}
