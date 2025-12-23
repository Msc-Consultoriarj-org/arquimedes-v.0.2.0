import { useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Code } from "lucide-react";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const { data: user, isLoading } = trpc.auth.me.useQuery();

  // Se já estiver autenticado, redireciona para dashboard
  useEffect(() => {
    if (!isLoading && user) {
      setLocation("/dashboard");
    }
  }, [user, isLoading, setLocation]);

  const handleGoogleLogin = () => {
    // Redireciona para o fluxo OAuth do Manus (que suporta Google)
    // Após login bem-sucedido, o callback redirecionará para /dashboard
    window.location.href = getLoginUrl();
  };

  // Mostra loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900">
      {/* Efeitos de fundo decorativos */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:50px_50px]" />

      {/* Conteúdo principal */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Hero Section Minimalista */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold text-white drop-shadow-2xl tracking-tight">
            Arquimedes
          </h1>
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-white to-transparent rounded-full" />
          <p className="text-2xl md:text-3xl text-blue-100 font-light tracking-wide">
            Matemática Descomplicada
          </p>
        </div>

        {/* Card de Login Minimalista - Apenas Google */}
        <Card className="w-full max-w-sm p-8 bg-white/95 backdrop-blur-sm shadow-2xl border-0">
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">Entrar</h2>
              <p className="text-sm text-gray-600">
                Faça login para começar a aprender
              </p>
            </div>

            <Button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full h-14 bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-300 hover:border-gray-400 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 text-base"
            >
              <Mail className="w-5 h-5 mr-3 text-red-600 flex-shrink-0" />
              Continuar com Google
            </Button>

            {/* Botão de Login para Desenvolvimento */}
            {import.meta.env.DEV && (
              <Button
                type="button"
                onClick={() => (window.location.href = "/api/dev/login")}
                className="w-full h-14 bg-gray-900 hover:bg-gray-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 text-base"
              >
                <Code className="w-5 h-5 mr-3 flex-shrink-0" />
                Entrar como Desenvolvedor
              </Button>
            )}

            <p className="text-xs text-center text-gray-500">
              Ao continuar, você concorda com nossos Termos de Uso
            </p>
          </div>
        </Card>

        {/* Footer minimalista */}
        <div className="mt-12 text-center text-blue-100/80 text-sm">
          <p>© 2025 Arquimedes</p>
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
