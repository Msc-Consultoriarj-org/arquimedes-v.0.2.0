# 🎓 Arquimedes - Plataforma de Educação em Matemática

<div align="center">

![Arquimedes Logo](https://img.shields.io/badge/Arquimedes-Matem%C3%A1tica%20Descomplicada-2563eb?style=for-the-badge)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Progresso](https://img.shields.io/badge/Progresso-85%25-10b981?style=for-the-badge)](PROJECT_STATUS.md)

**Educação de qualidade em matemática para adultos**

*Do básico ao avançado, sem infantilização*

[Demo ao Vivo](https://3000-izawxsbz194xne7hs1lhx-bbd42229.us2.manus.computer) · [Reportar Bug](https://github.com/MSC-Consultoria/arquimedes0.0.1/issues) · [Solicitar Funcionalidade](https://github.com/MSC-Consultoria/arquimedes0.0.1/issues)

</div>

---

## 📋 Sobre o Projeto

**Arquimedes** é uma plataforma educacional moderna desenvolvida pela **MSC Consultorias** com o objetivo de desmistificar o ensino de matemática para adultos. A plataforma oferece uma abordagem clara, prática e profissional, focando em conceitos fundamentais com aplicações do cotidiano.

### 🎯 Missão

Proporcionar educação matemática de qualidade, acessível e contextualizada para adultos que desejam reforçar seus conhecimentos básicos ou avançar em conceitos mais complexos, sem a infantilização comum em materiais educacionais tradicionais.

### ✨ Diferenciais

- **Abordagem Conceitual**: Foco na compreensão profunda, não apenas em cálculos mecânicos
- **Contextualização Prática**: Exemplos do cotidiano (finanças, compras, medidas)
- **Visualização Interativa**: Diagramas, retas numéricas e equações renderizadas
- **Feedback Imediato**: Sistema de exercícios com validação automática
- **Aprendizado Gamificado**: XP, níveis, streaks e conquistas
- **Interface Profissional**: Design limpo e moderno, adequado para adultos
- **Exercícios Interativos Avançados**: FillInBlanks, InteractiveSlider, MatchingGame
- **Sistema de Dicas Contextuais**: Ajuda estratégica sem entregar respostas
- **Personalização Visual**: 8 temas de cores dinâmicos com gradientes harmoniosos

---

## 🚀 Funcionalidades

### ✅ Implementadas (v2.46.0)

#### 📚 Estrutura de Conteúdo
- **4 Grandes Áreas de Conhecimento**
  - 🔢 **Aritmética** (16 módulos estruturados, 3 completos)
  - 📐 **Álgebra** (estrutura planejada)
  - 📏 **Geometria** (estrutura planejada)
  - ∫ **Cálculo** (estrutura planejado)

- **Sistema de Navegação Hierárquica**
  - Estrutura Disciplina → Módulo → Página/Aula
  - Breadcrumb intuitivo
  - Índice interativo de conteúdo
  - Menu hambúrguer mobile com progresso por módulo
  - Sidebar persistente com navegação rápida em todas as páginas

#### 📝 Conteúdo Educacional Rico
- **3 Módulos Completos de Aritmética:**
  1. **Adição e Subtração** (3 páginas, ~8.500 palavras)
  2. **Multiplicação** (3 páginas, ~9.200 palavras)
  3. **Divisão** (3 páginas, ~8.800 palavras)

- **Estatísticas de Conteúdo:**
  - 9 páginas de aulas expandidas (~26.500 palavras totais)
  - 22 exercícios tradicionais com feedback imediato
  - 37+ exercícios interativos avançados
  - 3 componentes visuais interativos (NumberLine, MultiplicationMatrix, MultiplicationTable)

- **Renderização Avançada:**
  - Texto formatado com Markdown
  - Equações matemáticas em LaTeX (KaTeX)
  - Proteção do símbolo R$ (moeda brasileira)
  - Suporte a conceitos-chave destacados
  - Estrutura escaneável com títulos, subtítulos e listas

#### 🎮 Gamificação Completa
- **Sistema de XP e Níveis**
  - Pontos de experiência por aula completada (10 XP)
  - Níveis progressivos baseados em XP total
  - Barra de progresso visual com porcentagem
  - Animações de confete ao completar aulas e exercícios

- **Streaks (Sequências)**
  - Rastreamento de dias consecutivos de estudo
  - Incentivo para manter consistência
  - Exibição destacada no Dashboard

- **Conquistas (Achievements)**
  - 26 badges por marcos alcançados
  - Sistema de recompensas visual
  - Confete dourado especial ao completar desafio do dia
  - Página dedicada com progresso detalhado
  - Badges favoritas exibidas no perfil (máx. 3)

- **Sistema de Pontos**
  - Pontos por exercício (5/10/15 pts baseado em dificuldade)
  - Histórico de pontuação (hoje, semana, mês, total)
  - Dashboard com estatísticas detalhadas

#### 💪 Exercícios Interativos Avançados

**Sala de Exercícios Interativos** - 37+ exercícios organizados em 7 módulos:
- **FillInBlanks** (Preencher Lacunas) - 20+ exercícios
  - Operações matemáticas contextualizadas
  - Validação automática de respostas
  - Feedback imediato com correções

- **InteractiveSlider** (Slider de Estimativa) - 10+ exercícios
  - Estimativas de valores e medidas
  - Feedback visual de proximidade
  - Ideal para cálculos aproximados

- **MatchingGame** (Jogo de Correspondência) - 7+ exercícios
  - Conectar conceitos e definições
  - Drag-and-drop intuitivo
  - Validação de correspondências corretas

**Distribuição por Dificuldade:**
- 60% Fácil (5 pontos)
- 30% Moderado (10 pontos)
- 10% Difícil (15 pontos)

**Sistema de Dicas Contextuais:**
- Botão "💡 Dica" em exercícios difíceis e moderados
- Dicas estratégicas que ensinam métodos de resolução
- NÃO entregam respostas diretas
- Card amarelo com ícone de lâmpada e animação fade-in
- 11 exercícios com dicas implementadas

#### 🎯 Modo Desafio Cronometrado
- **Desafio Rápido** - 5 exercícios aleatórios em 3 minutos
- Timer visual com contagem regressiva
- Ranking de desempenho (tempo + acertos)
- Histórico de desafios completados
- Badges especiais para desafios

#### 🎬 Sala de Vídeos Educacionais 🆕
- **20 vídeos em português do Brasil** (1 por módulo de Aritmética)
- Canais brasileiros de qualidade:
  - Professor Ferretto (ENEM e Vestibulares)
  - Prof. Gis (Gis com Giz)
  - Matemática Rio (Prof. Rafael Procopio)
  - Marcos Aba (MABA)
  - Dicas de Mat (Sandro Curió)
  - Professora Angela
- **Sistema de Favoritos**: Botão de coração para salvar vídeos
- Seção "Meus Vídeos Favoritos" com acesso rápido
- Contador de favoritos nas estatísticas
- Organização por nível (Básica, Intermediária, Avançada)
- Pontuação: +3 XP por vídeo assistido

#### ✅ Validador de Exercícios 🆕
- Sistema automático de validação de respostas
- Auditoria completa de 500+ exercícios
- Correção de 61 exercícios com respostas erradas
- Scripts de auditoria para manutenção contínua

#### 📊 Gestão de Progresso
- **Dashboard Personalizado**
  - Estatísticas de XP, níveis e sequência
  - Aulas concluídas e taxa de acerto
  - Pontos acumulados (hoje, semana, total)
  - Recomendações de próximas aulas

- **Página "Meu Progresso"**
  - Progresso detalhado por módulo
  - Barra de progresso individual (ex: "Adição: 5/6 exercícios")
  - Taxa de acerto por módulo
  - Sugestões de revisão baseadas em erros
  - Histórico completo de exercícios

- **Sistema de Badges de Progresso**
  - Badge desbloqueado ao completar 100% de um módulo
  - Exibição visual no perfil
  - Incentivo para completar todos os módulos

#### 🎨 Interface e Personalização

- **Sistema de Temas Dinâmicos** 🆕
  - 8 paletas de cores disponíveis:
    - **Azul** (padrão): blue-600 → indigo-600 → purple-600
    - **Vermelho**: red-600 → orange-600 → amber-500
    - **Verde**: green-600 → emerald-600 → teal-600
    - **Roxo**: purple-600 → purple-500 → fuchsia-600
    - **Laranja**: orange-600 → orange-500 → orange-400
    - **Rosa**: pink-600 → pink-500 → pink-400
    - **Teal**: teal-600 → teal-500 → teal-400
    - **Índigo**: indigo-600 → indigo-500 → indigo-400
  - Header com gradiente dinâmico
  - Ícones, badges e cards respondem ao tema
  - Links e elementos de navegação personalizados
  - Mudança instantânea via Perfil

- **Design Responsivo Mobile-First**
  - Botões otimizados para toque (min 48x48px)
  - Layout adaptativo (mobile → tablet → desktop)
  - Menu hambúrguer com navegação completa
  - Sidebar persistente com links rápidos

- **Tipografia Brasileira**
  - Fontes Inter e Lexend via Google Fonts
  - Suporte completo a acentos (á, é, í, ó, ú, ã, õ, ç)

- **Componentes Visuais Interativos**
  - NumberLine (reta numérica animada)
  - MultiplicationMatrix (matriz visual)
  - MultiplicationTable (tabuada interativa)
  - FillInBlanks (preencher lacunas)
  - InteractiveSlider (slider de estimativa)
  - MatchingGame (jogo de correspondência)

- **Feedback Multissensorial**
  - Sons de sucesso/erro
  - Haptic feedback (vibração)
  - Animações de confete
  - Toasts informativos

#### 🎓 Onboarding para Novos Usuários
- **Tour Guiado Mobile-First** (7 etapas)
  1. Boas-vindas e explicação da plataforma
  2. Tour pelo Dashboard (XP, Níveis, Sequência)
  3. Sala de Exercícios Interativos
  4. Módulos e Minhas Disciplinas
  5. Sistema de Conquistas
  6. Dicas Estratégicas
  7. Chamada para ação "Pronto para Começar!"
- Barra de progresso visual (Passo X de 7)
- Botões Voltar/Próximo com navegação
- Opção "Pular Tour" para usuários avançados
- Persistência no banco (hasCompletedOnboarding)

#### 🔐 Autenticação e Perfil
- Autenticação Manus OAuth
- Página de perfil completa:
  - Edição de nome e avatar
  - Seleção de idioma (PT-BR)
  - Escolha de tema de cores
  - Modo escuro (toggle)
  - Badges favoritas (máx. 3)
- Histórico pessoal de progresso
- Matrícula automática em Aritmética

#### 🧪 Qualidade de Código
- 50+ testes unitários (100% passando)
- Zero erros TypeScript críticos
- Linting configurado (ESLint)
- Documentação técnica completa:
  - README.md
  - ARCHITECTURE.md
  - DATABASE.md
  - CHANGELOG.md
  - CONTRIBUTING.md
  - DEVELOPMENT_JOURNEY.md

#### 📊 Experiência do Usuário
- **Conclusão Automática de Aulas**
  - Detecção de scroll até o final da página
  - Marcação automática sem botões manuais
  - Ganho de XP instantâneo
  
- **Barra de Progresso de Leitura**
  - Indicador visual no topo da página
  - Preenchimento gradual conforme scroll
  - Animação suave e responsiva

- **Matrícula Automática**
  - Novos usuários automaticamente inscritos em Aritmética
  - Acesso imediato aos 16 módulos de conteúdo

---

## 🗺️ Roadmap

### **Fase 1: Completar Aritmética** (4-6 semanas) ✅ CONCLUÍDO
- ✅ Criar conteúdo para 16 módulos
- ✅ Implementar exercícios interativos avançados
- ✅ Sistema de dicas contextuais
- ✅ Gamificação completa (XP, níveis, conquistas)

### **Fase 2: Sala de Exercícios Interativos** (2 semanas) ✅ CONCLUÍDO
- ✅ Implementar FillInBlanks, InteractiveSlider, MatchingGame
- ✅ 37+ exercícios organizados por módulo
- ✅ Sistema de pontos e feedback multissensorial
- ✅ Sistema de dicas contextuais

### **Fase 3: Sistema de Progresso e Desafios** (2 semanas) ✅ CONCLUÍDO
- ✅ Página "Meu Progresso" com estatísticas detalhadas
- ✅ Modo Desafio Cronometrado
- ✅ Badges de progresso por módulo
- ✅ Onboarding para novos usuários

### **Fase 4: Personalização e Temas** (1 semana) ✅ CONCLUÍDO
- ✅ Sistema de temas dinâmicos (8 cores)
- ✅ Header com gradiente personalizado
- ✅ Ícones e elementos responsivos ao tema

### **Fase 5: Estruturar Álgebra** (3-4 semanas) 🔄 PRÓXIMO
- 10-12 módulos (Equações, Funções, Polinômios, etc.)
- Exercícios interativos específicos de álgebra
- Componentes visuais (gráficos de funções)

### **Fase 6: Estruturar Geometria** (3-4 semanas)
- 10-12 módulos (Formas, Perímetro, Teorema de Pitágoras, etc.)
- Componentes visuais de geometria

### **Fase 7: Estruturar Cálculo** (3-4 semanas)
- 8-10 módulos (Limites, Derivadas, Integrais, etc.)
- Visualizações de gráficos e funções

### **Fase 8: Melhorias de UX** (2-3 semanas)
- Busca global de conteúdo
- PWA (Progressive Web App)
- CI/CD automatizado
- Testes E2E com Playwright

---

## 🛠️ Tecnologias

### Frontend
- **React 19** - Framework UI
- **TypeScript** - Tipagem estática
- **Tailwind CSS 4** - Estilização
- **Wouter** - Roteamento
- **tRPC** - Type-safe API client
- **React Query** - Gerenciamento de estado
- **KaTeX** - Renderização de LaTeX
- **Lucide React** - Ícones
- **Streamdown** - Renderização de Markdown com streaming
- **Framer Motion** - Animações

### Backend
- **Node.js 22** - Runtime
- **Express 4** - Servidor HTTP
- **tRPC 11** - API type-safe
- **Drizzle ORM** - ORM TypeScript-first
- **MySQL/TiDB** - Banco de dados
- **Manus OAuth** - Autenticação

### Ferramentas
- **Vite** - Build tool
- **Vitest** - Testes unitários
- **ESLint** - Linting
- **pnpm** - Gerenciador de pacotes

---

## 📦 Instalação e Desenvolvimento

### Pré-requisitos
- Node.js 22+
- pnpm 9+
- MySQL 8+ ou TiDB

### Instalação

```bash
# Clonar repositório
git clone https://github.com/MSC-Consultoria/arquimedes0.0.1.git
cd arquimedes0.0.1

# Instalar dependências
pnpm install

# Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com suas credenciais

# Executar migrations do banco
pnpm db:push

# Popular banco com dados de exemplo
pnpm seed
```

### Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
pnpm dev

# Executar testes
pnpm test

# Build para produção
pnpm build

# Executar linting
pnpm lint
```

O servidor estará disponível em `http://localhost:3000`.

---

## 📊 Estatísticas do Projeto

| Métrica | Valor |
|---------|-------|
| **Linhas de Código** | ~15.000+ |
| **Componentes React** | 40+ |
| **Páginas de Aulas** | 9 expandidas |
| **Palavras de Conteúdo** | ~26.500 |
| **Exercícios Totais** | 59+ |
| **Testes Unitários** | 50+ |
| **Cobertura de Testes** | 85%+ |
| **Checkpoints Salvos** | 15+ |
| **Commits** | 50+ |

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor, leia o [CONTRIBUTING.md](CONTRIBUTING.md) para detalhes sobre nosso código de conduta e processo de submissão de pull requests.

### Como Contribuir

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📝 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## 👥 Autores

- **MSC Consultorias** - *Desenvolvimento e Conteúdo* - [GitHub](https://github.com/MSC-Consultoria)
- **Manus AI** - *Assistente de Desenvolvimento* - [Manus](https://manus.im)

---

## 🙏 Agradecimentos

- Comunidade React e TypeScript
- Equipe Manus por fornecer infraestrutura e ferramentas
- Todos os educadores que inspiraram esta abordagem pedagógica
- Beta testers que forneceram feedback valioso

---

## 📞 Contato

- **Email**: contato@msc-consultoria.com.br
- **GitHub Issues**: [Reportar Bug](https://github.com/MSC-Consultoria/arquimedes0.0.1/issues)
- **Discussions**: [Fórum de Discussão](https://github.com/MSC-Consultoria/arquimedes0.0.1/discussions)

---

<div align="center">

**Feito com ❤️ por MSC Consultorias**

[⬆ Voltar ao topo](#-arquimedes---plataforma-de-educação-em-matemática)

</div>
