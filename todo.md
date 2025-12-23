# Arquimedes - Lista de Funcionalidades

## Infraestrutura e Banco de Dados
- [x] Criar schema completo do banco de dados (disciplinas, módulos, páginas, exercícios, progresso)
- [x] Configurar relacionamentos entre tabelas
- [x] Executar migrations do banco de dados

## Backend e APIs
- [x] Implementar routers tRPC para disciplinas e módulos
- [x] Criar endpoints para páginas e conteúdo educacional
- [x] Desenvolver sistema de exercícios com validação
- [x] Integrar LLM para geração automática de exercícios
- [x] Criar APIs de gestão de progresso do usuário
- [x] Implementar sistema de notificações (proprietário e alunos)

## Interface e Navegação
- [x] Criar layout principal da plataforma
- [x] Implementar navegação hierárquica (Disciplina → Módulo → Página)
- [x] Desenvolver componente de breadcrumb
- [x] Criar índice interativo de conteúdo
- [x] Implementar página inicial com apresentação da plataforma

## Sistema de Conteúdo
- [x] Criar componente para renderização de texto formatado
- [x] Implementar suporte a equações LaTeX
- [ ] Adicionar suporte a embeds de YouTube
- [ ] Criar componente para exibição de diagramas e imagens
- [x] Desenvolver estrutura de página de aula

## Exercícios Interativos
- [x] Criar componente de exercício com input simples
- [x] Implementar exercícios de problemas práticos
- [x] Adicionar validação automática de respostas
- [x] Desenvolver sistema de feedback imediato
- [x] Criar histórico de tentativas do aluno

## Gestão de Progresso
- [x] Implementar rastreamento de aulas completadas
- [x] Criar sistema de pontuação
- [x] Desenvolver algoritmo de recomendação de próximas aulas
- [x] Criar dashboard do aluno
- [x] Implementar resumo de aprendizado

## Conteúdo do Módulo 1
- [x] Página 1.1: Adição - O que é Adicionar (Combinar)
- [x] Página 1.2: Adição - A Reta Numérica
- [x] Página 1.3: Adição - Exercícios Práticos
- [x] Página 2.1: Subtração - O que é Subtrair (Separar e Comparar)
- [x] Página 2.2: Subtração - Visualizando o Movimento
- [x] Página 2.3: Subtração - Exercícios Práticos
- [x] Página 3.1: Multiplicação - Soma Repetida
- [x] Página 3.2: Multiplicação - A Tabuada
- [x] Página 3.3: Multiplicação - Visualização em Matrizes
- [x] Página 4.1: Divisão - Operação Inversa da Multiplicação
- [x] Página 4.2: Divisão - Repartição Justa (Quociente)
- [x] Página 4.3: Divisão - Conceito de Resto

## Autenticação e Perfil
- [x] Configurar autenticação Manus OAuth
- [x] Criar página de perfil do usuário
- [x] Implementar histórico pessoal de progresso

## Polimento e Testes
- [ ] Garantir responsividade mobile
- [ ] Testar acessibilidade
- [ ] Validar todos os fluxos de usuário
- [ ] Escrever testes unitários para backend
- [ ] Otimizar performance de carregamento

## Deploy
- [ ] Criar checkpoint final
- [ ] Verificar todas as funcionalidades
- [ ] Preparar documentação de uso


## Preparação do Repositório GitHub
- [x] Criar README.md completo com arquitetura e documentação
- [x] Adicionar CONTRIBUTING.md com guia de contribuição
- [x] Criar LICENSE (MIT)
- [ ] Adicionar .github/workflows para CI/CD
- [x] Criar ARCHITECTURE.md com diagramas
- [x] Adicionar DATABASE.md com guia de acesso ao banco
- [x] Gerar screenshots da aplicação
- [x] Criar .gitignore apropriado
- [x] Inicializar repositório Git
- [x] Fazer commit inicial
- [x] Criar CHANGELOG.md
- [x] Criar templates de issues (bug report, feature request)
- [x] Criar template de pull request
- [x] Criar guia de deploy no GitHub (DEPLOY_GITHUB.md)


