import { useState } from "react";
import { useLocation } from "wouter";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { 
  Sparkles, 
  User, 
  BookOpen, 
  TrendingUp, 
  Trophy,
  Calculator,
  Shapes,
  PieChart,
  Sigma
} from "lucide-react";
import { trpc } from "@/lib/trpc";

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: () => void;
}

export default function OnboardingModal({ isOpen, onComplete }: OnboardingModalProps) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [, setLocation] = useLocation();
  
  const utils = trpc.useUtils();
  const updateNameMutation = trpc.user.updateName.useMutation();
  const completeOnboardingMutation = trpc.user.completeOnboarding.useMutation();
  const enrollMutation = trpc.enrollments.enroll.useMutation();
  const { data: disciplines } = trpc.disciplines.list.useQuery();

  const handleNext = async () => {
    if (step === 2 && name.trim()) {
      // Salvar nome do usuário
      await updateNameMutation.mutateAsync({ name: name.trim() });
      // Invalidar cache do auth.me para atualizar nome no dashboard
      await utils.auth.me.invalidate();
    }

    if (step === 4) {
      // Inscrever automaticamente em Aritmética
      const aritmetica = disciplines?.find(d => d.slug === "aritmetica");
      if (aritmetica) {
        await enrollMutation.mutateAsync({ disciplineId: aritmetica.id });
      }
      
      // Marcar onboarding como completo
      await completeOnboardingMutation.mutateAsync();
      // Invalidar cache do auth.me para atualizar hasCompletedOnboarding
      await utils.auth.me.invalidate();
      // Invalidar cache de enrollments para mostrar Aritmética no dashboard
      await utils.enrollments.list.invalidate();
      onComplete();
      // Redirecionar para primeira aula de Aritmética
      setLocation("/disciplina/aritmetica/modulo/adicao-subtracao/aula/o-que-e-adicionar");
    } else {
      setStep(step + 1);
    }
  };

  const handleSkip = async () => {
    await completeOnboardingMutation.mutateAsync();
    onComplete();
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0 gap-0">
        {/* Etapa 1: Boas-vindas */}
        {step === 1 && (
          <div className="p-12 text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center animate-pulse">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <div className="space-y-3">
              <h1 className="text-4xl font-bold text-gray-900">
                Bem-vindo ao Arquimedes!
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Sua jornada para dominar a matemática começa agora. 
                Vamos te guiar pelos primeiros passos!
              </p>
            </div>

            <div className="flex gap-4 justify-center pt-6">
              <Button
                variant="outline"
                onClick={handleSkip}
                className="px-6"
              >
                Pular Tutorial
              </Button>
              <Button
                onClick={handleNext}
                className="px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                Começar
              </Button>
            </div>
          </div>
        )}

        {/* Etapa 2: Escolher Nome */}
        {step === 2 && (
          <div className="p-12 text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-blue-600" />
              </div>
            </div>
            
            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-gray-900">
                Como podemos te chamar?
              </h2>
              <p className="text-lg text-gray-600">
                Escolha um nome que usaremos para te cumprimentar
              </p>
            </div>

            <div className="max-w-md mx-auto space-y-4">
              <Input
                type="text"
                placeholder="Digite seu nome..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-14 text-lg text-center"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter" && name.trim()) {
                    handleNext();
                  }
                }}
              />
              
              <p className="text-sm text-gray-500">
                Você poderá alterar isso depois nas configurações
              </p>
            </div>

            <div className="flex gap-4 justify-center pt-6">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="px-6"
              >
                Voltar
              </Button>
              <Button
                onClick={handleNext}
                disabled={!name.trim() || updateNameMutation.isPending}
                className="px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                {updateNameMutation.isPending ? "Salvando..." : "Continuar"}
              </Button>
            </div>
          </div>
        )}

        {/* Etapa 3: Tour do Dashboard */}
        {step === 3 && (
          <div className="p-12 space-y-8">
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-bold text-gray-900">
                Conheça seu Dashboard
              </h2>
              <p className="text-lg text-gray-600">
                Aqui você acompanha seu progresso e acessa os cursos
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card XP & Nível */}
              <Card className="p-6 space-y-4 border-2 border-blue-200 bg-blue-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">XP & Nível</h3>
                    <p className="text-sm text-gray-600">Seu progresso</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Ganhe XP completando aulas e exercícios. Suba de nível e desbloqueie conquistas!
                </p>
              </Card>

              {/* Card Pontos */}
              <Card className="p-6 space-y-4 border-2 border-green-200 bg-green-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Pontos</h3>
                    <p className="text-sm text-gray-600">Gamificação</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Acumule pontos diários fazendo login, assistindo vídeos e completando tarefas!
                </p>
              </Card>

              {/* Card Disciplinas */}
              <Card className="p-6 space-y-4 border-2 border-purple-200 bg-purple-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Disciplinas</h3>
                    <p className="text-sm text-gray-600">Conteúdo</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Acesse módulos organizados de forma progressiva, do básico ao avançado!
                </p>
              </Card>
            </div>

            <div className="flex gap-4 justify-center pt-6">
              <Button
                variant="outline"
                onClick={() => setStep(2)}
                className="px-6"
              >
                Voltar
              </Button>
              <Button
                onClick={handleNext}
                className="px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                Continuar
              </Button>
            </div>
          </div>
        )}

        {/* Etapa 4: Estrutura de Matemática */}
        {step === 4 && (
          <div className="p-12 space-y-8">
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-bold text-gray-900">
                Matemática: 4 Subcursos
              </h2>
              <p className="text-lg text-gray-600">
                Organizamos todo o conteúdo em 4 grandes áreas
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Aritmética */}
              <Card className="p-6 space-y-4 border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-blue-100/50 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center">
                    <Calculator className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Aritmética</h3>
                    <p className="text-sm text-gray-600">Fundamentos</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Números, operações básicas e cálculos práticos do dia a dia. 
                  <span className="font-semibold text-blue-700"> Você começará aqui!</span>
                </p>
              </Card>

              {/* Álgebra */}
              <Card className="p-6 space-y-4 border-2 border-purple-300 bg-gradient-to-br from-purple-50 to-purple-100/50">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-purple-600 rounded-xl flex items-center justify-center">
                    <Sigma className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Álgebra</h3>
                    <p className="text-sm text-gray-600">Equações</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Equações, funções, polinômios e estruturas algébricas.
                </p>
              </Card>

              {/* Geometria */}
              <Card className="p-6 space-y-4 border-2 border-green-300 bg-gradient-to-br from-green-50 to-green-100/50">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center">
                    <Shapes className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Geometria</h3>
                    <p className="text-sm text-gray-600">Formas & Espaço</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Formas, áreas, volumes e relações espaciais.
                </p>
              </Card>

              {/* Cálculo */}
              <Card className="p-6 space-y-4 border-2 border-orange-300 bg-gradient-to-br from-orange-50 to-orange-100/50">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-orange-600 rounded-xl flex items-center justify-center">
                    <PieChart className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Cálculo</h3>
                    <p className="text-sm text-gray-600">Avançado</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Derivadas, integrais e análise de funções.
                </p>
              </Card>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 text-center">
              <p className="text-lg font-semibold text-blue-900">
                🚀 Vamos começar pela <span className="text-blue-600">Aritmética</span>!
              </p>
              <p className="text-sm text-blue-700 mt-2">
                Você será direcionado para a primeira aula: "O que é Adicionar"
              </p>
            </div>

            <div className="flex gap-4 justify-center pt-6">
              <Button
                variant="outline"
                onClick={() => setStep(3)}
                className="px-6"
              >
                Voltar
              </Button>
              <Button
                onClick={handleNext}
                disabled={completeOnboardingMutation.isPending}
                className="px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                {completeOnboardingMutation.isPending ? "Finalizando..." : "Começar a Aprender!"}
              </Button>
            </div>
          </div>
        )}

        {/* Indicador de progresso */}
        <div className="px-12 pb-6">
          <div className="flex gap-2 justify-center">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === step
                    ? "w-8 bg-blue-600"
                    : i < step
                    ? "w-2 bg-blue-400"
                    : "w-2 bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
