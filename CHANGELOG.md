# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

---

## [2.46.0] - 2024-12-25

### ✨ Adicionado
- **Sala de Vídeos Educacionais**: 20 vídeos em português do Brasil (1 por módulo de Aritmética)
- Canais brasileiros: Professor Ferretto, Prof. Gis, Matemática Rio, Marcos Aba, Dicas de Mat, Professora Angela
- **Sistema de Favoritos para Vídeos**: Botão de coração em cada card de vídeo
- Seção "Meus Vídeos Favoritos" com filtro clicável
- Contador de favoritos nas estatísticas
- Tabela `video_favorites` no banco de dados
- **Validador de Exercícios**: Sistema automático de validação de respostas
- Auditoria completa de 500+ exercícios
- Correção de 61 exercícios com respostas erradas
- Scripts de auditoria: `audit-exercises.mjs`, `full-exercise-audit.mjs`

### 🔧 Modificado
- VideoRoomPage.tsx refatorado com sistema de favoritos
- db.ts expandido com funções de favoritos (toggleVideoFavorite, getUserFavoriteVideos, isVideoFavorited)
- routers.ts com endpoints de favoritos (toggleFavorite, getFavorites, getFavoriteIds)
- schema.ts com tabela video_favorites

### 📝 Documentação
- README.md atualizado com Sala de Vídeos e Sistema de Favoritos
- VIDEOS_PTBR_VERIFICADOS.md com lista completa de vídeos
- AUDITORIA_EXERCICIOS.md com relatório de correções

---

## [2.45.0] - 2024-12-24

### ✨ Adicionado
- **Sistema de Temas Dinâmicos**: 8 paletas de cores disponíveis (Azul, Vermelho, Verde, Roxo, Laranja, Rosa, Teal, Índigo)
- Header do Dashboard com gradiente dinâmico responsivo ao tema escolhido
- Ícones, badges e cards agora usam variáveis CSS dinâmicas (--icon-color, --badge-color)
- Links e elementos de navegação respondem ao tema selecionado
- Classes CSS para hover dinâmico (.group-hover\:border-primary, .group-hover\:text-primary)

### 🔧 Modificado
- ThemeContext expandido com gradientes completos para todas as 8 cores
- Dashboard.tsx refatorado para usar variáveis CSS em vez de cores hardcoded
- index.css atualizado com suporte a hover dinâmico

### 📝 Documentação
- README.md atualizado com seção "Sistema de Temas Dinâmicos"
- Progresso do projeto atualizado para 85%

---

## [2.44.0] - 2024-12-23

### ✨ Adicionado
- **Modo Desafio Cronometrado**: 5 exercícios aleatórios em 3 minutos
- Timer visual com contagem regressiva
- Ranking de desempenho (tempo + acertos)
- Histórico de desafios completados
- Badges especiais para desafios

### 🔧 Modificado
- DailyChallengePage.tsx criado com lógica completa de desafio
- Sistema de pontos integrado com desafios

---

## [2.43.0] - 2024-12-22

### ✨ Adicionado
- **Página "Meu Progresso"**: Estatísticas detalhadas por módulo
- Barra de progresso individual para cada módulo (ex: "Adição: 5/6 exercícios")
- Taxa de acerto por módulo
- Sugestões de revisão baseadas em erros frequentes
- Histórico completo de exercícios completados
- **Badges de Progresso**: Desbloqueados ao completar 100% de um módulo
- **Onboarding para Novos Usuários**: Tour guiado mobile-first em 7 etapas
- Componente OnboardingTour.tsx com navegação completa
- Campo hasCompletedOnboarding no banco de dados

### 🔧 Modificado
- ProgressPage.tsx criado com visualizações detalhadas
- Dashboard.tsx integrado com onboarding
- Routers.ts com mutation completeOnboarding

### 🐛 Corrigido
- Bug de navegação entre páginas do módulo Subtração (páginas 3-6 estavam vazias)
- Deletadas páginas vazias e criada nova Aula 3: "Aplicações Práticas da Subtração" (~5.800 palavras)

---

## [2.42.0] - 2024-12-21