## Expansão de Conteúdo Educacional
- [x] Expandir páginas de Adição (adicionar exemplos, contextos práticos)
- [ ] Expandir páginas de Subtração (adicionar mais exercícios)
- [ ] Expandir páginas de Multiplicação (adicionar visualizações)
- [ ] Expandir páginas de Divisão (adicionar conceitos avançados)
- [ ] Adicionar mais exercícios práticos por página
- [ ] Criar vídeos explicativos (ou embeds do YouTube)

## Design Visual e Diagramas
- [x] Criar diagramas de retas numéricas interativas
- [x] Criar visualizações de matrizes para multiplicação
- [x] Criar ilustrações de conceitos matemáticos
- [x] Melhorar design da página inicial
- [x] Adicionar animações e transições suaves
- [x] Criar paleta de cores mais rica
- [x] Design de cards de exercícios mais atraente
- [x] Criar página de demonstração de visualizações (/visuals)
- [x] Adicionar componente NumberLine (reta numérica animada)
- [x] Adicionar componente MultiplicationMatrix (matriz visual)
- [x] Adicionar componente MultiplicationTable (tabuada visual)


## Integração com Supabase
- [x] Configurar variáveis de ambiente do Supabase
- [x] Criar schema PostgreSQL compatível
- [x] Criar adaptador de banco dual (Manus + Supabase)
- [ ] Migrar dados para Supabase (fora do sandbox)
- [ ] Configurar Row Level Security (RLS)
- [ ] Criar scripts de exportação/importação
- [x] Documentar integração


## Otimização SEO
- [x] Adicionar meta description (50-160 caracteres)
- [x] Adicionar meta keywords
- [x] Adicionar Open Graph tags (Facebook/LinkedIn)
- [x] Adicionar Twitter Card tags
- [x] Adicionar canonical URL
- [x] Otimizar títulos das páginas
- [x] Criar componente SEO para páginas dinâmicas
- [x] Atualizar lang para pt-BR
- [ ] Adicionar structured data (Schema.org)
- [ ] Criar imagem og-image.png para compartilhamento social


## Design Visual e Brand Guidelines
- [x] Criar paleta de cores expandida (primária, secundária, neutros, feedback)
- [x] Definir sistema de tipografia (tamanhos, pesos, line-heights)
- [x] Implementar ícones customizados para cada módulo
- [x] Criar componentes visuais reutilizáveis
- [x] Melhorar layout da página inicial
- [x] Adicionar ilustrações matemáticas SVG
- [x] Implementar animações e transições suaves
- [ ] Criar guia de estilo visual documentado
- [x] Adicionar gradientes e efeitos visuais
- [x] Melhorar cards e componentes de UI
- [x] Adicionar hover effects e elevação aos cards
- [x] Criar ícones SVG customizados (Adição, Subtração, Multiplicação, Divisão)
- [x] Implementar cores específicas por módulo (verde, laranja, roxo, cyan)


## Otimização Mobile First
- [x] Reduzir tamanhos de fonte para mobile (hero, títulos, parágrafos)
- [x] Ajustar espaçamentos e padding para telas pequenas
- [x] Otimizar cards de dashboard para layout vertical mobile
- [x] Melhorar botões e áreas de toque (min 48x48px)
- [x] Simplificar navegação para mobile (breadcrumb scroll horizontal)
- [x] Otimizar ExerciseCard para mobile (inputs e botões empilhados)
- [x] Otimizar LessonPage para mobile
- [x] Otimizar Home para mobile
- [ ] Testar em viewport 375px (iPhone SE)
- [ ] Testar em viewport 390px (iPhone 12/13/14)
- [ ] Garantir scroll suave e performance
- [ ] Adicionar meta viewport tag


