# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

---

## [2.28.0] - 2024-12-23

### 🎉 Novidades Principais
- **Organização Completa da Documentação** - Estrutura lógica com 4 subpastas temáticas

### ✨ Melhorias de Organização
- Criadas subpastas: `docs/acessibilidade/`, `docs/marketing/`, `docs/deploy/`, `docs/conteudo/`
- Removidos 4 documentos duplicados/desatualizados
- README.md de docs/ atualizado com índice completo
- Estrutura de diretórios otimizada

### 📚 Documentação
- `docs/README.md` - Índice completo da documentação
- Documentos organizados por categoria
- Links atualizados para nova estrutura

---

## [2.27.0] - 2024-12-23

### 🎉 Novidades Principais
- **Estratégia Completa de SEO e Marketing** - Documentação abrangente de 20+ páginas
- **Pauta Editorial para Blog** - 30+ tópicos organizados em 4 pilares
- **Campanhas de Anúncios Pagos** - Estrutura completa Google Ads + Meta Ads

### ✨ Melhorias
- Helpers de structured data (Schema.org) para Course, LearningResource, Article, FAQ, Breadcrumbs
- Componente StructuredData para injeção de JSON-LD
- Gerador de sitemap.xml dinâmico
- Documentação de pixels de rastreamento (Google + Meta)

### 📚 Documentação
- `docs/marketing/ESTRATEGIA_SEO_COMPLETA.md`
- `docs/marketing/PAUTA_EDITORIAL_BLOG.md`
- `docs/marketing/ESTRATEGIA_ANUNCIOS_PAGOS.md`
- `client/src/lib/structuredData.ts`
- `client/src/components/StructuredData.tsx`
- `server/sitemap.ts`

---

## [2.26.0] - 2024-12-23

### 🎉 Novidades Principais
- **Animações de Confete** - Celebrações visuais usando canvas-confetti

### ✨ Melhorias
- Hook `useConfetti` com 6 variações de animações
- Confete ao completar aula automaticamente
- Confete com emoji ✅ ao acertar exercícios
- Confete dourado especial ao completar desafio do dia
- Toast com pontos ganhos ao completar aula

### 📦 Dependências
- Adicionado `canvas-confetti@1.9.3`

---

## [2.25.0] - 2024-12-23

### 🎉 Novidades Principais
- **Navegação Mobile Completa** - MobileNav em todas as 9 páginas principais

### ✨ Melhorias
- MobileNav adicionado em: Dashboard, DisciplinePage, ModulePage, ExerciseRoomPage, VideoRoomPage, ProfilePage, DailyChallengePage
- Scroll suave implementado globalmente
- Animações otimizadas com Framer Motion

---

## [2.24.0] - 2024-12-23

### 🎉 Novidades Principais
- **Barra de Progresso de Leitura** - Indicador visual no topo das páginas de aula

### ✨ Melhorias
- Hook `useReadingProgress` para calcular progresso (0-100%)
- Componente `ReadingProgressBar` com animação suave
- Design minimalista (3px altura, z-50)

---

## [2.23.0] - 2024-12-23

### 🎉 Novidades Principais
- **Conclusão Automática de Aulas** - Marcação automática ao chegar no final

### ✨ Melhorias
- Hook `useScrollToBottom` (threshold 200px)
- Botão "Marcar como Concluído" removido
- Score calculado automaticamente

---

## [2.22.0] - 2024-12-23

### 🎉 Novidades Principais
- **Expansão Massiva de Conteúdo** - 6 páginas expandidas com ~11.000 palavras

### ✨ Melhorias de Conteúdo
- **Adição (3 páginas):** 4 exemplos práticos, 13 exercícios interativos
- **Subtração (3 páginas):** 3 interpretações, 5 exemplos, 13 exercícios
- **Total:** 22 exercícios interativos, 9 exemplos práticos

---

## [2.21.0] - 2024-12-23

### 🎉 Novidades Principais
- **Transformação Visual Completa** - Redesign do Dashboard

### ✨ Melhorias Visuais
- Dashboard com hero impactante (gradiente azul-roxo)
- Glassmorphism em cards de estatísticas
- Animações fluidas com Framer Motion
- Sistema de cores por módulo (8 módulos)
- Loading states e empty states ilustrados

### 📦 Dependências
- Adicionado `framer-motion@11.15.0`

---

## [2.20.0] - 2024-12-23

### 🎉 Novidades Principais
- **Plano Completo de Testes de Acessibilidade** - Documentação de 60+ páginas

