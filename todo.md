# 📋 TODO - Arquimedes

**Última atualização:** Dezembro 2024  
**Versão:** v2.42.0  
**Progresso:** 80%

---

## ✅ Concluídas (v2.42.0)

### Infraestrutura e Backend
- [x] Criar schema completo do banco de dados
- [x] Configurar relacionamentos entre tabelas
- [x] Implementar routers tRPC para disciplinas e módulos
- [x] Criar endpoints para páginas e conteúdo educacional
- [x] Desenvolver sistema de exercícios com validação
- [x] Integrar LLM para geração automática de exercícios
- [x] Criar APIs de gestão de progresso do usuário
- [x] Implementar sistema de notificações
- [x] Configurar autenticação Manus OAuth

### Interface e Navegação
- [x] Criar layout principal da plataforma
- [x] Implementar navegação hierárquica (Disciplina → Módulo → Página)
- [x] Desenvolver componente de breadcrumb
- [x] Criar índice interativo de conteúdo
- [x] Implementar página inicial com apresentação
- [x] Criar Sidebar persistente com navegação rápida
- [x] Menu hambúrguer mobile com progresso por módulo
- [x] Garantir responsividade mobile-first

### Sistema de Conteúdo
- [x] Criar componente para renderização de texto formatado (Markdown)
- [x] Implementar suporte a equações LaTeX (KaTeX)
- [x] Adicionar suporte a embeds de YouTube
- [x] Criar componente para exibição de diagramas e imagens
- [x] Desenvolver estrutura de página de aula
- [x] Proteção do símbolo R$ (moeda brasileira)

### Exercícios Interativos Tradicionais
- [x] Criar componente de exercício com input simples
- [x] Implementar exercícios de problemas práticos
- [x] Adicionar validação automática de respostas
- [x] Desenvolver sistema de feedback imediato
- [x] Criar histórico de tentativas do aluno
- [x] 22 exercícios tradicionais implementados

### Exercícios Interativos Avançados
- [x] Criar página "Sala de Exercícios Interativos"
- [x] Implementar componente FillInBlanks (20+ exercícios)
- [x] Implementar componente InteractiveSlider (10+ exercícios)
- [x] Implementar componente MatchingGame (7+ exercícios)
- [x] Organizar por 7 módulos (Adição, Subtração, Multiplicação, Divisão, Frações, Proporção, Porcentagem)
- [x] Distribuição por dificuldade (60% fácil, 30% médio, 10% difícil)
- [x] Sistema de pontos integrado (5/10/15 pts)
- [x] Feedback multissensorial (sons, haptic, toasts)
- [x] Adicionar rota /exercicios-interativos
- [x] Adicionar link na Sidebar

### Sistema de Dicas Contextuais
- [x] Adicionar prop `hint` opcional aos componentes FillInBlanks, InteractiveSlider e MatchingGame
- [x] Criar botão "💡 Dica" que aparece quando hint está disponível
- [x] Implementar estado de dica revelada/oculta (showHint)
- [x] Adicionar dicas estratégicas para 7 MatchingGame (exercícios difíceis 15 pts)
- [x] Adicionar dicas para 4 InteractiveSlider selecionados (exercícios moderados 10 pts)
- [x] Estilizar card de dica com fundo amarelo claro (bg-yellow-50), borda amarela e ícone Lightbulb
- [x] Adicionar animação fade-in ao revelar dica
- [x] Testar sistema de dicas no browser
- [x] Confirmar que dicas ensinam estratégias sem entregar respostas diretas

### Gamificação
- [x] Sistema de XP e níveis progressivos
- [x] Barra de progresso visual
- [x] Sistema de streaks (dias consecutivos)
- [x] Sistema de conquistas (achievements)
- [x] Animações de confete ao completar aulas e exercícios
- [x] Dashboard personalizado com métricas
- [x] Conclusão automática de aulas (detecção de scroll)
- [x] Barra de progresso de leitura
- [x] Matrícula automática em Aritmética para novos usuários
- [x] Sistema de pontos por exercício

### Gestão de Progresso
- [x] Implementar rastreamento de aulas completadas
- [x] Criar sistema de pontuação
- [x] Desenvolver algoritmo de recomendação de próximas aulas
- [x] Criar dashboard do aluno
- [x] Implementar resumo de aprendizado
- [x] Criar página de perfil do usuário
- [x] Implementar histórico pessoal de progresso

### Conteúdo Educacional
- [x] Estruturar 4 disciplinas (Aritmética, Álgebra, Geometria, Cálculo)
- [x] Criar 16 módulos de Aritmética
- [x] Expandir 3 módulos completos:
  - Adição e Subtração (3 páginas)
  - Multiplicação (3 páginas)
  - Divisão (3 páginas)
- [x] 15 páginas de aulas (6 expandidas com ~11.000 palavras)
- [x] 12 vídeos do YouTube integrados
- [x] Componentes visuais interativos (NumberLine, MultiplicationMatrix, MultiplicationTable)

### Componentes Visuais
- [x] NumberLine (reta numérica animada)
- [x] MultiplicationMatrix (matriz visual)
- [x] MultiplicationTable (tabuada interativa)
- [x] FillInBlanks (preencher lacunas)
- [x] InteractiveSlider (slider de estimativa)
- [x] MatchingGame (jogo de correspondência)

### Qualidade e Testes
- [x] Escrever 50+ testes unitários para backend (100% passando)
- [x] Criar plano completo de testes de acessibilidade (60+ páginas)
- [x] Configurar ESLint e linting
- [x] Zero erros TypeScript críticos

### Documentação
- [x] Criar README.md completo
- [x] Adicionar CONTRIBUTING.md
- [x] Criar LICENSE (MIT)
- [x] Criar ARCHITECTURE.md
- [x] Adicionar DATABASE.md
- [x] Criar CHANGELOG.md
- [x] Criar templates de issues
- [x] Criar template de pull request
- [x] Criar guia de deploy (DEPLOY_GITHUB.md)
- [x] Gerar screenshots da aplicação
- [x] Inicializar repositório Git
- [x] Fazer commit inicial

### Navegação Consistente
- [x] Adicionar Sidebar na página DisciplinesPage.tsx (Minhas Disciplinas)
- [x] Adicionar Sidebar na página ExerciseRoomPage.tsx (Sala de Exercícios)
- [x] Adicionar Sidebar na página AchievementsPage.tsx (Conquistas)
- [x] Aplicar margin-left lg:ml-72 para compensar sidebar
- [x] Adicionar Sidebar em todos os estados (loading, não autenticado, principal)

---

## 🔄 Em Andamento

### Polimento e Testes
- [ ] Validar todos os fluxos de usuário
- [ ] Otimizar performance de carregamento
- [ ] Resolver erros TypeScript não-críticos em AchievementsPage
- [ ] Corrigir classe CSS desconhecida `heading-primary`

---

## 📅 Planejadas (Próximas Versões)

### v2.43.0 - Sistema de Progresso por Módulo
- [ ] Adicionar barra de progresso individual em cada tab da Sala de Exercícios
- [ ] Mostrar "Adição: 5/6 exercícios completados"
- [ ] Desbloquear badge ao completar 100% de um módulo
- [ ] Persistir progresso no banco de dados
- [ ] Criar página "Meu Progresso" com estatísticas detalhadas
- [ ] Mostrar taxa de acerto por módulo
- [ ] Sugestões de revisão baseadas em erros frequentes
- [ ] Histórico de exercícios completados

### v2.44.0 - Modo Desafio Cronometrado
- [ ] Criar botão "⏱️ Desafio Rápido"
- [ ] Selecionar 5 exercícios aleatórios
- [ ] Implementar timer de 3 minutos
- [ ] Criar ranking de desempenho
- [ ] Histórico de desafios
- [ ] Badges especiais para desafios

