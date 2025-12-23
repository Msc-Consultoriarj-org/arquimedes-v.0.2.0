import { trpc } from "@/lib/trpc";
import { MobileNav } from "@/components/MobileNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  GraduationCap, 
  Flame, 
  Zap, 
  Plus, 
  X, 
  Divide, 
  Video, 
  Target, 
  Trophy,
  Lock
} from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen,
  GraduationCap,
  Flame,
  Zap,
  Plus,
  X,
  Divide,
  Video,
  Target,
  Trophy,
};

export default function AchievementsPage() {
  const { isAuthenticated } = useAuth();
  const { data: achievements = [], isLoading } = trpc.achievements.getUserAchievements.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  if (!isAuthenticated) {
    return (
      <>
        <MobileNav />
        <div className="min-h-screen bg-muted/30 flex items-center justify-center">
          <Card className="max-w-md mx-4">
            <CardHeader>
              <CardTitle>Acesso Restrito</CardTitle>
              <CardDescription>
                Faça login para ver suas conquistas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/">Ir para o início</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <MobileNav />
        <div className="min-h-screen bg-muted/30">
          <div className="container max-w-6xl py-8 space-y-6">
            <Skeleton className="h-12 w-64" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-48" />
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalCount = achievements.length;
  const progressPercentage = Math.round((unlockedCount / totalCount) * 100);

  // Group by category
  type Achievement = typeof achievements[number];
  const categories: Record<string, Achievement[]> = {
    learning: achievements.filter((a: Achievement) => a.category === "learning"),
    streak: achievements.filter((a: Achievement) => a.category === "streak"),
    mastery: achievements.filter((a: Achievement) => a.category === "mastery"),
    practice: achievements.filter((a: Achievement) => a.category === "practice"),
  };

  const categoryTitles = {
    learning: "Aprendizado",
    streak: "Consistência",
    mastery: "Maestria",
    practice: "Prática",
  };

  return (
    <>
      <MobileNav />
      <div className="min-h-screen bg-muted/30">
        {/* Header */}
        <div className="bg-background border-b">
          <div className="container max-w-6xl py-8">
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">Conquistas</h1>
            </div>
            <p className="text-lg text-muted-foreground mb-6">
              Acompanhe seu progresso e desbloqueie conquistas especiais
            </p>

            {/* Progress Summary */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Progresso Geral</span>
                  <span className="text-sm font-bold text-primary">
                    {unlockedCount} de {totalCount} ({progressPercentage}%)
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div
                    className="bg-primary rounded-full h-3 transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Achievements by Category */}
        <div className="container max-w-6xl py-8 space-y-12">
          {Object.entries(categories).map(([category, items]) => (
            <div key={category}>
              <h2 className="text-2xl font-bold mb-6">
                {categoryTitles[category as keyof typeof categoryTitles]}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((achievement: Achievement) => {
                  const Icon = iconMap[achievement.icon] || Trophy;
                  const isUnlocked = achievement.unlocked;

                  return (
                    <Card
                      key={achievement.id}
                      className={`transition-all ${
                        isUnlocked
                          ? "border-primary/50 bg-primary/5 hover:shadow-lg"
                          : "opacity-60 hover:opacity-80"
                      }`}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div
                            className={`p-3 rounded-lg ${
                              isUnlocked
                                ? "bg-primary/10 text-primary"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {isUnlocked ? (
                              <Icon className="h-8 w-8" />
                            ) : (
                              <Lock className="h-8 w-8" />
                            )}
                          </div>
                          {isUnlocked && (
                            <Badge variant="default" className="bg-green-600">
                              Desbloqueado
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-xl mt-4">{achievement.title}</CardTitle>
                        <CardDescription className="text-base">
                          {achievement.description}
                        </CardDescription>
                      </CardHeader>
                      {isUnlocked && achievement.unlockedAt && (
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            Desbloqueado em{" "}
                            {new Date(achievement.unlockedAt).toLocaleDateString("pt-BR", {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            })}
                          </p>
                        </CardContent>
                      )}
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