## Menu Hambúrguer Mobile
- [x] Criar componente MobileNav com ícone hambúrguer
- [x] Implementar Sheet/Drawer lateral deslizante
- [x] Adicionar lista de disciplinas no menu
- [x] Adicionar lista de módulos expandíveis (Accordion)
- [x] Implementar navegação para páginas/aulas
- [x] Adicionar animações de abertura/fechamento (shadcn Sheet)
- [x] Garantir overlay escuro ao abrir menu
- [x] Adicionar botão de fechar (X) automático
- [x] Integrar com autenticação (mostrar perfil e logout)
- [x] Adicionar ícones coloridos por módulo
- [x] Adicionar botão fixo no canto superior esquerdo
- [x] Integrar MobileNav na Home
- [x] Integrar MobileNav no LessonPage
- [ ] Testar gestos de swipe para fechar
- [ ] Adicionar MobileNav em outras páginas


## Indicador de Progresso no Menu
- [x] Criar query tRPC para calcular progresso por módulo
- [x] Adicionar helper no db.ts para contar páginas completadas
- [x] Calcular porcentagem (páginas completadas / total de páginas)
- [x] Atualizar MobileNav para buscar progresso
- [x] Exibir porcentagem ao lado do nome do módulo
- [x] Adicionar badge visual colorido (0-30% vermelho, 31-70% amarelo, 71-100% verde)
- [ ] Adicionar ícone de check para módulos 100% completos
- [ ] Testar cálculos com diferentes estados de progresso
- [x] Adicionar loading state durante fetch de progresso (enabled: isAuthenticated)


## Push para GitHub
- [x] Atualizar README.md com funcionalidades atuais
- [x] Atualizar CHANGELOG.md com todas as versões (v0.2.0 até v0.4.1)
- [x] Criar issues para próximos passos (7 issues criadas)
- [x] Adicionar remote do GitHub
- [x] Fazer commit de todas as mudanças (commit 7e853b1)
- [x] Push para repositório remoto (278 objetos enviados)
- [x] Verificar se push foi bem-sucedido

### Issues Criadas
- Issue #1: Ícone de check verde para módulos 100% completos
- Issue #2: Sistema de busca rápida no menu hambúrguer
- Issue #3: Modo offline (PWA) com Service Worker
- Issue #4: Expandir conteúdo das aulas de Multiplicação
- Issue #5: Expandir conteúdo das aulas de Divisão
- Issue #6: Suporte a vídeos do YouTube nas aulas
- Issue #7: Diagramas interativos SVG

### Repositório
- URL: https://github.com/arquimedes-msc/arquimedes-v.0.2.0


## Transformação Visual Inspirada no Brilliant (v0.5.0)

### Gamificação Completa
- [x] Implementar sistema de Streaks (sequências de dias consecutivos)
- [x] Criar banco de dados para rastrear streaks por usuário
- [ ] Adicionar notificações de streak em risco
- [x] Criar sistema de Achievements (conquistas/badges)
- [ ] Definir conquistas (ex: "Primeira Aula", "Streak de 7 dias", "Módulo Completo")
- [x] Criar componente visual de badge
- [ ] Adicionar página de conquistas do usuário
- [x] Implementar sistema de XP (pontos de experiência)
- [x] Criar níveis baseados em XP
- [ ] Adicionar animações de level-up
- [x] Criar StreakDisplay component
- [x] Criar XPDisplay component
- [x] Criar AchievementsDisplay component
- [x] Integrar gamificação na Home
- [x] Criar testes unitários (5 testes passando)

### Componentes Interativos Avançados
- [ ] Criar componente Drag-and-Drop para ordenação
- [ ] Criar componente Slider interativo para valores
- [ ] Criar Canvas de exploração livre (pré-teste)
- [ ] Implementar componente de matching (arrastar para conectar)
- [ ] Criar componente de preenchimento de lacunas
- [ ] Adicionar componente de múltipla escolha visual
- [ ] Criar componente de desenho livre (para geometria)

### Feedback Visual e Sonoro
- [ ] Adicionar sons de acerto (positivo)
- [ ] Adicionar sons de erro (neutro, não punitivo)
- [ ] Criar animações de confete para conquistas
- [ ] Implementar vibração no mobile para feedback tátil
- [ ] Adicionar partículas visuais em acertos
- [ ] Criar transições suaves entre estados
- [ ] Implementar micro-animações em botões