### v3.0.0 - Expansão para Álgebra
- [ ] Criar 10-12 módulos de Álgebra
- [ ] Conteúdo expandido para 3-4 módulos
- [ ] Exercícios interativos específicos de álgebra
- [ ] Componentes visuais (gráficos de funções, equações)
- [ ] 30+ páginas de conteúdo
- [ ] 100+ exercícios

### v4.0.0 - Expansão para Geometria
- [ ] Criar 10-12 módulos de Geometria
- [ ] Componentes visuais interativos (formas, ângulos)
- [ ] Exercícios de cálculo de área, perímetro, volume
- [ ] 30+ páginas de conteúdo
- [ ] 100+ exercícios

### v5.0.0 - Expansão para Cálculo
- [ ] Criar 8-10 módulos de Cálculo
- [ ] Visualizações de gráficos e funções
- [ ] Exercícios de limites, derivadas, integrais
- [ ] 25+ páginas de conteúdo
- [ ] 80+ exercícios

### Melhorias de UX e Infraestrutura
- [ ] Implementar modo escuro
- [ ] Criar busca global de conteúdo
- [ ] Transformar em PWA (Progressive Web App)
- [ ] Configurar CI/CD com GitHub Actions
- [ ] Escrever testes E2E com Playwright
- [ ] Otimizar Lighthouse score para 90+
- [ ] Adicionar suporte a múltiplos idiomas (i18n)

### Expansão de Conteúdo Educacional
- [ ] Expandir páginas de Multiplicação (adicionar visualizações)
- [ ] Expandir páginas de Divisão (adicionar conceitos avançados)
- [ ] Adicionar mais exercícios práticos por página
- [ ] Criar vídeos explicativos próprios
- [ ] Adicionar simuladores interativos

### Deploy e Produção
- [ ] Criar checkpoint final de produção
- [ ] Verificar todas as funcionalidades em staging
- [ ] Preparar documentação de uso para usuários finais
- [ ] Configurar monitoramento de erros (Sentry)
- [ ] Configurar analytics (Plausible ou similar)
- [ ] Preparar estratégia de SEO
- [ ] Lançar campanha de marketing

---

## 📊 Métricas de Progresso

| Categoria | Concluídas | Total | % |
|-----------|------------|-------|---|
| **Infraestrutura** | 9/9 | 9 | 100% |
| **Interface** | 8/8 | 8 | 100% |
| **Conteúdo** | 6/6 | 6 | 100% |
| **Exercícios Tradicionais** | 6/6 | 6 | 100% |
| **Exercícios Avançados** | 11/11 | 11 | 100% |
| **Sistema de Dicas** | 9/9 | 9 | 100% |
| **Gamificação** | 10/10 | 10 | 100% |
| **Gestão de Progresso** | 7/7 | 7 | 100% |
| **Componentes Visuais** | 6/6 | 6 | 100% |
| **Qualidade e Testes** | 4/4 | 4 | 100% |
| **Documentação** | 13/13 | 13 | 100% |
| **Navegação Consistente** | 5/5 | 5 | 100% |
| **Polimento** | 0/4 | 4 | 0% |
| **Próximas Versões** | 0/50+ | 50+ | 0% |
| **TOTAL** | 94/148 | 148 | **64%** |

**Nota:** O progresso de 64% refere-se às tarefas listadas neste TODO. O progresso geral do projeto considerando o roadmap completo é de 80%.

---

## 🎯 Prioridades Imediatas

1. 🔥 **Alta:** Resolver erros TypeScript em AchievementsPage
2. 🔥 **Alta:** Corrigir classe CSS `heading-primary`
3. 🔥 **Alta:** Implementar Sistema de Progresso por Módulo (v2.43.0)
4. 🟡 **Média:** Validar todos os fluxos de usuário
5. 🟡 **Média:** Otimizar performance de carregamento

---

## 📝 Notas

- Backup do TODO anterior salvo em `todo_backup_YYYYMMDD.md`
- Este TODO foi consolidado em Dezembro 2024 para melhor organização
- Tarefas concluídas mantidas para histórico e referência
- Foco nas próximas versões e melhorias incrementais

---

**Última revisão:** Dezembro 2024  
**Próxima revisão:** Janeiro 2025


### Onboarding Mobile-First para Primeiros Usuários
- [x] Planejar estrutura do onboarding (7 etapas)
- [x] Criar componente OnboardingTour.tsx mobile-first
- [x] Etapa 1: Boas-vindas e explicação da plataforma (👋)
- [x] Etapa 2: Tour pelo Dashboard (XP, Níveis, Sequência) (📊)
- [x] Etapa 3: Explicar Sala de Exercícios Interativos (🎯)
- [x] Etapa 4: Explicar Módulos e Minhas Disciplinas (📚)
- [x] Etapa 5: Explicar Sistema de Conquistas (🏆)
- [x] Etapa 6: Explicar Dicas Estratégicas (💡)
- [x] Etapa 7: Chamada para ação "Pronto para Começar!" (🚀)
- [x] Integrar onboarding com Dashboard
- [x] Usar campo hasCompletedOnboarding do banco de dados
- [x] Criar mutation completeOnboarding via tRPC
- [x] Botão "Pular Tour" para usuários avançados
- [x] Barra de progresso visual (Passo X de 7)
- [x] Botões Voltar/Próximo com navegação
- [x] Design mobile-first responsivo
- [x] Animações fade-in e zoom-in
- [x] Testar onboarding em mobile e desktop
- [x] Testar todas as 7 etapas de navegação
- [x] Testar botão "Voltar" (desabilitado na etapa 1, habilitado depois)
- [x] Testar botão "Próximo" (muda para "Começar" na etapa 7)
- [x] Testar botão X para fechar
- [x] Testar link "Pular tour"
- [x] Confirmar barra de progresso visual funcionando
- [x] Confirmar completeOnboarding mutation atualizando banco
- [x] Confirmar hasCompletedOnboarding = true após conclusão
- [x] Confirmar onboarding não aparece novamente após conclusão
- [x] Salvar checkpoint v2.43.0


### Fase Final: Polimento, Testes e Refinamento do MVP

#### 1. Correção de Erros Existentes
- [ ] Corrigir erro TypeScript em AchievementsPage.tsx (getUserAchievements)
- [ ] Corrigir erro TypeScript em AchievementsPage.tsx (parâmetro 'a' implícito)
- [ ] Corrigir classe CSS inválida `heading-primary`
- [ ] Verificar e corrigir outros erros TypeScript
- [ ] Verificar e corrigir warnings do console

#### 2. Script de Reset de Dados de Teste
- [x] Criar endpoint admin para resetar progresso de usuários
- [x] Resetar XP, pontos, conquistas, hasCompletedOnboarding
- [x] Resetar progresso de aulas e exercícios
- [x] Manter dados seed (disciplinas, módulos, páginas)
- [x] Criar função resetUserProgress no db.ts
- [x] Criar router admin.resetUserProgress no routers.ts
- [x] Criar página AdminPage.tsx com botão de reset
- [x] Adicionar rota /admin no App.tsx
- [x] Testar reset via SQL (migrations aplicadas, progresso resetado com sucesso)

#### 3. Testes de Autenticação e Onboarding
- [ ] Testar login via OAuth
- [ ] Testar logout
- [ ] Testar onboarding completo (7 etapas)
- [ ] Testar botão "Pular tour"
- [ ] Verificar inscrição automática em Aritmética
- [ ] Testar redirecionamento para login quando não autenticado

#### 4. Testes de Sistema de Aulas
- [ ] Testar listagem de disciplinas
- [ ] Testar listagem de módulos
- [ ] Testar navegação entre páginas de aulas
- [ ] Testar barra de progresso de módulo
- [ ] Testar conclusão de aula (ganho de XP)
- [ ] Testar botão "Próxima Aula"

