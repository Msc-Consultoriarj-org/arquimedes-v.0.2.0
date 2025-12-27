import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Code } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const { data: user, isLoading } = trpc.auth.me.useQuery();
  const [isGoogleLoginLoading, setGoogleLoginLoading] = useState(false);

  // Se já estiver autenticado, redireciona para dashboard
  useEffect(() => {
    if (!isLoading && user) {
      setLocation("/dashboard");
    }
  }, [user, isLoading, setLocation]);

  const handleGoogleLogin = () => {
    setGoogleLoginLoading(true);
    // Redireciona para o fluxo OAuth do Manus (que suporta Google)
    // Após login bem-sucedido, o callback redirecionará para /dashboard
    window.location.href = getLoginUrl();
  };

  // Mostra loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#6A0DAD] via-[#0052CC] to-[#2C3E50]">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#6A0DAD] via-[#0052CC] to-[#2C3E50]">
      {/* Efeitos de fundo decorativos com cores MSC */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#6A0DAD] rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#0052CC] rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#2C3E50] rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:50px_50px]" />

      {/* Conteúdo principal */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* MSC Logo e Hero Section */}
        <div className="text-center mb-12 space-y-6">
          {/* Logo MSC */}
          <div className="flex justify-center mb-4">
            <img 
              src="/msc-logo.webp" 
              alt="MSC Consultoria" 
              className="h-24 md:h-32 w-auto drop-shadow-2xl"
            />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-2xl tracking-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Arquimedes
          </h1>
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-white to-transparent rounded-full" />
          <p className="text-xl md:text-2xl text-white/90 font-light tracking-wide" style={{ fontFamily: 'Lato, sans-serif' }}>
            Matemática Descomplicada
          </p>
          <p className="text-sm text-white/70" style={{ fontFamily: 'Lato, sans-serif' }}>
            Uma iniciativa MSC Consultoria
          </p>
        </div>

        {/* Card de Login com cores MSC */}
        <Card className="w-full max-w-sm p-8 bg-white/95 backdrop-blur-sm shadow-2xl border-0">
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-[#2C3E50]" style={{ fontFamily: 'Montserrat, sans-serif' }}>Entrar</h2>
              <p className="text-sm text-gray-600" style={{ fontFamily: 'Lato, sans-serif' }}>
                Faça login para começar a aprender
              </p>
            </div>

            <Button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isGoogleLoginLoading}
              className="w-full h-14 bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-300 hover:border-[#6A0DAD] font-semibold shadow-lg hover:shadow-xl transition-all duration-200 text-base"
            >
              {isGoogleLoginLoading ? (
                <Spinner className="w-5 h-5 mr-3 text-gray-700" />
              ) : (
                <Mail className="w-5 h-5 mr-3 text-red-600 flex-shrink-0" />
              )}
              {isGoogleLoginLoading
                ? "Redirecionando..."
                : "Continuar com Google"}
            </Button>

            {/* Botão de Login para Desenvolvimento */}
            {import.meta.env.DEV && (
              <Button
                type="button"
                onClick={() => (window.location.href = "/api/dev/login")}
                className="w-full h-14 bg-[#2C3E50] hover:bg-[#1a252f] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 text-base"
              >
                <Code className="w-5 h-5 mr-3 flex-shrink-0" />
                Entrar como Desenvolvedor
              </Button>
            )}

            <p className="text-xs text-center text-gray-500" style={{ fontFamily: 'Lato, sans-serif' }}>
              Ao continuar, você concorda com nossos Termos de Uso
            </p>
          </div>
        </Card>

        {/* Footer com MSC Consultoria */}
        <div className="mt-12 text-center text-white/80 text-sm space-y-2" style={{ fontFamily: 'Lato, sans-serif' }}>
          <p>© 2025 Arquimedes</p>
          <p className="text-xs text-white/60">Desenvolvido por MSC Consultoria</p>
        </div>
      </div>

      {/* CSS para animações */}
      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .bg-grid-white\\/\\[0\\.05\\] {
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
        }
      `}</style>
    </div>
  );
}
