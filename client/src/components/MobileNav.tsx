import { useMemo, useState } from "react";
import { Menu, X, Home, BookOpen, User, LogOut, CheckCircle2, Search } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { getModuleIcon, getModuleColor } from "./MathIcons";
import { Input } from "@/components/ui/input";

const normalizeString = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { user, isAuthenticated, logout } = useAuth();
  const { data: disciplines = [] } = trpc.disciplines.list.useQuery();
  const { data: modulesProgress = {} } = trpc.moduleProgress.allModules.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => {
      window.location.href = "/"; // Redireciona para login
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden fixed top-4 left-4 z-50 bg-background/80 backdrop-blur-sm shadow-lg"
          aria-label="Abrir menu"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0">
        <SheetHeader className="p-6 pb-4 bg-gradient-to-r from-primary/10 to-primary/5">
          <SheetTitle className="flex items-center gap-2 text-xl">
            <BookOpen className="h-6 w-6 text-primary" />
            Arquimedes
          </SheetTitle>
          {isAuthenticated && user && (
            <div className="text-sm text-muted-foreground pt-2">
              <p className="font-medium text-foreground truncate">{user.name || user.email}</p>
              <p className="text-xs">{user.email}</p>
            </div>
          )}
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-140px)]">
          <div className="p-4 space-y-4">
            {/* Quick Links */}
            <div className="space-y-2">
              <Link href="/dashboard" onClick={() => setOpen(false)}>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Home className="h-4 w-4" />
                  Início
                </Button>
              </Link>
              {isAuthenticated && (
                <Link href="/perfil" onClick={() => setOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    <User className="h-4 w-4" />
                    Meu Perfil
                  </Button>
                </Link>
              )}
            </div>

            <Separator />

            {/* Disciplines Navigation */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 px-2">
                Disciplinas
              </h3>
              <div className="px-2 pb-3">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Buscar módulo..."
                    className="pl-9 pr-9"
                    aria-label="Buscar módulo"
                    type="search"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                      aria-label="Limpar busca"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
              <Accordion type="single" collapsible className="w-full">
                {disciplines.map((discipline) => (
                  <DisciplineAccordion
                    key={discipline.id}
                    discipline={discipline}
                    modulesProgress={modulesProgress}
                    searchTerm={searchTerm}
                    onNavigate={() => setOpen(false)}
                  />
                ))}
              </Accordion>
            </div>
          </div>
        </ScrollArea>

        {/* Footer Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-muted/30 border-t">
          {!isAuthenticated ? (
            <Button asChild className="w-full">
              <a href={getLoginUrl()}>
                <User className="h-4 w-4 mr-2" />
                Entrar
              </a>
            </Button>
          ) : (
            <Button
              variant="outline"
              className="w-full"
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
            >
              <LogOut className="h-4 w-4 mr-2" />
              {logoutMutation.isPending ? "Saindo..." : "Sair"}
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

function DisciplineAccordion({
  discipline,
  modulesProgress,
  searchTerm,
  onNavigate,
}: {
  discipline: { id: number; name: string; slug: string };
  modulesProgress: Record<number, { completed: number; total: number; percentage: number }>;
  searchTerm: string;
  onNavigate: () => void;
}) {
  const { data: modules = [] } = trpc.modules.listByDiscipline.useQuery({
    disciplineId: discipline.id,
  });

  const filteredModules = useMemo(() => {
    const normalizedSearch = normalizeString(searchTerm);
    if (!normalizedSearch) return modules;

    return modules.filter((module) => normalizeString(module.name).includes(normalizedSearch));
  }, [modules, searchTerm]);

  return (
    <AccordionItem value={`discipline-${discipline.id}`} className="border-none">
      <AccordionTrigger className="hover:no-underline hover:bg-muted/50 px-2 py-3 rounded-lg">
        <span className="text-sm font-medium">{discipline.name}</span>
      </AccordionTrigger>
      <AccordionContent className="pb-0">
        <div className="space-y-1 pl-2 pt-2">
          {filteredModules.map((module) => (
            <Link
              key={module.id}
              href={`/disciplina/${discipline.slug}/modulo/${module.slug}`}
              onClick={onNavigate}
            >
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 h-auto py-2 px-3 text-sm"
              >
                <div className={getModuleColor(module.name)}>
                  {getModuleIcon(module.name, { size: 16 })}
                </div>
                <span className="text-left flex-1">{module.name}</span>
                {modulesProgress[module.id]?.percentage === 100 && (
                  <CheckCircle2 className="h-4 w-4 text-green-600" aria-label="Módulo concluído" />
                )}
                {modulesProgress[module.id] && (
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      modulesProgress[module.id].percentage === 100
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : modulesProgress[module.id].percentage >= 31
                        ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                        : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    }`}
                  >
                    {modulesProgress[module.id].percentage}%
                  </span>
                )}
              </Button>
            </Link>
          ))}
          {(filteredModules.length === 0 || modules.length === 0) && (
            <p className="text-xs text-muted-foreground px-3 py-2">
              {modules.length === 0 ? 'Nenhum módulo disponível' : 'Nenhum módulo encontrado para a busca'}
            </p>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