### Expansão de Conteúdo - 4 Operações Básicas
- [ ] Expandir Adição Página 1 (adicionar 3+ exemplos práticos)
- [ ] Expandir Adição Página 2 (adicionar exercícios interativos)
- [ ] Expandir Adição Página 3 (adicionar desafios progressivos)
- [ ] Expandir Subtração Página 1 (2000+ palavras)
- [ ] Expandir Subtração Página 2 (adicionar visualizações)
- [ ] Expandir Subtração Página 3 (exercícios variados)
- [ ] Expandir Multiplicação Página 1 (contextos do cotidiano)
- [ ] Expandir Multiplicação Página 2 (estratégias de memorização)
- [ ] Expandir Multiplicação Página 3 (aplicações práticas)
- [ ] Expandir Divisão Página 1 (conceitos profundos)
- [ ] Expandir Divisão Página 2 (divisão com resto)
- [ ] Expandir Divisão Página 3 (problemas complexos)

### Novos Módulos de Matemática
- [ ] Criar Módulo 5: Proporção e Razão
  - [ ] Página 1: O que é Proporção
  - [ ] Página 2: Razão e Comparação
  - [ ] Página 3: Regra de Três Simples
- [ ] Criar Módulo 6: Porcentagem
  - [ ] Página 1: Conceito de Porcentagem
  - [ ] Página 2: Cálculos de Porcentagem
  - [ ] Página 3: Aplicações Práticas (descontos, juros)
- [ ] Criar Módulo 7: Exponenciação
  - [ ] Página 1: Potências e Expoentes
  - [ ] Página 2: Propriedades das Potências
  - [ ] Página 3: Notação Científica
- [ ] Criar Módulo 8: Fatoração
  - [ ] Página 1: Números Primos
  - [ ] Página 2: Fatoração em Primos
  - [ ] Página 3: MDC e MMC

### Melhorias Visuais Gerais
- [ ] Redesenhar página inicial com hero mais impactante
- [ ] Criar ilustrações customizadas para cada módulo
- [ ] Adicionar animações de entrada (fade-in, slide-in)
- [ ] Melhorar tipografia (hierarquia visual)
- [ ] Criar sistema de cores por módulo (color-coding)
- [ ] Adicionar dark mode
- [ ] Melhorar espaçamentos e respiração visual
- [ ] Criar loading states animados
- [ ] Adicionar empty states ilustrados


## Expansão Profunda de Conteúdo (5000+ palavras por página)

### Adição
- [x] Expandir Página 1: O que é Adicionar (Combinar) - 5000+ palavras
  - [x] Adicionar 5+ exemplos de orçamento familiar
  - [x] Incluir calculadora de orçamento mensal
  - [x] Adicionar exercícios de planejamento financeiro
- [ ] Expandir Página 2: A Reta Numérica - 5000+ palavras
  - [ ] Visualização interativa de reta numérica
  - [ ] Exemplos de saldo bancário
  - [ ] Exercícios de movimentação financeira
  - [ ] Placeholder para vídeo do YouTube
  - [ ] Diagramas SVG de reta numérica
- [ ] Expandir Página 3: Exercícios Práticos - 5000+ palavras
  - [ ] 10+ problemas de orçamento real
  - [ ] Cenários de compras e economia
  - [ ] Desafios progressivos
  - [ ] Componentes interativos com feedback sonoro

### Subtração
- [ ] Expandir Página 1: O que é Subtrair - 5000+ palavras
- [ ] Expandir Página 2: Visualizando o Movimento - 5000+ palavras
- [ ] Expandir Página 3: Exercícios Práticos - 5000+ palavras

### Multiplicação
- [ ] Expandir Página 1: Soma Repetida - 5000+ palavras
- [ ] Expandir Página 2: A Tabuada - 5000+ palavras
- [ ] Expandir Página 3: Visualização em Matrizes - 5000+ palavras

