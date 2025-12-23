import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { BookOpen, Target, TrendingUp, Award, ArrowRight, LogOut, Sparkles } from "lucide-react";
import { getModuleIcon, getModuleColor } from "@/components/MathIcons";
import { Link } from "wouter";

export default function Home() {
  const { user, isAuthenticated, logout } = useAuth();

  const { data: disciplines = [] } = trpc.disciplines.list.useQuery();
  const { data: dashboard } = trpc.dashboard.summary.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  const { data: recommendation } = trpc.dashboard.recommendations.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => {
      logout();
      window.location.reload();
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Hero Section */}
      <div className="gradient-primary text-primary-foreground relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl" />
        </div>
        <div className="container py-16 md:py-24 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-lg">
              Arquimedes: Matemática Descomplicada
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/95 drop-shadow-md">
              Aprenda matemática básica de forma clara, prática e sem infantilização. 
              Educação de qualidade para adultos.
            </p>
            <div className="flex flex-wrap gap-4">
              {!isAuthenticated ? (
                <Button size="lg" variant="secondary" asChild>
                  <a href={getLoginUrl()}>
                    Começar Agora
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              ) : (
              <div className="flex items-center gap-4">
                <p className="text-lg">Bem-vindo, {user?.name || user?.email}!</p>
                <Button variant="secondary" onClick={() => logoutMutation.mutate()}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </Button>
              </div>
              )}
              <Link href="/visuals">
                <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 border-white/30">
                  🎨 Visualizações Interativas
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-12 space-y-12">
        {/* Dashboard for authenticated users */}
        {isAuthenticated && dashboard && (
          <div className="grid gap-6 md:grid-cols-3 animate-fade-in">
            <Card className="shadow-lg border-none hover:shadow-xl transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Aulas Concluídas</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboard.completedPages}</div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-none hover:shadow-xl transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pontuação Média</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboard.averageScore}%</div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-none hover:shadow-xl transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conquistas</CardTitle>
                <Award className="h-4 w-4 text-amber-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboard.totalAchievements}</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Next Recommended Lesson */}
        {isAuthenticated && recommendation && (
          <Card className="shadow-lg border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Próxima Aula Recomendada
              </CardTitle>
              <CardDescription>Continue de onde parou</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{recommendation.discipline.name}</p>
                <h3 className="text-xl font-semibold">{recommendation.module.name}</h3>
                <p className="text-lg">{recommendation.page.title}</p>
                <Button asChild className="mt-4">
                  <Link
                    href={`/disciplina/${recommendation.discipline.slug}/modulo/${recommendation.module.slug}/aula/${recommendation.page.slug}`}
                  >
                    Continuar Aprendendo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Disciplines Section */}
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">Disciplinas Disponíveis</h2>
            <p className="text-muted-foreground">
              Escolha uma disciplina para começar sua jornada de aprendizado
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {disciplines.map((discipline) => (
              <DisciplineCard key={discipline.id} discipline={discipline} />
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="grid gap-8 md:grid-cols-3 pt-12">
          <div className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Conteúdo Estruturado</h3>
            <p className="text-muted-foreground">
              Aulas organizadas em módulos progressivos, do básico ao avançado
            </p>
          </div>

          <div className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Exercícios Práticos</h3>
            <p className="text-muted-foreground">
              Pratique com exercícios contextualizados e receba feedback imediato
            </p>
          </div>

          <div className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Acompanhe seu Progresso</h3>
            <p className="text-muted-foreground">
              Veja seu desenvolvimento e conquiste marcos de aprendizado
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DisciplineCard({ discipline }: { discipline: { id: number; name: string; slug: string; description: string | null } }) {
  const { data: modules = [] } = trpc.modules.listByDiscipline.useQuery({
    disciplineId: discipline.id,
  });

  return (
    <Card className="hover:shadow-xl hover:-translate-y-1 transition-all duration-200 border-none shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl">{discipline.name}</CardTitle>
        {discipline.description && (
          <CardDescription className="text-base">{discipline.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            {modules.length} módulos disponíveis
          </p>
          {modules.slice(0, 3).map((module) => (
            <div key={module.id} className="flex items-center gap-3 text-sm p-2 rounded-lg hover:bg-muted/50 transition-colors">
              <div className={getModuleColor(module.name)}>
                {getModuleIcon(module.name, { size: 20 })}
              </div>
              <span className="font-medium">{module.name}</span>
            </div>
          ))}
        </div>
        <Button asChild className="w-full">
          <Link href={`/disciplina/${discipline.slug}`}>
            Explorar Disciplina
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