### 📚 Documentação
- `docs/acessibilidade/ACCESSIBILITY_TESTING_PLAN.md`
- `docs/acessibilidade/ACCESSIBILITY_AUDIT_CHECKLIST.md` (100+ itens)
- `docs/acessibilidade/ACCESSIBILITY_TESTING_README.md`
- `scripts/test-accessibility.mjs` (axe-core + Puppeteer)

---

## [2.19.0] - 2024-12-23

### 🎉 Novidades Principais
- **Matrícula Automática em Aritmética** - Novos usuários inscritos automaticamente

### ✨ Melhorias
- Função `autoEnrollInAritmetica()` no db.ts
- Integração no fluxo de onboarding
- 3 novos testes unitários passando

### 🧪 Testes
- Total: 50/50 passando (100%)

---

## [2.18.2] - 2024-12-23

### 🐛 Correções
- Corrigido texto sobreposto nas Tabs de módulos
- Corrigido layout da Sala de Vídeos no mobile
- Corrigido layout da Sala de Exercícios no mobile
- Disciplina ativa destacada em verde com badge "Cursando"
- Regex incompatível corrigida para ES6

---

## [2.3.0] - 2024-12-23

### 🐛 Corrigido
- **Tipografia do símbolo R$**: Símbolo monetário brasileiro agora é protegido contra interpretação LaTeX, evitando renderização quebrada como itálico
- **Layout mobile dos botões de navegação**: Botões "Anterior" e "Próximo" agora são empilhados verticalmente em mobile e têm largura máxima de 100% da tela, eliminando scroll horizontal
- **Testes unitários**: Corrigidos 9 testes que falhavam após renomeação de "matematica-basica" para "aritmetica"

### ✨ Adicionado
- **Reestruturação em 4 áreas de conhecimento**:
  - Aritmética (15 módulos estruturados)
  - Álgebra (estrutura planejada)
  - Geometria (estrutura planejada)
  - Cálculo (estrutura planejada)
- **12 novos módulos de Aritmética** (placeholders para expansão futura):
  - Frações
  - Decimais
  - Porcentagem
  - Razão e Proporção
  - Potenciação
  - Radiciação
  - Números Inteiros
  - Múltiplos e Divisores
  - Números Primos
  - Expressões Numéricas
  - Sistemas de Medidas
  - Matemática Financeira Básica
- **Documentação de projeto**:
  - `PROJECT_STATUS.md` com análise detalhada de progresso (65% concluído)
  - Roadmap de 5 fases de desenvolvimento
  - Métricas atualizadas do projeto

### 🔄 Alterado
- **Disciplina "Matemática Básica" renomeada para "Aritmética"**: Reflete melhor a estrutura acadêmica tradicional
- **README.md atualizado**: Agora inclui badge de progresso, métricas atualizadas e link para status do projeto
- **Botões de navegação**: Altura mínima de 48px para melhor acessibilidade mobile
- **Ícones nos botões**: `flex-shrink-0` aplicado para evitar compressão em textos longos

### 📊 Métricas Atuais
- 4 disciplinas (Aritmética, Álgebra, Geometria, Cálculo)
- 15 módulos de Aritmética
- 12 páginas de conteúdo educacional
- 265 exercícios interativos
- 19.736 palavras de conteúdo
- 19/19 testes unitários passando (100%)
- Progresso geral: 65% (232/355 tarefas concluídas)

---

## [0.4.1] - 2024-12-23

### Adicionado
- Indicadores de progresso em porcentagem ao lado de cada módulo no menu hambúrguer
- Endpoints tRPC `moduleProgress.byModule` e `moduleProgress.allModules`
- Helpers de banco de dados `getModuleProgress` e `getAllModulesProgress`
- Badges visuais coloridos para progresso (vermelho 0-30%, amarelo 31-70%, verde 71-100%)
- Sistema de cálculo automático de progresso por módulo

### Corrigido
- Referências de `trpc.progress` para `trpc.moduleProgress` em componentes
- Testes unitários atualizados para nova estrutura de routers

## [0.4.0] - 2024-12-23

### Adicionado
- Menu hambúrguer mobile com navegação lateral deslizante
- Botão fixo no canto superior esquerdo para acesso rápido
- Accordion expansível para disciplinas e módulos
- Quick links (Início/Perfil) no menu
- Autenticação integrada no menu (Entrar/Sair)
- Overlay escuro automático ao abrir menu
- ScrollArea para conteúdo longo
- Ícones coloridos por módulo no menu

