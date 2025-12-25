import { Link, useLocation } from "wouter";
import { Home, User, BookOpen, LogOut, Menu, X, Target, Video, Trophy, Award, Sparkles, CheckCircle2, Beaker } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const [location, setLocation] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { data: user } = trpc.auth.me.useQuery();
  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => {
      setLocation("/login");
    },
  });

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Perfil", href: "/perfil", icon: User },
    // { name: "Desafio do Dia", href: "/desafio-do-dia", icon: Trophy }, // Oculto temporariamente - validar respostas
    { name: "Conquistas", href: "/conquistas", icon: Award },
    { name: "Sala de Exercicios", href: "/exercicios", icon: Target },
    { name: "Exercícios Interativos", href: "/exercicios-interativos", icon: Sparkles },
    { name: "Exercícios Resolvidos", href: "/exercicios-resolvidos", icon: CheckCircle2 },
    { name: "Laboratório de Matemática", href: "/laboratorio", icon: Beaker },
    { name: "Sala de Vídeos", href: "/videos", icon: Video },
    { name: "Minhas Disciplinas", href: "/disciplinas", icon: BookOpen },
  ];

  const isActive = (href: string) => location === href;

  const SidebarContent = () => (
    <>
      {/* MSC Consultoria Logo */}
      <div className="p-6 border-b bg-gradient-to-r from-[#6A0DAD]/5 to-[#0052CC]/5">
        <div className="flex items-center gap-3">
          <img 
            src="/msc-logo.webp" 
            alt="MSC Consultoria" 
            className="h-10 w-auto"
          />
          <div>
            <h1 className="text-xl font-bold text-gradient-msc" style={{
              background: 'linear-gradient(135deg, #6A0DAD 0%, #0052CC 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Arquimedes</h1>
            <p className="text-xs text-muted-foreground">Matemática Descomplicada</p>
          </div>
        </div>
      </div>

      {/* User Profile */}
      {user && (
        <div className="p-6 border-b flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6A0DAD] to-[#0052CC] flex items-center justify-center text-white font-bold text-lg shadow-lg">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name || "User"} className="w-full h-full rounded-full object-cover" />
            ) : (
              user.name?.[0]?.toUpperCase() || "U"
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold truncate">{user.name || "Usuario"}</p>
            <p className="text-sm text-muted-foreground truncate">{user.email}</p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive(item.href) ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3",
                  isActive(item.href) && "bg-[#6A0DAD]/10 text-[#6A0DAD] hover:bg-[#6A0DAD]/20"
                )}
                onClick={() => setIsMobileOpen(false)}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={() => {
            logoutMutation.mutate();
            setIsMobileOpen(false);
          }}
        >
          <LogOut className="h-5 w-5" />
          Sair
        </Button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <img 
              src="/msc-logo.webp" 
              alt="MSC Consultoria" 
              className="h-8 w-auto"
            />
            <h1 className="text-lg font-bold" style={{
              background: 'linear-gradient(135deg, #6A0DAD 0%, #0052CC 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Arquimedes</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label={isMobileOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "lg:hidden fixed top-0 left-0 bottom-0 z-50 w-72 bg-background border-r flex flex-col transition-transform duration-300",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarContent />
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed top-0 left-0 bottom-0 w-72 bg-background border-r flex-col">
        <SidebarContent />
      </aside>

      {/* Spacer for mobile header */}
      <div className="lg:hidden h-16" />
    </>
  );
}
