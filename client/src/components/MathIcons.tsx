/**
 * Ícones matemáticos customizados para os módulos do Arquimedes
 * Cada ícone representa visualmente o conceito matemático
 */

import { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

// Ícone de Adição - Sinal de mais com círculo
export function AdditionIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
      <path
        d="M12 7V17M7 12H17"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Ícone de Subtração - Sinal de menos com círculo
export function SubtractionIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
      <path
        d="M7 12H17"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Ícone de Multiplicação - X com círculo
export function MultiplicationIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
      <path
        d="M8 8L16 16M16 8L8 16"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Ícone de Divisão - Símbolo de divisão com círculo
export function DivisionIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="12" cy="8" r="1.5" fill="currentColor" />
      <path
        d="M7 12H17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="16" r="1.5" fill="currentColor" />
    </svg>
  );
}

// Ícone de Calculadora - Para matemática geral
export function CalculatorIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <rect
        x="4"
        y="2"
        width="16"
        height="20"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <rect x="7" y="5" width="10" height="4" rx="1" fill="currentColor" opacity="0.2" />
      <circle cx="8" cy="13" r="1" fill="currentColor" />
      <circle cx="12" cy="13" r="1" fill="currentColor" />
      <circle cx="16" cy="13" r="1" fill="currentColor" />
      <circle cx="8" cy="17" r="1" fill="currentColor" />
      <circle cx="12" cy="17" r="1" fill="currentColor" />
      <circle cx="16" cy="17" r="1" fill="currentColor" />
    </svg>
  );
}

// Ícone de Gráfico - Para visualizações
export function GraphIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M3 3V21H21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 17L11 13L15 15L20 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="17" r="2" fill="currentColor" />
      <circle cx="11" cy="13" r="2" fill="currentColor" />
      <circle cx="15" cy="15" r="2" fill="currentColor" />
      <circle cx="20" cy="8" r="2" fill="currentColor" />
    </svg>
  );
}

// Ícone de Fórmula - Para conceitos matemáticos
export function FormulaIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <text
        x="4"
        y="16"
        fontFamily="serif"
        fontSize="14"
        fontStyle="italic"
        fill="currentColor"
        fontWeight="bold"
      >
        x²
      </text>
      <path
        d="M14 8L16 10L14 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="19" cy="10" r="2" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  );
}

// Ícone de Reta Numérica
export function NumberLineIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M2 12H22"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M6 9V15" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 9V15" stroke="currentColor" strokeWidth="1.5" />
      <path d="M18 9V15" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" />
      <path
        d="M20 10L22 12L20 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Ícone de Matriz
export function MatrixIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <rect x="4" y="4" width="6" height="6" rx="1" fill="currentColor" opacity="0.3" />
      <rect x="14" y="4" width="6" height="6" rx="1" fill="currentColor" opacity="0.5" />
      <rect x="4" y="14" width="6" height="6" rx="1" fill="currentColor" opacity="0.5" />
      <rect x="14" y="14" width="6" height="6" rx="1" fill="currentColor" opacity="0.7" />
      <path
        d="M2 4V10M2 4H4M2 10H4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M22 4V10M22 4H20M22 10H20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M2 14V20M2 14H4M2 20H4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M22 14V20M22 14H20M22 20H20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Função helper para obter o ícone correto baseado no nome do módulo
export function getModuleIcon(moduleName: string, props?: IconProps) {
  const lowerName = moduleName.toLowerCase();
  
  if (lowerName.includes('adição') || lowerName.includes('adicao')) {
    return <AdditionIcon {...props} />;
  }
  if (lowerName.includes('subtração') || lowerName.includes('subtracao')) {
    return <SubtractionIcon {...props} />;
  }
  if (lowerName.includes('multiplicação') || lowerName.includes('multiplicacao')) {
    return <MultiplicationIcon {...props} />;
  }
  if (lowerName.includes('divisão') || lowerName.includes('divisao')) {
    return <DivisionIcon {...props} />;
  }
  if (lowerName.includes('gráfico') || lowerName.includes('grafico')) {
    return <GraphIcon {...props} />;
  }
  if (lowerName.includes('matriz')) {
    return <MatrixIcon {...props} />;
  }
  if (lowerName.includes('reta') || lowerName.includes('número') || lowerName.includes('numero')) {
    return <NumberLineIcon {...props} />;
  }
  
  // Ícone padrão
  return <CalculatorIcon {...props} />;
}

// Função helper para obter a cor do módulo
export function getModuleColor(moduleName: string): string {
  const lowerName = moduleName.toLowerCase();
  
  if (lowerName.includes('adição') || lowerName.includes('adicao')) {
    return 'text-green-600';
  }
  if (lowerName.includes('subtração') || lowerName.includes('subtracao')) {
    return 'text-orange-600';
  }
  if (lowerName.includes('multiplicação') || lowerName.includes('multiplicacao')) {
    return 'text-purple-600';
  }
  if (lowerName.includes('divisão') || lowerName.includes('divisao')) {
    return 'text-cyan-600';
  }
  
  return 'text-blue-600'; // Cor padrão
}
