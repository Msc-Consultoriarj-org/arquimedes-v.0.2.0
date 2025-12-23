import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { trpc } from "@/lib/trpc";
import { BookOpen, Trophy, Zap, ArrowRight, TrendingUp, Calendar, Target, Sparkles, Award, Flame } from "lucide-react";
import { getModuleIcon } from "@/components/MathIcons";
import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";
import { OnboardingTour } from "@/components/OnboardingTour";
import { motion } from "framer-motion";
import { Clock } from "@/components/Clock";

// Variantes de animação
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.4 }
};

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
  const completeOnboardingMutation = trpc.user.completeOnboarding.useMutation();

  const handleOnboardingComplete = async () => {
    await completeOnboardingMutation.mutateAsync();
    setShowOnboarding(false);
  };

  const handleOnboardingSkip = async () => {
    await completeOnboardingMutation.mutateAsync();
    setShowOnboarding(false);
  };

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

  const xpTotalForNextLevel = xpData ? xpData.totalXP + xpData.xpToNextLevel : 100;
  const xpProgress = xpData ? (xpData.totalXP / xpTotalForNextLevel) * 100 : 0;
  const firstName = user?.name?.split(' ')[0] || 'Estudante';
  const greetingTime = new Date().getHours();
  const greeting = greetingTime < 12 ? 'Bom dia' : greetingTime < 18 ? 'Boa tarde' : 'Boa noite';

  return (
    <>
      <MobileNav />
      <Sidebar />
      <div className="lg:ml-72 min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      
      {/* Hero Section - Impactante */}
      <motion.div 
        className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Padrão de fundo decorativo */}
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/50 to-transparent" />
        
        <div className="container relative py-12 lg:py-16">
          <motion.div 
            className="max-w-3xl"
            {...fadeInUp}
          >
            <div className="flex items-center justify-between mb-6">
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Sparkles className="h-4 w-4 text-yellow-300" />
                <span className="text-sm font-medium text-white">Nível {xpData?.level || 1}</span>
              </motion.div>
              
              <motion.div
                className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Clock />
              </motion.div>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              {greeting}, {firstName}! 👋
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Continue sua jornada em matemática.
            </p>
            
            {/* Quick Stats no Hero */}
            <motion.div 
              className="grid grid-cols-2 lg:grid-cols-4 gap-4"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.div 
                className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"
                variants={scaleIn}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Flame className="h-5 w-5 text-orange-300" />
                  <span className="text-sm font-medium text-white/80">Sequência</span>
                </div>
                <p className="text-3xl font-bold text-white">{stats?.currentStreak || 0}</p>
                <p className="text-xs text-white/60 mt-1">dias seguidos</p>
              </motion.div>
              
              <motion.div 
                className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"
                variants={scaleIn}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="h-5 w-5 text-yellow-300" />
                  <span className="text-sm font-medium text-white/80">Pontos</span>
                </div>
                <p className="text-3xl font-bold text-white">{pointsSummary?.today || 0}</p>
                <p className="text-xs text-white/60 mt-1">hoje</p>
              </motion.div>
              
              <motion.div 
                className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"
                variants={scaleIn}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-5 w-5 text-green-300" />
                  <span className="text-sm font-medium text-white/80">Aulas</span>
                </div>
                <p className="text-3xl font-bold text-white">{stats?.completedLessons || 0}</p>
                <p className="text-xs text-white/60 mt-1">concluídas</p>
              </motion.div>
              
              <motion.div 
                className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"
                variants={scaleIn}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-5 w-5 text-yellow-300" />
                  <span className="text-sm font-medium text-white/80">XP</span>
                </div>
                <p className="text-3xl font-bold text-white">{xpData?.totalXP || 0}</p>
                <p className="text-xs text-white/60 mt-1">total</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <div className="container py-10 space-y-10">
        {/* Progresso de XP - Destaque */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-2 border-blue-200 shadow-lg bg-gradient-to-br from-white to-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Award className="h-6 w-6 text-blue-600" />
                </div>
                Progresso de Nível
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-blue-600">Nível {xpData?.level || 1}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {xpData?.totalXP || 0} / {(xpData?.totalXP || 0) + (xpData?.xpToNextLevel || 100)} XP
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Faltam</p>
                  <p className="text-2xl font-bold text-gray-700">
                    {xpData?.xpToNextLevel || 100} XP
                  </p>
                  <p className="text-xs text-muted-foreground">para o próximo nível</p>
                </div>
              </div>
              <div className="relative">
                <Progress value={xpProgress} className="h-3" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-semibold text-white drop-shadow-md">
                    {Math.round(xpProgress)}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Continuar Aprendendo - Destaque com animação */}
        {recommendation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-2 border-green-200 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-4">
                <div className="flex items-center gap-2 text-white">
                  <BookOpen className="h-5 w-5" />
                  <h3 className="text-lg font-semibold">Continuar Aprendendo</h3>
                </div>
              </div>
              <CardContent className="p-6">
                <Link
                  href={`/disciplina/${recommendation.discipline.slug}/modulo/${recommendation.module.slug}/aula/${recommendation.page.slug}`}
                >
                  <motion.div
                    className="flex items-center justify-between p-5 rounded-xl border-2 border-gray-200 hover:border-green-400 hover:bg-green-50 transition-all cursor-pointer group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 p-3 bg-green-100 rounded-xl group-hover:bg-green-200 transition-colors">
                        {getModuleIcon(recommendation.module.slug)}
                      </div>
                      <div>
                        <p className="font-bold text-lg text-gray-900">{recommendation.page.title}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {recommendation.discipline.name} • {recommendation.module.name}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="h-6 w-6 text-green-600 group-hover:translate-x-2 transition-transform" />
                  </motion.div>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Estatísticas Detalhadas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-blue-600" />
            Suas Estatísticas
          </h2>
          <motion.div 
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {/* Total de Logins */}
            <motion.div variants={scaleIn}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total de Logins</CardTitle>
                  <Calendar className="h-5 w-5 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">{stats?.totalLogins || 0}</div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Dias que você acessou
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Sequência Atual */}
            <motion.div variants={scaleIn}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Sequência</CardTitle>
                  <Flame className="h-5 w-5 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">🔥 {stats?.currentStreak || 0}</div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Dias consecutivos
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Aulas Concluídas */}
            <motion.div variants={scaleIn}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Aulas Concluídas</CardTitle>
                  <Target className="h-5 w-5 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">{stats?.completedLessons || 0}</div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Taxa de acertos: {stats?.exerciseAccuracy || 0}%
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Pontos Hoje */}
            <motion.div variants={scaleIn}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Pontos Hoje</CardTitle>
                  <Trophy className="h-5 w-5 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">{pointsSummary?.today || 0}</div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Esta semana: {pointsSummary?.thisWeek || 0}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Pontos Acumulados - Redesign */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Trophy className="h-6 w-6 text-yellow-600" />
                </div>
                Pontos Acumulados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <p className="text-sm text-muted-foreground mb-2">Hoje</p>
                  <p className="text-4xl font-bold text-yellow-600">{pointsSummary?.today || 0}</p>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <p className="text-sm text-muted-foreground mb-2">Esta Semana</p>
                  <p className="text-4xl font-bold text-orange-600">{pointsSummary?.thisWeek || 0}</p>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <p className="text-sm text-muted-foreground mb-2">Total</p>
                  <p className="text-4xl font-bold text-red-600">{pointsSummary?.allTime || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Disciplinas Inscritas */}
        {enrolledDisciplines.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-purple-600" />
              Minhas Disciplinas
            </h2>
            <motion.div 
              className="grid gap-6 md:grid-cols-2"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {enrolledDisciplines.map((discipline, index) => (
                <motion.div
                  key={discipline.id}
                  variants={scaleIn}
                  custom={index}
                >
                  <Link href={`/disciplina/${discipline.slug}`}>
                    <Card className="hover:shadow-xl transition-all cursor-pointer h-full border-2 hover:border-purple-300 group">
                      <CardHeader className="pb-4">
                        <CardTitle className="flex items-center gap-3 text-xl group-hover:text-purple-600 transition-colors">
                          <span className="text-3xl">
                            {discipline.name === "Aritmética" && "🔢"}
                            {discipline.name === "Álgebra" && "📐"}
                            {discipline.name === "Geometria" && "📏"}
                            {discipline.name === "Cálculo" && "∫"}
                          </span>
                          {discipline.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground leading-relaxed">{discipline.description}</p>
                        <div className="mt-4 flex items-center gap-2 text-purple-600 font-medium">
                          <span>Explorar</span>
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* Empty State - Nenhuma disciplina inscrita */}
        {enrolledDisciplines.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="border-2 border-dashed border-gray-300">
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <div className="p-4 bg-gray-100 rounded-full mb-4">
                  <BookOpen className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Nenhuma disciplina inscrita
                </h3>
                <p className="text-muted-foreground max-w-md mb-6">
                  Você ainda não está inscrito em nenhuma disciplina. Complete o tutorial para começar sua jornada de aprendizado!
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
      </div>

      {/* Onboarding Tour */}
      {showOnboarding && (
        <OnboardingTour
          onComplete={handleOnboardingComplete}
          onSkip={handleOnboardingSkip}
        />
      )}
    </>
  );
}