### ✨ Adicionado
- **Sistema de Dicas Contextuais**: Botão "💡 Dica" em exercícios difíceis e moderados
- 11 exercícios com dicas estratégicas implementadas
- Card amarelo com ícone de lâmpada e animação fade-in
- Dicas ensinam métodos de resolução sem entregar respostas

### 🔧 Modificado
- FillInBlanks.tsx com prop `hint` opcional
- InteractiveSlider.tsx com prop `hint` opcional
- MatchingGame.tsx com prop `hint` opcional
- UnifiedExerciseRoomPage.tsx com dicas para 7 MatchingGame e 4 InteractiveSlider

---

## [2.41.0] - 2024-12-20

### ✨ Adicionado
- **Sala de Exercícios Interativos**: 37+ exercícios organizados em 7 módulos
- **FillInBlanks** (Preencher Lacunas): 20+ exercícios
- **InteractiveSlider** (Slider de Estimativa): 10+ exercícios
- **MatchingGame** (Jogo de Correspondência): 7+ exercícios
- Sistema de pontos integrado (5/10/15 pts baseado em dificuldade)
- Feedback multissensorial (sons, haptic, toasts)
- Distribuição por dificuldade (60% fácil, 30% médio, 10% difícil)

### 🔧 Modificado
- UnifiedExerciseRoomPage.tsx criado com tabs por módulo
- Componentes FillInBlanks.tsx, InteractiveSlider.tsx, MatchingGame.tsx
- Sidebar atualizada com link "Exercícios Interativos"

---

## [2.40.0] - 2024-12-19

### ✨ Adicionado
- **Navegação Consistente**: Sidebar adicionada em todas as páginas principais
- DisciplinesPage.tsx com Sidebar
- ExerciseRoomPage.tsx com Sidebar
- AchievementsPage.tsx com Sidebar
- Margin-left lg:ml-72 para compensar sidebar

### 🐛 Corrigido
- Classe CSS desconhecida `heading-primary` removida
- Erros TypeScript não-críticos em AchievementsPage.tsx

---

## [2.39.0] - 2024-12-18

### ✨ Adicionado
- **Sistema de Conquistas**: 26 badges por marcos alcançados
- Página AchievementsPage.tsx dedicada
- Badges favoritas exibidas no perfil (máx. 3)
- Confete dourado especial ao completar desafio do dia

### 🔧 Modificado
- Schema do banco com tabela `achievements` e `userAchievements`
- Routers.ts com endpoints de conquistas
- ProfilePage.tsx com seleção de badges favoritas

---

## [2.38.0] - 2024-12-17

### ✨ Adicionado
- **Gamificação Completa**: Sistema de XP, níveis e streaks
- Barra de progresso visual com porcentagem
- Animações de confete ao completar aulas e exercícios
- Dashboard personalizado com métricas detalhadas

### 🔧 Modificado
- Schema do banco com campos de gamificação
- Routers.ts com endpoints de XP e pontos
- Dashboard.tsx com estatísticas visuais

---

## [2.37.0] - 2024-12-16

### ✨ Adicionado
- **Conclusão Automática de Aulas**: Detecção de scroll até o final
- Barra de progresso de leitura no topo da página
- Ganho de XP instantâneo ao completar aula

### 🔧 Modificado
- LessonPage.tsx com lógica de detecção de scroll
- Mutation completeLesson integrada

---

## [2.36.0] - 2024-12-15

### ✨ Adicionado
- **Módulo Divisão Completo**: 3 páginas (~8.800 palavras)
  1. Conceitos Fundamentais da Divisão
  2. Divisão com Resto e Divisão Exata
  3. Aplicações Práticas da Divisão

### 🔧 Modificado
- Seed do banco atualizado com conteúdo de Divisão
- Estrutura escaneável com títulos, subtítulos e listas

---

## [2.35.0] - 2024-12-14

### ✨ Adicionado
- **Módulo Multiplicação Completo**: 3 páginas (~9.200 palavras)
  1. Conceitos Fundamentais da Multiplicação
  2. Propriedades da Multiplicação
  3. Aplicações Práticas da Multiplicação

### 🔧 Modificado
- Seed do banco atualizado com conteúdo de Multiplicação
- Componentes visuais MultiplicationMatrix e MultiplicationTable

