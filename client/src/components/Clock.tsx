import { useState, useEffect } from 'react';
import { Clock as ClockIcon } from 'lucide-react';

export function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Formatar horário para Brasília (GMT-3)
  const brasiliaTime = time.toLocaleTimeString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  const brasiliaDate = time.toLocaleDateString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    weekday: 'short',
    day: '2-digit',
    month: 'short'
  });

  return (
    <div className="flex items-center gap-2 text-sm">
      <ClockIcon className="h-4 w-4 text-muted-foreground" />
      <div className="flex flex-col">
        <span className="font-mono font-semibold text-foreground">
          {brasiliaTime}
        </span>
        <span className="text-xs text-muted-foreground capitalize">
          {brasiliaDate}
        </span>
      </div>
    </div>
  );
}
