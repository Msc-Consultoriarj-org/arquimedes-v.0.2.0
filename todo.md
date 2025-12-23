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