### Melhorado
- Experiência de navegação em dispositivos móveis
- Acessibilidade com fechamento via ESC ou clique fora

## [0.3.1] - 2024-12-23

### Adicionado
- Otimização completa Mobile First
- Hero section compacto (padding reduzido 67%)
- Títulos e textos responsivos em 3 breakpoints
- Botões e inputs empilhados verticalmente em mobile
- Áreas de toque mínimas de 48x48px
- Breadcrumb com scroll horizontal
- Grids adaptativos (1→2→3 colunas)
- Viewport tag otimizada

### Melhorado
- Experiência em iPhone SE (375px) e iPhone 12/13/14 (390px)
- Legibilidade em telas pequenas
- Performance de scroll

## [0.3.0] - 2024-12-23

### Adicionado
- Sistema de design completo com paleta de cores expandida
- 9 ícones SVG customizados para operações matemáticas
- Hero section com gradiente azul e decorações
- Cards com sombras elevadas e hover effects
- Animações suaves e transições
- Responsividade mobile-first
- Cores específicas por módulo (verde, laranja, roxo, cyan)

### Melhorado
- Design visual profissional e moderno
- Contraste e legibilidade
- Feedback visual em interações

## [0.2.3] - 2024-12-23

### Adicionado
- Meta tags de SEO completas
- Meta description (155 caracteres)
- Meta keywords relevantes
- Open Graph tags para redes sociais
- Twitter Cards
- Canonical URLs
- Componente SEO reutilizável para páginas dinâmicas
- Idioma atualizado para pt-BR

### Melhorado
- Indexação por motores de busca
- Compartilhamento social

## [0.2.2] - 2024-12-23

### Adicionado
- Arquitetura dual de banco de dados (Manus MySQL + Supabase PostgreSQL)
- Adaptador que alterna via variável `DB_MODE`
- Schema PostgreSQL compatível
- Cliente Supabase configurado
- Documentação completa de integração

### Melhorado
- Flexibilidade entre desenvolvimento e produção
- Preparação para deploy com banco permanente

## [0.2.1] - 2024-12-23

### Adicionado
- Componentes visuais interativos (NumberLine, MultiplicationMatrix)
- Página `/visuals` com demonstrações completas
- Animações para ensino de matemática
- Reta numérica animada
- Matriz visual para multiplicação
- Tabuada organizada

### Melhorado
- Conteúdo da primeira aula de adição expandido para 2000+ palavras
- Exemplos práticos do cotidiano

## [0.2.0] - 2024-12-22

### Adicionado
- Sistema de navegação hierárquica (Disciplina → Módulo → Página)
- Breadcrumb intuitivo
- Renderização de equações LaTeX (KaTeX)
- Sistema de exercícios interativos com validação automática
- Feedback imediato ao aluno
- Histórico de tentativas
- Gestão de progresso do usuário
- Dashboard do aluno com métricas
- Sistema de recomendações de próximas aulas
- Integração LLM para geração de exercícios personalizados
- Sistema de notificações (proprietário e alunos)
- Módulo 1 completo com 3 submódulos (9 páginas)
  - Adição e Subtração (3 páginas)
  - Multiplicação (3 páginas)
  - Divisão (3 páginas)
- Autenticação Manus OAuth
- Perfil de usuário com histórico

### Técnico
- Stack: React 19 + TypeScript + tRPC + Drizzle ORM
- Banco de dados: MySQL/TiDB
- UI: Tailwind CSS 4 + shadcn/ui
- Testes: Vitest (14 testes passando)

---

## Próximas Versões Planejadas

### [0.5.0] - Planejado
- Ícone de check verde para módulos 100% completos
- Sistema de busca rápida no menu
- Modo offline (PWA) com Service Worker
- Expansão de conteúdo das aulas restantes
- Suporte a vídeos do YouTube
- Diagramas interativos SVG

### [1.0.0] - Planejado
- Módulos completos de Física (5 módulos)
- Sistema de conquistas gamificado
- Certificados de conclusão
- Modo professor/administrador
- Analytics avançado

---

## Convenções de Versionamento

- **MAJOR** (X.0.0): Mudanças incompatíveis na API
- **MINOR** (0.X.0): Novas funcionalidades compatíveis
- **PATCH** (0.0.X): Correções de bugs

---

**Desenvolvido com ❤️ pela MSC Consultorias**