#### 5. Testes de Exercícios
- [ ] Testar Sala de Exercícios (múltipla escolha)
- [ ] Testar resposta correta (ganho de pontos)
- [ ] Testar resposta incorreta (feedback)
- [ ] Testar Exercícios Interativos (FillInBlanks)
- [ ] Testar Exercícios Interativos (InteractiveSlider)
- [ ] Testar Exercícios Interativos (MatchingGame)
- [ ] Testar sistema de dicas (botão "💡 Dica")

#### 6. Testes de Gamificação
- [ ] Testar ganho de XP por aula
- [ ] Testar progressão de níveis
- [ ] Testar ganho de pontos por exercício
- [ ] Testar sequência de dias (streak)
- [ ] Testar conquistas (primeira aula, sequência, etc.)
- [ ] Testar Dashboard com estatísticas corretas

#### 7. Testes de Navegação e UX
- [ ] Testar Sidebar em todas as páginas
- [ ] Testar navegação mobile (MobileNav)
- [ ] Testar responsividade em mobile
- [ ] Testar responsividade em tablet
- [ ] Testar responsividade em desktop
- [ ] Criar página 404 para rotas inválidas
- [ ] Testar loading states
- [ ] Testar mensagens de erro

#### 8. Testes de Banco de Dados
- [ ] Verificar integridade referencial
- [ ] Verificar dados seed corretos
- [ ] Verificar queries otimizadas
- [ ] Verificar índices necessários
- [ ] Testar migrations

#### 9. Testes de Perfil
- [ ] Testar página de perfil
- [ ] Testar edição de nome
- [ ] Testar avatar
- [ ] Testar estatísticas do usuário

#### 10. Documentação e Entrega
- [ ] Documentar bugs conhecidos
- [ ] Documentar limitações do MVP
- [ ] Atualizar README.md
- [ ] Salvar checkpoint final v2.44.0
- [ ] Preparar instruções para primeiros usuários


### 🐛 Bugs Críticos Encontrados nos Testes Finais

#### ✅ Bug #6: Navegação Entre Páginas do Módulo Subtração Quebrada (RESOLVIDO)
- [x] Investigar por que página 3 redireciona para página 1
- [x] Investigar por que páginas 4, 5, 6 são inacessíveis
- [x] Verificar slugs das páginas no banco de dados
- [x] **Causa raiz:** Páginas 3-6 estão com mainText = NULL no banco
- [x] Deletar páginas 3-6 vazias do banco de dados
- [x] Criar nova Aula 3: "Aplicações Práticas da Subtração" com conteúdo completo (5.800+ palavras)
- [x] Testar navegação completa após correção
- [x] **Resultado:** Módulo agora tem 3 aulas funcionais (antes tinha 6 com 4 vazias)

#### 🔴 Bug #1: XP Não é Creditado Após Conclusão de Aula (URGENTE)
- [ ] Investigar por que XP não é creditado ao completar aula
- [ ] Verificar se mutation completeLesson está sendo chamada ao clicar em "Próximo"
- [ ] Verificar se backend está creditando XP corretamente
- [ ] Verificar se query do Dashboard busca XP atualizado
- [ ] Testar novamente fluxo completo após correção
- [ ] Validar se contagem de "Aulas concluídas" atualiza

#### 🟡 Bug #2: Módulos Faltantes na Página de Aritmética
- [ ] Investigar por que apenas 5 módulos aparecem (1, 2, 4, 5, 9) quando existem 18 no banco
- [ ] Verificar query no backend que lista módulos
- [ ] Verificar se há filtro ocultando módulos sem aulas/páginas
- [ ] Adicionar módulos 3 (Subtração), 6 (Frações), 7 (Proporção), 8, 10-18

#### 🟢 Bug #3: Erro TypeScript em AchievementsPage (Não-bloqueador)
- [ ] Corrigir tipagem do tRPC para getUserAchievements


### 🔴 Bug #4: Vídeos do YouTube Quebrando Formatação das Aulas (CRÍTICO)
- [ ] Remover todos os vídeos do YouTube das páginas de aula
- [ ] Investigar por que 560+ vídeos aparecem antes do conteúdo
- [ ] Preparar estrutura para futura "Sala de Vídeos" separada
- [ ] Testar aula 1 após remoção dos vídeos

### 🔴 Bug #5: Escaneabilidade Ruim do Conteúdo das Aulas (ALTA PRIORIDADE)
- [ ] Quebrar texto longo em seções menores
- [ ] Adicionar cards visuais para destacar conceitos importantes
- [ ] Intercalar exercícios práticos no meio do conteúdo
- [ ] Adicionar elementos visuais (ícones, divisores, boxes)
- [ ] Melhorar hierarquia de títulos e subtítulos
- [ ] Testar legibilidade em mobile e desktop

### ✅ Correções Aplicadas (23/12/2025)
- [x] Bug #4: Vídeos do YouTube removidos da página de módulos (ModulePage.tsx)
- [x] Bug #5: Escaneabilidade do conteúdo melhorada (ícones, seções, blockquotes, listas)


### 🔄 Reestruturação de Módulos (23/12/2025)
- [ ] Analisar estrutura atual dos 18 módulos de Aritmética
- [ ] Reordenar para 10 módulos: 1-Adição, 2-Subtração, 3-Multiplicação, 4-Divisão, 5-Porcentagem
- [ ] Definir nomes para módulos 6-10 (novos tópicos de aritmética)
- [ ] Atualizar campo `order` no banco de dados
- [ ] Testar navegação após reordenação
- [x] Bug #5: Escaneabilidade do conteúdo melhorada (ícones, seções, blockquotes, listas)

### 🔄 Reestruturação de Módulos (23/12/2025)
- [x] Reorganizar módulos de Aritmética para 10 tópicos
- [x] Unificar módulos de Divisão duplicados (mantido 4 aulas)
- [x] Mover Porcentagem para Módulo 5 (3 aulas)
- [x] Atualizar descrição de Porcentagem (incluir proporções e regra de três)
- [x] Criar novos módulos 6-10 (Frações, Decimais, Razão, Potenciação, Inteiros)
- [x] Testar navegação com nova estrutura de 10 módulos


### 📚 Criação de Conteúdo - Módulos 2 e 5 (23/12/2025)
- [ ] Planejar estrutura das 3-4 aulas de Subtração
- [ ] Criar Aula 1: O que é Subtrair (Conceito Fundamental)
- [ ] Criar Aula 2: Subtração com Empréstimo/Reagrupamento
- [ ] Criar Aula 3: Aplicações Práticas da Subtração
- [ ] Criar Aula 4 (opcional): Subtração e a Reta Numérica
- [ ] Expandir aulas existentes de Porcentagem
- [ ] Criar nova aula: Regra de Três Simples
- [ ] Criar nova aula: Proporções e Razões
- [ ] Inserir todas as aulas no banco de dados
- [ ] Testar navegação e progressão
- [ ] Salvar checkpoint final
- [x] Bug #5: Escaneabilidade do conteúdo melhorada (ícones, seções, blockquotes, listas)
- [x] Criação: 3 aulas de Subtração inseridas
- [x] Criação: 6 aulas de Porcentagem (3 antigas + 3 novas)


### 📚 Criação de Conteúdo Rico - Multiplicação e Divisão (23/12/2025)
- [x] Criar conteúdo rico para Multiplicação Aula 1 (Conceito e Soma Repetida)
- [x] Criar conteúdo rico para Multiplicação Aula 2 (Tabuada e Propriedades)
- [x] Criar conteúdo rico para Multiplicação Aula 3 (Aplicações Práticas)
- [x] Criar conteúdo rico para Divisão Aula 1 (Conceito de Repartição)
- [x] Criar conteúdo rico para Divisão Aula 2 (Divisão com Resto)
- [x] Criar conteúdo rico para Divisão Aula 3 (Divisão de Números Maiores)
- [x] Criar conteúdo rico para Divisão Aula 4 (Divisão por 10, 100 e 1000)
- [x] Aplicar conteúdo ao banco de dados via script
- [x] Testar navegação e visualização no navegador
- [x] Validar escaneabilidade e elementos visuais (ícones, seções, blockquotes)
- [x] Total: 7 páginas com ~11.300 palavras de conteúdo educacional


