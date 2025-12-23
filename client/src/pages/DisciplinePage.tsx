import { useParams, Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, BookOpen, ArrowRight } from "lucide-react";

export default function DisciplinePage() {
  const params = useParams<{ disciplineSlug: string }>();

  // Fetch discipline
  const { data: discipline, isLoading: loadingDiscipline } = trpc.disciplines.getBySlug.useQuery({
    slug: params.disciplineSlug || "",
  });

  // Fetch modules
  const { data: modules = [], isLoading: loadingModules } = trpc.modules.listByDiscipline.useQuery(
    { disciplineId: discipline?.id || 0 },
    { enabled: !!discipline }
  );

  const isLoading = loadingDiscipline || loadingModules;

  if (isLoading) {
    return (
      <div className="container max-w-4xl py-8 space-y-6">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  if (!discipline) {
    return (
      <div className="container max-w-4xl py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Disciplina não encontrada</h1>
        <Button asChild>
          <Link href="/">Voltar para o início</Link>
        </Button>
      </div>
    );
  }

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
            <span className="text-foreground">{discipline.name}</span>
          </div>

          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para o início
            </Link>
          </Button>

          <h1 className="text-3xl font-bold mb-2">{discipline.name}</h1>
          {discipline.description && (
            <p className="text-lg text-muted-foreground">{discipline.description}</p>
          )}
        </div>
      </div>

      {/* Modules List */}
      <div className="container max-w-4xl py-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Módulos</h2>
          <div className="grid gap-6">
            {modules.map((module, index) => (
              <ModuleCard
                key={module.id}
                module={module}
                disciplineSlug={discipline.slug}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ModuleCard({
  module,
  disciplineSlug,
  index,
}: {
  module: { id: number; name: string; slug: string; description: string | null };
  disciplineSlug: string;
  index: number;
}) {
  const { data: pages = [] } = trpc.pages.listByModule.useQuery({
    moduleId: module.id,
  });

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="text-sm font-medium text-muted-foreground mb-2">
              Módulo {index + 1}
            </div>
            <CardTitle className="text-2xl mb-2">{module.name}</CardTitle>
            {module.description && (
              <CardDescription className="text-base">{module.description}</CardDescription>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            {pages.length} aulas disponíveis
          </p>
          {pages.slice(0, 3).map((page) => (
            <div key={page.id} className="flex items-center gap-2 text-sm">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <span>{page.title}</span>
            </div>
          ))}
          {pages.length > 3 && (
            <p className="text-sm text-muted-foreground pl-6">
              + {pages.length - 3} mais aulas
            </p>
          )}
        </div>
        <Button asChild className="w-full">
          <Link href={`/disciplina/${disciplineSlug}/modulo/${module.slug}`}>
            Explorar Módulo
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
