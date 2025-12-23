# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [0.2.0] - 2024-12-22

### ✨ Adicionado

- **Sistema de Navegação Hierárquica**
  - Estrutura Disciplina → Módulo → Página/Aula
  - Breadcrumb intuitivo para orientação
  - Índice interativo de conteúdo

- **Renderização de Conteúdo Educacional**
  - Suporte completo a equações LaTeX com KaTeX
  - Formatação de texto com Markdown
  - Destaque de conceitos-chave

- **Sistema de Exercícios Interativos**
  - Validação automática de respostas
  - Feedback imediato ao aluno
  - Histórico completo de tentativas
  - Suporte a respostas alternativas
  - Sistema de dicas progressivas

- **Gestão de Progresso do Usuário**
  - Rastreamento de aulas completadas
  - Sistema de pontuação por exercício (0-100)
  - Dashboard personalizado com métricas
  - Recomendações inteligentes de próximos passos

- **Geração Inteligente de Exercícios**
  - Integração com LLM para exercícios personalizados
  - Adaptação ao nível de dificuldade do aluno
  - Problemas contextualizados do cotidiano

- **Sistema de Notificações**
  - Alertas ao proprietário sobre marcos dos alunos
  - Notificações de novas aulas disponíveis

- **Conteúdo Educacional - Módulo 1**
  - Módulo de Adição e Subtração (3 páginas)
  - Módulo de Multiplicação (3 páginas)
  - Módulo de Divisão (3 páginas)
  - Total: 9 aulas com exercícios práticos

- **Autenticação e Perfil**
  - Integração com Manus OAuth
  - Sistema de roles (user/admin)
  - Perfil de usuário com histórico

- **Infraestrutura**
  - Arquitetura full-stack type-safe com tRPC
  - Banco de dados MySQL/TiDB com Drizzle ORM
  - Testes unitários com Vitest (14 testes)
  - Interface responsiva com Tailwind CSS 4

### 🔧 Técnico

- React 19 com TypeScript
- tRPC 11 para API type-safe
- Drizzle ORM para banco de dados
- KaTeX para renderização de LaTeX
- shadcn/ui para componentes
- Wouter para roteamento

### 📚 Documentação

- README.md completo com instruções
- CONTRIBUTING.md com guia de contribuição
- ARCHITECTURE.md com arquitetura detalhada
- DATABASE.md com guia do banco de dados
- Templates de issues e pull requests

---

## [0.1.0] - 2024-12-15

### ✨ Adicionado

- Estrutura inicial do projeto
- Configuração do ambiente de desenvolvimento
- Schema básico do banco de dados

---

## Tipos de Mudanças

- `✨ Adicionado` para novas funcionalidades
- `🔄 Modificado` para mudanças em funcionalidades existentes
- `🗑️ Removido` para funcionalidades removidas
- `🐛 Corrigido` para correções de bugs
- `🔒 Segurança` para correções de vulnerabilidades
- `🔧 Técnico` para mudanças técnicas internas
- `📚 Documentação` para mudanças na documentação

---

**Legenda de Versões:**
- MAJOR: Mudanças incompatíveis na API
- MINOR: Novas funcionalidades compatíveis
- PATCH: Correções de bugs compatíveis