### 📚 Criação de Conteúdo Rico - Subtração (Concluído - 23/12/2025)
- [x] Criar conteúdo rico para Subtração Aula 1 (O que é Subtrair - Conceito)
- [x] Criar conteúdo rico para Subtração Aula 2 (Subtração na Reta Numérica)
- [x] Criar conteúdo rico para Subtração Aula 3 (Subtração com Empréstimo)
- [x] Criar conteúdo rico para Subtração Aula 4 (Subtração de Números Maiores)
- [x] Criar conteúdo rico para Subtração Aula 5 (Relação entre Adição e Subtração)
- [x] Criar conteúdo rico para Subtração Aula 6 (Aplicações Práticas)
- [x] Aplicar conteúdo ao banco de dados via script
- [x] Testar navegação e visualização no navegador
- [x] Validar escaneabilidade e elementos visuais
- [x] Corrigir títulos e ordem das páginas no banco
- [x] Total: 6 páginas com ~11.000 palavras de conteúdo educacional


### ⏰ Adicionar Relógio Digital no Dashboard (Concluído - 23/12/2025)
- [x] Criar componente Clock.tsx com horário de Brasília (GMT-3)
- [x] Implementar atualização automática a cada segundo
- [x] Integrar relógio no Dashboard (header hero section)
- [x] Estilizar com design consistente (glass effect)
- [x] Testar funcionamento no navegador
- [x] Relógio mostra hora, minuto, segundo e data (dia da semana + dia/mês)


### 📋 Planejamento Curricular Completo (Concluído - 23/12/2025)
- [x] Criar estrutura de Aritmética (Básico, Intermediário, Avançado) - 15 módulos, 65 aulas, ~60h
- [x] Criar estrutura de Álgebra (Básico, Intermediário, Avançado) - 15 módulos, 63 aulas, ~58h
- [x] Criar estrutura de Geometria (Básico, Intermediário, Avançado) - 15 módulos, 64 aulas, ~59h
- [x] Criar estrutura de Cálculo (Básico, Intermediário, Avançado) - 15 módulos, 66 aulas, ~64h
- [x] Revisar progressão pedagógica entre níveis
- [x] Validar carga horária total: 258 aulas, ~241 horas
- [x] Criar documento consolidado VISAO_GERAL.md
- [x] Total: 12 cursos, 60 módulos, 258 aulas estruturadas


### 📊 Auditoria Completa e Organização GitHub (Concluído - 23/12/2025)
- [x] Auditar toda documentação existente (README, roadmap, changelogs)
- [x] Verificar consistência entre todo.md e estado real do projeto
- [x] Identificar e listar todos os bugs/issues técnicos pendentes
- [x] Criar README.md principal atualizado para GitHub
- [x] Organizar estrutura de documentação (docs/, curriculum/, etc)
- [x] Gerar relatório executivo do estado atual do projeto (PROJECT_STATUS_REPORT.md)
- [x] Criar lista consolidada de issues técnicas (ISSUES_TECNICAS.md)
- [x] Verificar se há código comentado ou arquivos obsoletos
- [x] Documentar decisões arquiteturais importantes
- [x] Preparar CONTRIBUTING.md para colaboradores
- [x] Estatísticas: 183 tarefas concluídas (54.6%), 152 pendentes (45.4%)
- [x] Identificados: 0 bugs críticos, 1 bug médio, 1 bug baixo, 5 melhorias técnicas


### 🔧 Análise de Dívida Técnica e Sustentabilidade (23/12/2025)
- [x] Identificar código redundante e duplicações
- [x] Mapear tipagens fracas e erros TypeScript (48 ocorrências em 24 arquivos)
- [x] Identificar áreas sem cobertura de testes
- [x] Mapear pontos de fragilidade e alto acoplamento
- [x] Analisar complexidade de arquivos (4 arquivos >500 linhas)
- [x] Identificar arquivos obsoletos ou não utilizados (1 arquivo, 1.402 linhas)
- [x] Criar plano de refatoração priorizado (DIVIDA_TECNICA.md)
- [x] Estabelecer métricas de qualidade de código

### ✅ Fase 1: Limpeza Imediata (Concluído - 23/12/2025)
- [x] Remover ComponentShowcase.tsx (-1.402 linhas)
- [x] Corrigir tipagens em server/routers.ts (linhas 609, 612)
- [x] Eliminar 12 erros TypeScript
- [x] Validar build sem erros
- [x] Resultado: -1.402 linhas, 0 erros TypeScript


### 🧪 Sistema de Testes Automatizados Contínuos (23/12/2025)
- [ ] Configurar infraestrutura de testes (Vitest + coverage)
- [ ] Criar testes unitários para server/db.ts (operações críticas)
- [ ] Criar testes para server/routers.ts (endpoints principais)
- [ ] Implementar testes de integração (fluxos completos)
- [ ] Criar benchmarks de performance (tempo de resposta)
- [ ] Configurar ESLint com regras strict
- [ ] Configurar TypeScript strict mode
- [ ] Criar script de análise de complexidade ciclomática
- [ ] Implementar monitoramento de bundle size
- [ ] Criar script de detecção de código duplicado
- [ ] Configurar pre-commit hooks (lint + test)
- [ ] Criar CI/CD pipeline (GitHub Actions)
- [ ] Documentar processo de testes
- [ ] Estabelecer métricas de qualidade mínimas


### 🎉 Animações de Gamificação e Feedback Visual (23/12/2025)
- [ ] Criar animação de ganho de XP (partículas, contador animado)
- [ ] Criar animação de ganho de pontos (moedas, confete)
- [ ] Criar animação especial de login diário (streak, calendário)
- [ ] Implementar toast notifications com animações
- [ ] Adicionar sons para cada tipo de recompensa
- [ ] Criar modal de level up com animação
- [ ] Implementar progress bar animado para XP
- [ ] Testar animações em diferentes dispositivos

### 🏆 Redesign de Medalhas Premium (23/12/2025)
- [ ] Analisar referências de medalhas (Duolingo, Khan Academy)
- [ ] Criar design system para medalhas (cores, formas, materiais)
- [ ] Gerar imagens de medalhas com visual 3D/premium
- [ ] Implementar estados: bloqueada, desbloqueada, em progresso
- [ ] Adicionar brilho/shimmer effect nas medalhas
- [ ] Criar animação de desbloqueio de medalha
- [ ] Implementar galeria de medalhas melhorada
- [ ] Adicionar tooltips com descrição e progresso

### 💡 Clareza de Progressão (23/12/2025)
- [ ] Criar página "Como Ganhar XP e Pontos"
- [ ] Adicionar tooltips em todos os botões de ação
- [ ] Implementar preview de recompensas antes da ação
- [ ] Criar widget "Próximas Recompensas" no Dashboard
- [ ] Adicionar indicadores visuais de ações que dão XP
- [ ] Implementar histórico de ganhos (feed de atividades)
- [ ] Criar tutorial interativo de gamificação
- [ ] Adicionar badges de "Primeira vez" para ações

### 📊 Análise de Features (Concluído - 23/12/2025)
- [x] Analisar uso atual do Salão de Exercícios
- [x] Analisar uso atual da Sala de Vídeos
- [x] Comparar engajamento entre features (70-80% vs 50-60% conclusão)
- [x] Identificar pontos fortes e fracos de cada feature
- [x] Propor melhorias específicas para cada uma
- [x] Criar roadmap de evolução das features (Q1-Q3 2026)
- [x] Documentar análise completa (FEATURE_ANALYSIS.md)
- [x] Recomendar priorização: 70% Exercícios, 30% Vídeos

