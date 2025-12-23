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