---

## [2.34.0] - 2024-12-13

### ✨ Adicionado
- **Módulo Adição e Subtração Completo**: 3 páginas (~8.500 palavras)
  1. A Reta Numérica: Visualizando o Movimento
  2. Conceitos Fundamentais de Adição
  3. Aplicações Práticas da Subtração

### 🔧 Modificado
- Seed do banco atualizado com conteúdo expandido
- Componente NumberLine.tsx criado

---

## [2.33.0] - 2024-12-12

### 🐛 Corrigido
- **Bug #4: Vídeos do YouTube Quebrando Formatação**: Removidos todos os vídeos das páginas de aula
- Estrutura preparada para futura "Sala de Vídeos" separada

---

## [2.32.0] - 2024-12-11

### 🐛 Corrigido
- **Bug #5: Escaneabilidade Ruim do Conteúdo**: Refatoração completa da estrutura de aulas
- Adicionados títulos, subtítulos, listas e tabelas
- Melhorada hierarquia visual

---

## [2.31.0] - 2024-12-10

### ✨ Adicionado
- **Sistema de Exercícios Tradicionais**: 22 exercícios com feedback imediato
- Validação automática de respostas
- Histórico de tentativas do aluno

### 🔧 Modificado
- ExerciseRoomPage.tsx criado
- Schema do banco com tabela `exercises` e `userExercises`

---

## [2.30.0] - 2024-12-09

### ✨ Adicionado
- **Estrutura de 16 Módulos de Aritmética**: Planejamento completo
- Seed do banco com disciplinas, módulos e páginas

### 🔧 Modificado
- Schema do banco com relacionamentos completos
- Routers.ts com endpoints de disciplinas e módulos

---

## [2.20.0] - 2024-12-08

### ✨ Adicionado
- **Autenticação Manus OAuth**: Login e logout funcionais
- Página de perfil do usuário
- Matrícula automática em Aritmética

### 🔧 Modificado
- Routers.ts com endpoints de autenticação
- ProfilePage.tsx criado

---

## [2.10.0] - 2024-12-07

### ✨ Adicionado
- **Navegação Hierárquica**: Disciplina → Módulo → Página
- Breadcrumb intuitivo
- Sidebar persistente

### 🔧 Modificado
- App.tsx com rotas completas
- Sidebar.tsx criado

---

## [2.0.0] - 2024-12-06

### ✨ Adicionado
- **Estrutura Inicial do Projeto**: Scaffold completo com tRPC + Manus Auth + Database
- Schema do banco de dados completo
- Routers tRPC básicos

### 🔧 Modificado
- Configuração inicial do Vite
- Configuração do Drizzle ORM

---

## [1.0.0] - 2024-12-05

### ✨ Adicionado
- **Projeto Criado**: Inicialização do repositório
- README.md inicial
- LICENSE (MIT)

---

## Tipos de Mudanças

- `✨ Adicionado` para novas funcionalidades
- `🔧 Modificado` para mudanças em funcionalidades existentes
- `🗑️ Removido` para funcionalidades removidas
- `🐛 Corrigido` para correções de bugs
- `🔒 Segurança` para correções de vulnerabilidades
- `📝 Documentação` para mudanças na documentação
- `⚡ Performance` para melhorias de performance
- `♻️ Refatoração` para mudanças de código que não alteram funcionalidade

---

## Links de Versões

- [2.45.0]: https://github.com/MSC-Consultoria/arquimedes0.0.1/compare/v2.44.0...v2.45.0
- [2.44.0]: https://github.com/MSC-Consultoria/arquimedes0.0.1/compare/v2.43.0...v2.44.0
- [2.43.0]: https://github.com/MSC-Consultoria/arquimedes0.0.1/compare/v2.42.0...v2.43.0
- [2.42.0]: https://github.com/MSC-Consultoria/arquimedes0.0.1/compare/v2.41.0...v2.42.0
- [2.41.0]: https://github.com/MSC-Consultoria/arquimedes0.0.1/compare/v2.40.0...v2.41.0
- [2.40.0]: https://github.com/MSC-Consultoria/arquimedes0.0.1/compare/v2.39.0...v2.40.0