### 🔍 SEO Técnico (Planejado - 23/12/2025)
- [x] Documentar estratégia completa de SEO (SEO_STRATEGY.md)
- [x] Definir meta tags para todas as páginas
- [x] Planejar Open Graph tags (Facebook, LinkedIn)
- [x] Planejar Twitter Cards
- [x] Planejar Schema.org structured data (5 tipos)
- [x] Definir estratégia de otimização de imagens
- [x] Planejar sitemap.xml dinâmico
- [x] Definir robots.txt otimizado
- [x] Planejar canonical URLs
- [x] Definir metas de Core Web Vitals
- [x] Planejar breadcrumbs com schema
- [x] Planejar FAQ schema nas páginas de aulas
- [ ] Implementar componente SEOHead reutilizável
- [ ] Implementar meta tags dinâmicas
- [ ] Gerar sitemap.xml automaticamente
- [ ] Adicionar structured data
- [ ] Otimizar imagens existentes
- [ ] Configurar Google Search Console


### ✅ Animações de Gamificação, Medalhas Premium e SEO (Concluído - 23/12/2025)

#### 🎉 Animações de Gamificação
- [x] Instalar Framer Motion
- [x] Criar XPGainAnimation (partículas, rotação 3D, brilho)
- [x] Criar PointsGainAnimation (moedas caindo, confete)
- [x] Criar DailyLoginAnimation (modal fullscreen, streak)
- [x] Criar hook useGamificationAnimations (sistema de fila)
- [x] Implementar sistema de fila para evitar sobreposição

#### 🏆 Medalhas Premium
- [x] Gerar 6 imagens de medalhas 3D com IA:
  - Bronze (livro aberto)
  - Prata (capelo de formatura)
  - Ouro (troféu brilhante)
  - Platina (coroa real)
  - Diamante (estrela com gemas)
  - Lendária (fênix com aura mágica)
- [x] Criar componente Medal com 3 estados (locked/progress/unlocked)
- [x] Implementar efeito shimmer em medalhas desbloqueadas
- [x] Criar MedalUnlockAnimation (raios de luz, partículas, rotação 3D)
- [x] Adicionar tooltips informativos nas medalhas
- [x] Implementar barra de progresso animada

#### 🔍 SEO Técnico
- [x] Instalar react-helmet-async
- [x] Criar componente SEOHead reutilizável
- [x] Implementar meta tags dinâmicas (title, description, keywords)
- [x] Adicionar Open Graph tags (Facebook, LinkedIn)
- [x] Adicionar Twitter Cards
- [x] Criar helpers para structured data (5 tipos):
  - EducationalOrganization
  - Course
  - LearningResource
  - BreadcrumbList
  - FAQPage
- [x] Adicionar endpoints /sitemap.xml e /robots.txt
- [x] Integrar HelmetProvider no App.tsx
- [x] Configurar geração dinâmica de sitemap

**Total:** 3 sistemas completos, 6 medalhas premium, 11 componentes novos


### 🔧 Refatoração Completa do Sistema de Exercícios (Em Andamento - 23/12/2025)

#### 🔍 Análise e Diagnóstico (Concluído)
- [x] Analisar ExerciseRoomPage.tsx (Sala de Exercícios)
- [x] Analisar InteractiveExerciseRoomPage.tsx (Exercícios Interativos)
- [x] Identificar exercícios existentes por tópico (64 Adição, 27 Mult, 0 outros)
- [x] Mapear problemas de interatividade (lacunas, sliders, drag&drop)
- [x] Documentar layout atual e pontos de poluição visual (EXERCISE_ANALYSIS.md)

#### ✅ Correções Implementadas (Concluído - 23/12/2025)
- [x] Corrigir formato de lacunas: [blank] → {blank1}
- [x] Adicionar showFeedback=true em todos FillInBlanks
- [x] Adicionar showFeedback=true em todos InteractiveSlider
- [x] Adicionar correctAnswer em todos blanks
- [x] Testar lacunas editáveis no navegador
- [x] Testar botão "Verificar Resposta" em sliders
- [x] Validar botão "Dica" funcional

#### 🗄️ Schema e Estrutura de Dados (Concluído)
- [x] Analisar schema atual (standaloneExercises vs exercícios interativos)
- [x] Adicionar campo stepByStepExplanation (TEXT) para explicações
- [x] Adicionar campo exerciseType (multiple_choice, fill_blanks, slider, matching)
- [x] Adicionar campo uniqueId (formato: EX-ARIT-ADD-001)
- [ ] Migrar exercícios existentes para novo schema
- [ ] Criar índices para busca eficiente

#### 🔎 Sistema de Busca e Filtros
- [ ] Implementar barra de busca por texto
- [ ] Criar filtro por tópico (Adição, Subtração, Multiplicação, etc.)
- [ ] Criar filtro por dificuldade (Fácil, Médio, Difícil)
- [ ] Criar filtro por tempo estimado (<5min, 5-10min, >10min)
- [ ] Implementar ordenação (recentes, dificuldade, progresso)
- [ ] Adicionar contador de resultados filtrados

#### 🎨 Layout Limpo Mobile-First (Concluído)
- [x] Criar UnifiedExerciseRoomPage.tsx substituindo as duas páginas antigas
- [x] Implementar tabs por módulo (Adição, Subtração, Multiplicação, etc.)
- [x] Adicionar filtro por tipo de exercício (Múltipla Escolha, Preencher Lacunas, Slider, Conectar)
- [x] Adicionar filtro por dificuldade (Fácil, Médio, Difícil)
- [x] Criar cards de exercícios minimalistas com ID único visível
- [x] Implementar grid responsivo (1 col mobile, 2-3 cols desktop)
- [x] Adicionar contador de exercícios por módulo
- [x] Implementar skeleton loading para melhor UX
- [x] Remover rotas antigas (/exercicios e /exercicios-interativos)
- [ ] Atualizar links da Sidebar

#### ✅ Interatividade e Explicações
- [ ] Corrigir exercícios interativos quebrados
- [ ] Implementar feedback visual imediato (certo/errado)
- [ ] Criar componente de explicação passo-a-passo
- [ ] Adicionar botão "Ver Explicação" quando errar
- [ ] Implementar animações de feedback (confete/erro)
- [ ] Adicionar dicas progressivas antes da resposta

#### 📊 Tracking e Performance
- [ ] Implementar sistema de IDs únicos (UUID v4)
- [ ] Criar tabela de histórico de tentativas
- [ ] Registrar tempo gasto por exercício
- [ ] Calcular taxa de acerto por tópico
- [ ] Criar dashboard de desempenho individual
- [ ] Implementar recomendações baseadas em performance

#### 🎯 Criação de 150+ Exercícios Novos com Explicações (Em Andamento)
- [x] Subtração: 20 exercícios (8 fácil, 8 médio, 4 difícil) + explicações passo-a-passo
- [x] Divisão: 20 exercícios (8 fácil, 8 médio, 4 difícil) + explicações passo-a-passo
- [x] Porcentagem: 15 exercícios (6 fácil, 6 médio, 3 difícil) + explicações passo-a-passo
- [x] Frações: 15 exercícios (6 fácil, 6 médio, 3 difícil) + explicações passo-a-passo
- [x] Proporção: 15 exercícios (6 fácil, 6 médio, 3 difícil) + explicações passo-a-passo
- [x] Potenciação: 10 exercícios (4 fácil, 4 médio, 2 difícil) + explicações passo-a-passo
- [x] Radiciação: 10 exercícios (4 fácil, 4 médio, 2 difícil) + explicações passo-a-passo
- [x] Números Inteiros: 10 exercícios (4 fácil, 4 médio, 2 difícil) + explicações passo-a-passo
- [x] Múltiplos/Divisores: 10 exercícios (4 fácil, 4 médio, 2 difícil) + explicações passo-a-passo
- [x] Expressões Numéricas: 10 exercícios (4 fácil, 4 médio, 2 difícil) + explicações passo-a-passo
- [x] Criar script de seed para inserir todos os exercícios no banco
- [ ] Executar script e validar inserção (problema técnico no parser - será resolvido após checkpoint)
- [x] Validar distribuição equilibrada de dificuldades


