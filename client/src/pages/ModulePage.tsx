import { useParams, Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, BookOpen, CheckCircle2, Clock } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";

export default function ModulePage() {
  const params = useParams<{ disciplineSlug: string; moduleSlug: string }>();
  const { isAuthenticated } = useAuth();

  // Fetch discipline
  const { data: discipline, isLoading: loadingDiscipline } = trpc.disciplines.getBySlug.useQuery({
    slug: params.disciplineSlug || "",
  });

  // Fetch module
  const { data: module, isLoading: loadingModule } = trpc.modules.getBySlug.useQuery(
    {
      disciplineId: discipline?.id || 0,
      slug: params.moduleSlug || "",
    },
    { enabled: !!discipline }
  );

  // Fetch pages
  const { data: pages = [], isLoading: loadingPages } = trpc.pages.listByModule.useQuery(
    { moduleId: module?.id || 0 },
    { enabled: !!module }
  );

  // Fetch progress
  const { data: allProgress = [] } = trpc.moduleProgress.getAll.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const isLoading = loadingDiscipline || loadingModule || loadingPages;

  if (isLoading) {
    return (
      <div className="container max-w-4xl py-8 space-y-6">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  if (!discipline || !module) {
    return (
      <div className="container max-w-4xl py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Módulo não encontrado</h1>
        <Button asChild>
          <Link href="/">Voltar para o início</Link>
        </Button>
      </div>
    );
  }

  // Calculate module progress
  const completedPages = pages.filter((page) =>
    allProgress.some((p) => p.pageId === page.id && p.completed)
  ).length;
  const progressPercentage = pages.length > 0 ? (completedPages / pages.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-background border-b">
        <div className="container max-w-4xl py-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-foreground">
              Início
            </Link>
            <span>/</span>
            <Link href={`/disciplina/${discipline.slug}`} className="hover:text-foreground">
              {discipline.name}
            </Link>
            <span>/</span>
            <span className="text-foreground">{module.name}</span>
          </div>

          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link href={`/disciplina/${discipline.slug}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para {discipline.name}
            </Link>
          </Button>

          <h1 className="text-3xl font-bold mb-2">{module.name}</h1>
          {module.description && (
            <p className="text-lg text-muted-foreground">{module.description}</p>
          )}

          {isAuthenticated && pages.length > 0 && (
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progresso do Módulo</span>
                <span className="font-medium">
                  {completedPages} de {pages.length} aulas concluídas
                </span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
          )}
        </div>
      </div>

      {/* Pages List */}
      <div className="container max-w-4xl py-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-6">Aulas do Módulo</h2>
          {pages.map((page, index) => {
            const pageProgress = allProgress.find((p) => p.pageId === page.id);
            const isCompleted = pageProgress?.completed || false;

            return (
              <Card
                key={page.id}
                className={`hover:shadow-md transition-shadow ${
                  isCompleted ? "border-green-200 dark:border-green-800" : ""
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-muted-foreground">
                          Aula {index + 1}
                        </span>
                        {isCompleted && (
                          <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                            <CheckCircle2 className="h-4 w-4" />
                            <span className="text-sm">Concluído</span>
                          </div>
                        )}
                      </div>
                      <CardTitle className="text-xl">{page.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-2">
                        <Clock className="h-4 w-4" />
                        <span>{page.estimatedMinutes} minutos</span>
                      </CardDescription>
                    </div>
                    <Button asChild>
                      <Link
                        href={`/disciplina/${discipline.slug}/modulo/${module.slug}/aula/${page.slug}`}
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        {isCompleted ? "Revisar" : "Começar"}
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                {pageProgress && pageProgress.score > 0 && (
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">Pontuação:</span>
                      <span className="font-medium">{pageProgress.score}%</span>
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
