import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MathContent } from "@/components/MathContent";
import { ExerciseCard } from "@/components/ExerciseCard";
import { ArrowLeft, ArrowRight, BookOpen, Clock, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/_core/hooks/useAuth";
import { SEO } from "@/components/SEO";
import { MobileNav } from "@/components/MobileNav";

export default function LessonPage() {
  const params = useParams<{ disciplineSlug: string; moduleSlug: string; pageSlug: string }>();
  const [, navigate] = useLocation();
  const { user, isAuthenticated } = useAuth();
  
  const [completedExercises, setCompletedExercises] = useState<Set<number>>(new Set());

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

  // Fetch page
  const { data: page, isLoading: loadingPage } = trpc.pages.getBySlug.useQuery(
    {
      moduleId: module?.id || 0,
      slug: params.pageSlug || "",
    },
    { enabled: !!module }
  );

  // Fetch exercises
  const { data: exercises = [], isLoading: loadingExercises } = trpc.exercises.listByPage.useQuery(
    { pageId: page?.id || 0 },
    { enabled: !!page }
  );

  // Fetch progress
  const { data: progress } = trpc.moduleProgress.getByPage.useQuery(
    { pageId: page?.id || 0 },
    { enabled: !!page && isAuthenticated }
  );

  // Fetch all pages in module for navigation
  const { data: allPages = [] } = trpc.pages.listByModule.useQuery(
    { moduleId: module?.id || 0 },
    { enabled: !!module }
  );

  const updateProgressMutation = trpc.moduleProgress.updatePage.useMutation({
    onSuccess: () => {
      toast.success("Progresso salvo!");
    },
  });

  // Mark page as accessed
  useEffect(() => {
    if (page && isAuthenticated) {
      updateProgressMutation.mutate({
        pageId: page.id,
      });
    }
  }, [page?.id, isAuthenticated]);

  const handleExerciseComplete = (exerciseId: number, isCorrect: boolean) => {
    if (isCorrect) {
      setCompletedExercises((prev) => {
        const newSet = new Set(prev);
        newSet.add(exerciseId);
        return newSet;
      });
    }
  };

  const handleMarkComplete = () => {
    if (!page) return;

    const allExercisesCompleted = exercises.every((ex) => completedExercises.has(ex.id));
    const score = allExercisesCompleted ? 100 : Math.round((completedExercises.size / exercises.length) * 100);

    updateProgressMutation.mutate({
      pageId: page.id,
      completed: true,
      score,
    });
  };

  // Find next and previous pages
  const currentIndex = allPages.findIndex((p) => p.id === page?.id);
  const previousPage = currentIndex > 0 ? allPages[currentIndex - 1] : null;
  const nextPage = currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null;

  const isLoading = loadingDiscipline || loadingModule || loadingPage;

  if (isLoading) {
    return (
      <div className="container max-w-4xl py-8 space-y-6">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (!discipline || !module || !page) {
    return (
      <div className="container max-w-4xl py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Página não encontrada</h1>
        <Button asChild>
          <Link href="/">Voltar para o início</Link>
        </Button>
      </div>
    );
  }

  // SEO dinâmico
  const seoTitle = page ? `${page.title} - ${module?.name}` : 'Carregando...';
  const seoDescription = page?.mainText?.substring(0, 155) || 'Aprenda matemática de forma clara e prática.';
  const seoKeywords = `${page?.title}, ${module?.name}, ${discipline?.name}, matemática, aula online`;

  return (
    <>
      <MobileNav />
      <SEO 
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        canonical={`https://arquimedes.manus.space/disciplina/${discipline.slug}/modulo/${module.slug}/aula/${page.slug}`}
      />
      <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-background border-b">
        <div className="container max-w-4xl py-4 sm:py-6">
          <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 overflow-x-auto whitespace-nowrap pb-2">
            <Link href="/" className="hover:text-foreground">
              Início
            </Link>
            <span>/</span>
            <Link href={`/disciplina/${discipline.slug}`} className="hover:text-foreground">
              {discipline.name}
            </Link>
            <span>/</span>
            <Link
              href={`/disciplina/${discipline.slug}/modulo/${module.slug}`}
              className="hover:text-foreground"
            >
              {module.name}
            </Link>
            <span>/</span>
            <span className="text-foreground">{page.title}</span>
          </div>

          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold mb-2 leading-tight">{page.title}</h1>
              <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground flex-wrap">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{page.estimatedMinutes} minutos</span>
                </div>
                {progress?.completed && (
                  <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Concluído</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container max-w-4xl py-4 sm:py-6 md:py-8 space-y-4 sm:space-y-6 md:space-y-8">
        {/* Main Text */}
        {page.mainText && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Conteúdo Principal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MathContent content={page.mainText} />
            </CardContent>
          </Card>
        )}

        {/* Exercises */}
        {exercises.length > 0 && (
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold">Exercícios Práticos</h2>
            {exercises.map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                onComplete={(isCorrect) => handleExerciseComplete(exercise.id, isCorrect)}
              />
            ))}
          </div>
        )}

        {/* Concept Summary */}
        {page.conceptSummary && (
          <Card className="bg-accent/10 border-accent">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">💡 Resumo do Conceito</CardTitle>
            </CardHeader>
            <CardContent>
              <MathContent content={page.conceptSummary} />
            </CardContent>
          </Card>
        )}

        {/* Mark as Complete */}
        {isAuthenticated && !progress?.completed && (
          <div className="flex justify-center px-4">
            <Button size="lg" onClick={handleMarkComplete} disabled={updateProgressMutation.isPending} className="w-full sm:w-auto min-h-[48px] text-base">
              {updateProgressMutation.isPending ? "Salvando..." : "Marcar como Concluído"}
            </Button>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t">
          {previousPage ? (
            <Button variant="outline" asChild>
              <Link href={`/disciplina/${discipline.slug}/modulo/${module.slug}/aula/${previousPage.slug}`}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Anterior: {previousPage.title}
              </Link>
            </Button>
          ) : (
            <div />
          )}

          {nextPage ? (
            <Button asChild>
              <Link href={`/disciplina/${discipline.slug}/modulo/${module.slug}/aula/${nextPage.slug}`}>
                Próximo: {nextPage.title}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          ) : (
            <Button asChild variant="outline">
              <Link href={`/disciplina/${discipline.slug}/modulo/${module.slug}`}>
                Voltar ao Módulo
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