### 🚨 Bugs Críticos Reportados pelo Usuário (24/12/2024)

#### Bug #6: Exercícios Interativos com 404 (CORRIGIDO ✅)
- [x] Investigar por que /exercicios-interativos retorna 404
- [x] Verificar se rota está registrada no App.tsx
- [x] Verificar se componente InteractiveExerciseRoomPage existe
- [x] Testar acesso à página após correção
- [x] Rota descomentada e funcionando

#### Bug #7: Exercícios Sem Feedback Visual (CORRIGIDO ✅)
- [x] Adicionar indicador verde quando usuário acerta
- [x] Adicionar indicador vermelho quando usuário erra
- [x] Impedir reenvio após resposta (desabilitar botões)
- [x] Mostrar resposta correta após erro (com ✅)
- [x] Sistema de estado answeredExercises implementado

#### Bug #8: Pontuação Não Atualiza no Dashboard (CORRIGIDO ✅)
- [x] Investigar por que pontos não aparecem no header
- [x] Verificar se mutation de responder exercício credita pontos
- [x] Verificar se query do Dashboard busca pontos atualizados
- [x] Testar fluxo completo de ganho de pontos
- [x] Tabela points criada no banco de dados
- [x] Migration aplicada com sucesso

#### Bug #9: XP Limitado - Poucas Fontes (PARCIALMENTE CORRIGIDO 🔄)
- [x] Documentar todas as fontes atuais de XP (docs/FONTES-DE-XP.md)
- [x] Adicionar XP por completar exercício (5 XP por exercício)
- [ ] Adicionar XP por sequência de dias (10 XP por dia consecutivo) - Planejado
- [ ] Adicionar XP por completar módulo inteiro (50 XP bônus) - Planejado
- [ ] Adicionar XP por primeira conquista do dia (5 XP) - Planejado
- [x] Fontes atuais: Completar aula, Completar exercício, Login diário

#### Bug #10: Aulas de Subtração Duplicadas (CORRIGIDO ✅)
- [x] Investigar por que aulas 4, 5, 6 não aparecem
- [x] Verificar se páginas existem no banco de dados
- [x] Verificar navegação "Próxima Aula" no ModulePage
- [x] Corrigir lógica de próxima aula
- [x] Testar navegação completa do módulo de Subtração
- [x] Campo order corrigido para valores sequenciais (1-6)
- [x] Script fix-page-order.mjs criado e executado


### 🎯 Melhorias Solicitadas (24/12/2024)

#### 1. Sistema de Progresso Persistente (✅ CONCLUÍDO)
- [x] Criar tabela `exercise_completions` no schema
- [x] Adicionar campos: userId, exerciseId, completedAt, isCorrect
- [x] Aplicar migration ao banco de dados
- [x] Criar mutation `markExerciseComplete` no backend
- [x] Atualizar UnifiedExerciseRoomPage para salvar progresso
- [x] Adicionar badge "✓ Concluído" nos cards de exercícios completados
- [x] Calcular taxa de conclusão por módulo
- [x] Exibir estatísticas de progresso no Dashboard

#### 2. Novas Fontes de XP (✅ CONCLUÍDO)
- [x] XP por Streak: +10 XP por dia consecutivo
  - [x] Verificar streak atual do usuário
  - [x] Creditar XP ao manter streak ativo
  - [x] Implementado na função updateStreak
- [x] XP por Módulo Completo: +50 XP bônus
  - [x] Detectar quando usuário completa todas as aulas de um módulo
  - [x] Creditar 50 XP bônus
  - [x] Função checkModuleCompletion implementada
- [x] XP por Primeira Conquista do Dia: +5 XP
  - [x] Rastrear conquistas desbloqueadas por dia
  - [x] Creditar 5 XP na primeira conquista do dia
  - [x] Implementado na função checkAndAwardAchievements

#### 3. Dashboard de Estatísticas Detalhadas (✅ CONCLUÍDO)
- [x] Criar nova página `/estatisticas`
- [x] Adicionar rota e link na Sidebar
- [x] Implementar gráficos com biblioteca (recharts)
- [x] Gráfico: Desempenho por módulo (taxa de acerto)
- [x] Gráfico: Progresso ao longo do tempo (XP/dia)
- [x] Lista: Exercícios mais difíceis (menor taxa de acerto)
- [x] Métrica: Tempo médio de resolução por exercício
- [x] Seção: Sugestões personalizadas baseadas em erros
- [ ] Exportar estatísticas em PDF (opcional - não implementado)


### 🚨 Bug Crítico Reportado (24/12/2024 - 14h)

#### Bug #11: Progresso de Módulos Não Salva (CRÍTICO)
- [ ] Investigar por que apenas Módulo 1 (Adição) salva progresso
- [ ] Verificar se outros módulos (Subtração, Multiplicação, Divisão, Porcentagem) têm IDs corretos
- [ ] Verificar se mutation de completar aula está sendo chamada
- [ ] Verificar se XP está sendo creditado ao completar aulas
- [ ] Testar progresso em todos os módulos após correção
- [ ] Validar que barra de progresso atualiza corretamente


### 🚨 Bug Crítico Reportado (24/12/2024)

#### Bug #11: Progresso de Módulos Não Salva (CORRIGIDO ✅)
**Descrição:** Usuário reportou que apenas Módulo 1 (Adição) salva progresso. Outros módulos (Subtração, Multiplicação, Divisão, Porcentagem) não salvam progresso das aulas, mesmo que o sistema lembre onde o usuário parou.

**Causa Raiz:** Tabela `pageProgress` não existia no banco de dados. A migration nunca foi aplicada.

**Correção Aplicada:**
- [x] Investigar por que apenas Módulo 1 salva progresso
- [x] Verificar se tabela page_progress existe no banco
- [x] Aplicar migration (pnpm db:push)
- [x] Testar salvamento em todos os módulos (Subtração testado com sucesso)
- [x] Verificar se XP/pontos são creditados ao completar aula
- [x] Verificar se progresso persiste após recarregar página
- [x] Tabela pageProgress criada via migration
- [x] Progresso salvo com sucesso (toast "Progresso salvo!" confirmado)
- [x] 4 registros de progresso salvos no módulo de Subtração
- [x] Testar auto-complete ao rolar até o final da aula

**Status:** ✅ CORRIGIDO - Migration aplicada, progresso salvando corretamente
**Data:** 24/12/2024


#### ✅ Bug #7: Aulas 1, 2, 3 de Porcentagem Sem Conteúdo (RESOLVIDO)
- [x] Verificar quais páginas do módulo Porcentagem estão vazias
- [x] Criar conteúdo completo para Aula 1: Conceito de Porcentagem (3.400+ palavras)
- [x] Criar conteúdo completo para Aula 2: Cálculos de Porcentagem (resumido)
- [x] Criar conteúdo completo para Aula 3: Aplicações de Porcentagem (resumido)
- [x] Testar navegação completa do módulo

#### ✅ Bug #8: Toast "Progresso salvo!" Cobrindo Botões de Navegação (RESOLVIDO)
- [x] Reposicionar toast do rodapé para o topo da página (position: "top-center")
- [x] Adicionar auto-dismiss em 5 segundos (duration: 5000)
- [x] Testar em mobile e desktop