### Divisão
- [ ] Expandir Página 1: Operação Inversa - 5000+ palavras
- [ ] Expandir Página 2: Repartição Justa - 5000+ palavras
- [ ] Expandir Página 3: Conceito de Resto - 5000+ palavras


## Componente YouTubeEmbed
- [x] Criar componente YouTubeEmbed.tsx
- [x] Aceitar videoId como prop
- [x] Renderizar player responsivo (16:9)
- [x] Adicionar controles personalizados
- [x] Suporte a autoplay e loop (opcionais)
- [x] Placeholder visual antes do carregamento
- [x] Criar YouTubePlaceholder para desenvolvimento
- [ ] Integrar em páginas de aula

## Sistema de Sons (Web Audio API)
- [x] Criar SoundManager.ts com Web Audio API
- [x] Adicionar som de acerto (sintetizado)
- [x] Adicionar som de erro (sintetizado)
- [x] Adicionar som de level-up (sintetizado)
- [x] Adicionar som de conquista (sintetizado)
- [x] Adicionar som de click (sintetizado)
- [x] Adicionar som de whoosh (sintetizado)
- [x] Criar hook useSounds() para componentes
- [x] Adicionar botão de mute/unmute global (SoundToggle)
- [x] Integrar sons no ExerciseCard
- [ ] Integrar sons no sistema de gamificação
- [ ] Adicionar feedback visual + sonoro simultâneo


## Expansão Final de Conteúdo (11 páginas)
- [ ] Expandir Página 2 de Adição (Reta Numérica) - 5000+ palavras
- [ ] Expandir Página 3 de Adição (Exercícios) - 5000+ palavras
- [ ] Expandir Página 1 de Subtração - 5000+ palavras
- [ ] Expandir Página 2 de Subtração - 5000+ palavras
- [ ] Expandir Página 3 de Subtração - 5000+ palavras
- [ ] Expandir Página 1 de Multiplicação - 5000+ palavras
- [ ] Expandir Página 2 de Multiplicação - 5000+ palavras
- [ ] Expandir Página 3 de Multiplicação - 5000+ palavras
- [ ] Expandir Página 1 de Divisão - 5000+ palavras
- [ ] Expandir Página 2 de Divisão - 5000+ palavras
- [ ] Expandir Página 3 de Divisão - 5000+ palavras

## Integração Global de Sons
- [x] Adicionar SoundToggle no App.tsx (botão flutuante global)
- [ ] Testar SoundToggle em todas as páginas

## Sons de Gamificação
- [x] Integrar playLevelUp no XPDisplay
- [x] Integrar playAchievement no AchievementsDisplay
- [ ] Testar sons de gamificação


## Expansão de Conteúdo - Lote 1 (Primeiras 3 páginas)
- [x] Expandir Adição Página 2 (Reta Numérica) - 2.871 palavras
- [x] Expandir Adição Página 3 (Exercícios) - 2.189 palavras
- [x] Expandir Subtração Página 1 (Conceito) - 2.199 palavras

## Expansão de Conteúdo - Lote 2 (Próximas 4 páginas)
- [ ] Expandir Subtração Página 2 (Movimento) - 5000+ palavras
- [ ] Expandir Subtração Página 3 (Exercícios) - 5000+ palavras
- [ ] Expandir Multiplicação Página 1 (Soma Repetida) - 5000+ palavras
- [ ] Expandir Multiplicação Página 2 (Tabuada) - 5000+ palavras

## Expansão de Conteúdo - Lote 3 (Últimas 4 páginas)
- [ ] Expandir Multiplicação Página 3 (Matrizes) - 5000+ palavras
- [ ] Expandir Divisão Página 1 (Operação Inversa) - 5000+ palavras
- [ ] Expandir Divisão Página 2 (Repartição) - 5000+ palavras
- [ ] Expandir Divisão Página 3 (Resto) - 5000+ palavras

## Componentes Interativos Avançados
- [ ] Criar componente DragAndDrop para ordenação de números
- [ ] Criar componente Slider para valores dinâmicos
- [ ] Criar componente Canvas de exploração livre
- [ ] Integrar componentes nas páginas de exercícios
