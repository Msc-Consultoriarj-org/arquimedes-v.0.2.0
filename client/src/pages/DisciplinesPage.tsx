import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { MobileNav } from "@/components/MobileNav";

export default function DisciplinesPage() {
  const { data: disciplines, isLoading } = trpc.disciplines.list.useQuery();

  if (isLoading) {
    return (
      <>
        <MobileNav />
        <div className="min-h-screen bg-muted/30">
          <div className="container max-w-6xl py-8">
            <Skeleton className="h-12 w-64 mb-8" />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-64" />
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <MobileNav />
      <SEO
        title="Minhas Disciplinas - Arquimedes"
        description="Explore todas as disciplinas de matemática disponíveis na plataforma Arquimedes"
        keywords="disciplinas, matemática, aritmética, geometria, álgebra, cálculo"
      />
      <div className="min-h-screen bg-muted/30">
        {/* Header */}
        <div className="bg-background border-b">
          <div className="container max-w-6xl py-8">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="h-8 w-8 text-primary" />
              <h1 className="text-3xl sm:text-4xl font-bold">Minhas Disciplinas</h1>
            </div>
            <p className="text-muted-foreground text-lg">
              Escolha sua disciplina
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="container max-w-6xl py-8">
          {disciplines && disciplines.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {disciplines.map((discipline) => {
                const isActive = discipline.slug === "aritmetica";
                return (
                <Card 
                  key={discipline.id} 
                  className={`hover:shadow-lg transition-shadow ${
                    isActive 
                      ? "border-2 border-green-500 bg-green-50/50" 
                      : "opacity-60 border-gray-200"
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2 flex items-center gap-2">
                          {discipline.name}
                          {isActive && (
                            <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                              Cursando
                            </span>
                          )}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {discipline.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Stats */}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          <span>Módulos disponíveis</span>
                        </div>
                      </div>

                      {/* Action Button */}
                      <Button 
                        asChild 
                        className={`w-full ${
                          isActive 
                            ? "bg-green-600 hover:bg-green-700" 
                            : "bg-gray-400 hover:bg-gray-500"
                        }`}
                        disabled={!isActive}
                      >
                        <Link href={`/disciplina/${discipline.slug}`}>
                          Explorar Disciplina
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Nenhuma disciplina disponível</h2>
              <p className="text-muted-foreground mb-6">
                As disciplinas estarão disponíveis em breve.
              </p>
              <Button asChild>
                <Link href="/dashboard">Voltar ao Dashboard</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
