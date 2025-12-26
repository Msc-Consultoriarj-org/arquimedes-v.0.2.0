import { useEffect, useRef, memo } from "react";
import { Star, TrendingUp } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useSounds } from "@/lib/sounds";

// O componente é envolvido com React.memo para evitar re-renderizações desnecessárias.
// Como o componente não recebe props e busca seus próprios dados, ele só deve ser
// renderizado novamente quando seu estado interno ou os dados de trpc mudarem.
// Isso melhora o desempenho ao evitar que re-renderizações do componente pai o afetem.
const XPDisplay = memo(function XPDisplay() {
  const { data: xp, isLoading } = trpc.gamification.xp.useQuery();
  const { playLevelUp } = useSounds();
  const previousLevel = useRef<number | null>(null);

  // Tocar som quando subir de nível (DEVE estar antes de qualquer return)
  useEffect(() => {
    if (xp && previousLevel.current !== null && xp.level > previousLevel.current) {
      playLevelUp();
    }
    if (xp) {
      previousLevel.current = xp.level;
    }
  }, [xp, playLevelUp]);

  if (isLoading) {
    return (
      <Card className="p-4">
        <div className="h-4 bg-gray-200 rounded w-24 mb-3 animate-pulse" />
        <div className="h-2 bg-gray-200 rounded w-full mb-2 animate-pulse" />
        <div className="h-3 bg-gray-200 rounded w-32 animate-pulse" />
      </Card>
    );
  }

  if (!xp) return null;

  const { totalXP, level, xpToNextLevel } = xp;
  const xpInCurrentLevel = totalXP - ((level - 1) * 100);
  const xpNeededForLevel = level * 100;
  const progressPercentage = (xpInCurrentLevel / xpNeededForLevel) * 100;

  return (
    <Card className="p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center">
            <Star className="w-5 h-5 text-white fill-white" />
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-900">Nível {level}</div>
            <div className="text-xs text-gray-600">{totalXP} XP total</div>
          </div>
        </div>
        
        <div className="flex items-center gap-1 text-green-600">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm font-semibold">{xpToNextLevel} XP</span>
        </div>
      </div>
      
      <Progress value={progressPercentage} className="h-2 mb-2" />
      
      <div className="text-xs text-gray-600 text-center">
        {xpToNextLevel} XP para o próximo nível
      </div>
    </Card>
  );
});

export default XPDisplay;