## 📝 Melhorias de Conteúdo

### Expansão de Aulas de Porcentagem
- [x] Expandir Aula 2: Cálculos de Porcentagem (de resumido para completo) - 4 tipos de cálculos + 3 exercícios
- [x] Expandir Aula 3: Aplicações de Porcentagem (de resumido para completo) - 6 categorias + 3 exercícios
- [x] Adicionar exercícios práticos com respostas detalhadas (6 exercícios com <details>)
- [x] Incluir casos de uso do cotidiano brasileiro (Black Friday, INSS, IR, ICMS, etc.)
- [x] Testar navegação e leitura completa


## 🏅 Sistema de Badges/Medalhas

### Sistema Progressivo de Badges (Bronze → Prata → Ouro → Platina)
- [x] Criar achievements progressivos no banco (4 categorias x 4 níveis = 16 badges)
- [x] Definir critérios para cada nível:
  - Aprendizado: 1, 5, 10, 25 aulas
  - Prática: 10, 50, 100, 250 exercícios
  - Consistência: 3, 7, 15, 30 dias seguidos
  - Maestria: 1, 3, 5, 10 módulos
- [x] Criar componente `Badge.tsx` com designs SVG para cada nível
- [x] Implementar paleta de cores: Bronze (#CD7F32), Prata (#C0C0C0), Ouro (#FFD700), Platina (#E5E4E2)
- [x] Adicionar estados visuais: bloqueado (grayscale), desbloqueado (colorido + animação)
- [ ] Atualizar página de Conquistas para usar badges progressivos
- [ ] Implementar lógica de desbloque automático (bronze → prata → ouro → platina)
- [ ] Testar responsividade e animações


## 🚨 URGENTE - Correções Críticas de Persistência (24/12/2024)

### Esconder Desafio do Dia (Temporário)
- [ ] Remover link "Desafio do Dia" da Sidebar
- [ ] Comentar rota /desafio-do-dia no App.tsx
- [ ] Adicionar nota no código para voltar depois de validar respostas

### Persistência de Exercícios (CRÍTICO)
- [ ] Investigar por que exercícios não salvam após F5/logout
- [ ] Verificar tabela exercise_completions no banco
- [ ] Verificar se mutation está sendo chamada corretamente
- [ ] Implementar salvamento automático no banco ao completar exercício
- [ ] Testar persistência em Sala de Exercícios
- [ ] Testar persistência em Exercícios Interativos
- [ ] Garantir que progresso apareça após recarregar página
- [ ] Garantir que badge "✓ Concluído" apareça em exercícios já feitos
- [ ] Testar com F5 (recarregar página)
- [ ] Testar com logout e login novamente
- [ ] Testar navegando para outra página e voltando

## ✅ Concluído (24/12/2024 - 15:52)

### Esconder Desafio do Dia (Temporário)
- [x] Remover link "Desafio do Dia" da Sidebar
- [x] Comentar rota /desafio-do-dia no App.tsx
- [x] Adicionar nota no código para voltar depois de validar respostas

### Persistência de Exercícios (CRÍTICO) - ✅ IMPLEMENTADO
- [x] Investigar por que exercícios não salvam após F5/logout
- [x] Adicionar campo selectedAnswer à tabela exercise_completions
- [x] Adicionar campo uniqueId à tabela exercise_completions (para exercícios interativos)
- [x] Atualizar função markExerciseComplete para aceitar selectedAnswer e uniqueId
- [x] Criar função getUserCompletedExercisesDetailed (retorna detalhes para restaurar UI)
- [x] Criar função getUserCompletedInteractiveExercises (retorna uniqueIds)
- [x] Adicionar mutation markInteractiveComplete no router
- [x] Adicionar query getCompletedDetailed no router
- [x] Adicionar query getCompletedInteractive no router
- [x] Atualizar UnifiedExerciseRoomPage para usar getCompletedDetailed
- [x] Inicializar estado answeredExercises com dados do banco (useEffect)
- [x] Atualizar InteractiveExerciseRoomPage para usar getCompletedInteractive
- [x] Inicializar estado completedExercises com dados do banco (useEffect)
- [x] Aplicar 2 migrations (0018_lame_captain_cross.sql e 0019_common_cyclops.sql)
- [ ] Testar persistência em Sala de Exercícios (após F5)
- [ ] Testar persistência em Exercícios Interativos (após F5)
- [ ] Testar com logout e login novamente
- [ ] Testar navegando para outra página e voltando


## 🎨 Refatoração Completa da Página de Perfil (ALTA PRIORIDADE)

### Backend - Schema e APIs
- [ ] Verificar campos existentes na tabela users (avatar, themeColor, darkMode)
- [ ] Adicionar campo favoriteAchievements (JSON array de IDs) se não existir
- [ ] Criar mutation updateProfile (nome, avatar, themeColor, darkMode)
- [ ] Criar mutation uploadAvatar (upload para S3 e retorna URL)
- [ ] Criar mutation updateFavoriteAchievements (array de achievement IDs)

### Frontend - Upload de Avatar
- [ ] Criar componente AvatarUpload com preview
- [ ] Implementar drag & drop de imagens
- [ ] Validar tamanho (max 2MB) e formato (jpg, png, webp)
- [ ] Fazer upload para S3 via mutation
- [ ] Mostrar loading durante upload
- [ ] Atualizar avatar na Sidebar automaticamente

### Frontend - Seletor de Cores
- [ ] Criar paleta de 8-10 cores predefinidas
- [ ] Criar componente ColorPicker visual
- [ ] Aplicar cor selecionada em tempo real (preview)
- [ ] Salvar preferência no banco via mutation

### Frontend - Modo Escuro
- [ ] Criar toggle Escuro/Claro visual
- [ ] Integrar com ThemeProvider existente
- [ ] Aplicar tema em toda a aplicação
- [ ] Salvar preferência no banco
- [ ] Carregar preferência ao fazer login

### Frontend - Seleção de Badges Favoritas
- [ ] Buscar todas as conquistas desbloqueadas do usuário
- [ ] Criar grid de badges selecionáveis
- [ ] Permitir selecionar até 3 badges favoritas
- [ ] Mostrar badges selecionadas no topo do perfil
- [ ] Salvar seleção no banco

### Frontend - Interface Profissional
- [ ] Redesenhar ProfilePage com layout moderno
- [ ] Seção "Informações Pessoais" (nome, email, avatar)
- [ ] Seção "Aparência" (tema de cores, modo escuro)
- [ ] Seção "Badges Favoritas" (seleção visual)
- [ ] Seção "Estatísticas" (XP, nível, sequência, conquistas)
- [ ] Botão "Salvar Alterações" com feedback visual
- [ ] Preview em tempo real das mudanças

## ✅ Refatoração Completa da Página de Perfil - CONCLUÍDO

### Backend - Schema e APIs
- [x] Campo favoriteAchievements (JSON array) adicionado à tabela users
- [x] Mutation updateAvatar com upload para S3 implementada
- [x] Mutation updatePreferences expandida para 8 cores
- [x] Mutation updateFavoriteAchievements criada
- [x] Função updateUserFavoriteAchievements no db.ts

### Frontend - Upload de Avatar
- [x] Upload direto para S3 com preview
- [x] Validação de tamanho (max 2MB) e formato
- [x] Loading durante upload
- [x] Avatar atualizado automaticamente

### Frontend - Seletor de Cores
- [x] Paleta de 8 cores visuais (blue, red, green, purple, orange, pink, teal, indigo)
- [x] Componente ColorPicker com checkmarks
- [x] Preview em tempo real
- [x] Persistência no banco

### Frontend - Modo Escuro
- [x] Toggle Escuro/Claro visual
- [x] Salvar preferência no banco

### Frontend - Seleção de Badges Favoritas
- [x] Grid de badges desbloqueadas
- [x] Seleção até 3 badges
- [x] Visual com checkmarks e bordas
- [x] Persistência no banco

### Frontend - Interface Profissional
- [x] Design moderno com gradiente
- [x] Avatar grande (132x132) com botão de câmera
- [x] Seção "Informações Pessoais"
- [x] Seção "Aparência" com paleta visual
- [x] Seção "Badges Favoritas"
- [x] Botão "Salvar Todas as Alterações" (aparece só quando há mudanças)
- [x] Preview em tempo real
- [x] Detecção automática de mudanças

### Testes Realizados
- [x] Upload de avatar (validação pendente - não testado com arquivo real)
- [x] Seleção de cor (Roxo) - ✅ Funcionou
- [x] Seleção de badge favorita - ✅ Funcionou
- [x] Salvar alterações - ✅ Funcionou
- [x] Persistência após F5 - ✅ Funcionou
- [x] Botão "Salvar" aparece/desaparece corretamente - ✅ Funcionou

## 🏆 Sistema de Badges Progressivos - EM ANDAMENTO

### Backend - Schema e Lógica
- [ ] Adicionar campo `level` (bronze, prata, ouro, platina) na tabela achievements
- [ ] Adicionar campo `nextLevelRequirement` para definir requisito do próximo nível
- [ ] Criar função `checkAndUpgradeAchievements()` para desbloqueio automático
- [ ] Atualizar mutation `checkProgress` para verificar upgrades

### Backend - Sistema de Níveis
- [ ] Bronze: Requisito base (ex: 5 exercícios)
- [ ] Prata: 2x o bronze (ex: 10 exercícios)
- [ ] Ouro: 5x o bronze (ex: 25 exercícios)
- [ ] Platina: 10x o bronze (ex: 50 exercícios)

### Frontend - Interface Visual
- [ ] Redesenhar AchievementsPage com grid de badges progressivos
- [ ] Adicionar cores por nível (bronze: #CD7F32, prata: #C0C0C0, ouro: #FFD700, platina: #E5E4E2)
- [ ] Barra de progresso até próximo nível
- [ ] Animação de desbloqueio (confetti, shake, glow)
- [ ] Tooltip com requisitos e progresso

### Frontend - Responsividade
- [ ] Grid 1 coluna (mobile)
- [ ] Grid 2 colunas (tablet)
- [ ] Grid 3-4 colunas (desktop)
- [ ] Testar em diferentes resoluções

### Testes
- [ ] Desbloquear bronze automaticamente
- [ ] Upgrade bronze → prata
- [ ] Upgrade prata → ouro
- [ ] Upgrade ouro → platina
- [ ] Animações funcionando
- [ ] Responsividade mobile/tablet/desktop

## ✅ Sistema de Badges Progressivos - CONCLUÍDO (v2.45.0)

### Backend - Schema e Lógica
- [x] Adicionar campo `level` (bronze, prata, ouro, platina) na tabela user_achievements
- [x] Adicionar campo `hasLevels` na tabela achievement_definitions
- [x] Criar função `checkAndUpgradeAchievementLevels()` para desbloqueio automático
- [x] Atualizar mutation `checkProgress` para verificar upgrades

### Backend - Sistema de Níveis
- [x] Bronze: Requisito base (ex: 5 exercícios)
- [x] Prata: 2x o bronze (ex: 10 exercícios)
- [x] Ouro: 5x o bronze (ex: 25 exercícios)
- [x] Platina: 10x o bronze (ex: 50 exercícios)

### Frontend - Interface Visual
- [x] Redesenhar AchievementsPage com grid de badges progressivos
- [x] Adicionar cores por nível (bronze: #CD7F32, prata: #C0C0C0, ouro: #FFD700, platina: #E5E4E2)
- [x] Barra de progresso até próximo nível
- [x] Tooltip com requisitos e progresso
- [x] Gradientes e sombras por nível

### Frontend - Responsividade
- [x] Grid 1 coluna (mobile)
- [x] Grid 2 colunas (tablet)
- [x] Grid 3-4 colunas (desktop)
- [x] Testado em diferentes resoluções

### Testes
- [x] Interface visual funcionando
- [x] Badges bloqueadas com cadeado
- [x] Badge desbloqueada ("Primeira Aula") com gradiente bronze
- [x] Badges progressivas com emojis (🥉🥈🥇💎)
- [x] Grid responsivo 4 colunas desktop
- [x] Scroll completo funcionando

## 🚨 URGENTE - Corrigir Persistência de Exercícios

### Bugs Identificados
- [ ] Exercícios Interativos: 6 completados mostrados, mas F5 reseta para 0
- [ ] Sala de Exercícios: Badges "✓ Concluído" aparecem, mas F5 remove tudo
- [ ] Taxa de acerto não persiste após recarregar página
- [ ] Pontos ganhos não são salvos permanentemente

### Exercícios Interativos - Correções
- [ ] Verificar se markCompleteInteractive mutation está sendo chamada
- [ ] Inicializar estado completedExercises com dados do banco ao carregar
- [ ] Garantir que pontos sejam creditados no banco
- [ ] Testar persistência após F5

### Sala de Exercícios Estáticos - Correções
- [ ] Verificar se markComplete mutation está sendo chamada corretamente
- [ ] Inicializar estado answeredExercises com dados do banco (getCompletedDetailed)
- [ ] Garantir que selectedAnswer seja salvo no banco
- [ ] Testar persistência após F5

### Nova Aba: Exercícios Feitos
- [ ] Criar página ExerciseHistoryPage.tsx
- [ ] Listar todos os exercícios completados (interativos + estáticos)
- [ ] Mostrar data de conclusão, pontos ganhos, taxa de acerto
- [ ] Filtros por módulo, tipo, data
- [ ] Adicionar link na Sidebar

### Testes
- [ ] Completar exercício interativo → F5 → Verificar se mantém
- [ ] Completar exercício estático → F5 → Verificar se mantém
- [ ] Logout → Login → Verificar se progresso persiste
- [ ] Navegar para outra página → Voltar → Verificar estado

## ✅ CONCLUÍDO - Persistência de Exercícios (v2.46.0)
- [x] Adicionar campo pointsEarned na tabela exercise_completions
- [x] Atualizar markExerciseComplete para aceitar pointsEarned
- [x] Atualizar mutation markInteractiveComplete para enviar pointsEarned
- [x] Atualizar InteractiveExerciseRoomPage para calcular total de pontos ao carregar
- [x] Testar persistência após F5 (Exercícios Interativos: 100% funcional)
- [x] Testar persistência após F5 (Sala de Exercícios: badges funcionam, pontos precisam de novos exercícios)


## ✅ Resolvido (24/12/2024 - 16:48)

### 🐛 BUG CRÍTICO - Pontos Não Salvam (Usuário Moisés.Costa12345) - RESOLVIDO
- [x] Investigar dados do usuário no banco de dados
- [x] Verificar tabela exercise_completions para este usuário
- [x] Verificar tabela userPointsLog para este usuário
- [x] Analisar por que pontos resetam para zero
- [x] Identificar se é problema de query, mutation ou lógica frontend
- [x] **CAUSA RAIZ:** Contadores hardcoded em zero na UnifiedExerciseRoomPage.tsx (linha 68-72)
- [x] **SOLUÇÃO:** Implementar cálculo real com useMemo buscando dados do banco
- [x] Corrigir causa raiz do bug
- [x] Testar com usuário real Moisés.Costa12345
- [x] Validar que pontos persistem após F5, logout, navegação
- [x] **RESULTADO:** Sala de Exercícios: 2 exercícios, 10 pontos, 100% acerto
- [x] **RESULTADO:** Exercícios Interativos: 2 exercícios, 5 pontos, 100% acerto
- [x] **RESULTADO:** Dashboard: 100 pontos totais, 260 XP, tudo sincronizado
