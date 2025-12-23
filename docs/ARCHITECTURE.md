# 🏗️ Arquitetura do Projeto Arquimedes

Este documento descreve a arquitetura técnica da plataforma Arquimedes, incluindo decisões de design, fluxos de dados e organização do código.

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Arquitetura de Alto Nível](#arquitetura-de-alto-nível)
3. [Frontend](#frontend)
4. [Backend](#backend)
5. [Banco de Dados](#banco-de-dados)
6. [Fluxos de Dados](#fluxos-de-dados)
7. [Segurança](#segurança)
8. [Performance](#performance)

---

## 🎯 Visão Geral

O Arquimedes é uma aplicação **full-stack type-safe** construída com:

- **Frontend**: React 19 + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express + tRPC
- **Banco de Dados**: MySQL/TiDB com Drizzle ORM
- **Autenticação**: Manus OAuth
- **IA**: Integração com LLM para geração de exercícios

### Princípios Arquiteturais

1. **Type Safety End-to-End**: tRPC garante tipos compartilhados entre frontend e backend
2. **Separação de Responsabilidades**: Camadas bem definidas (UI, API, Data)
3. **Escalabilidade**: Estrutura modular que facilita crescimento
4. **Testabilidade**: Código desacoplado e testável
5. **Performance**: Otimizações de queries e caching

---

## 🏛️ Arquitetura de Alto Nível

```
┌─────────────────────────────────────────────────────────────────┐
│                         USUÁRIO                                  │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            │ HTTPS
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND (React SPA)                          │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────────┐│
│  │    Pages     │  │  Components  │  │   tRPC Client          ││
│  │              │  │              │  │   (Type-safe API)      ││
│  │ - Home       │  │ - MathContent│  │                        ││
│  │ - Discipline │  │ - Exercise   │  │   React Query          ││
│  │ - Module     │  │ - Dashboard  │  │   (Cache & State)      ││
│  │ - Lesson     │  │              │  │                        ││
│  └──────────────┘  └──────────────┘  └────────────────────────┘│
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            │ HTTP/tRPC (JSON)
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND (Express + tRPC)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────────┐│
│  │   Routers    │  │   DB Layer   │  │   External Services    ││
│  │              │  │              │  │                        ││
│  │ - disciplines│  │ - getDb()    │  │ - LLM API             ││
│  │ - modules    │  │ - queries    │  │ - Notification API    ││
│  │ - pages      │  │ - mutations  │  │ - OAuth Service       ││
│  │ - exercises  │  │              │  │                        ││
│  │ - progress   │  │ Drizzle ORM  │  │                        ││
│  │ - dashboard  │  │              │  │                        ││
│  └──────────────┘  └──────────────┘  └────────────────────────┘│
│                            │                                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Middleware & Context                         │  │
│  │  - Authentication (Manus OAuth)                           │  │
│  │  - Session Management                                     │  │
│  │  - Error Handling                                         │  │
│  └──────────────────────────────────────────────────────────┘  │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            │ SQL
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    DATABASE (MySQL/TiDB)                         │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────────┐│
│  │   Tables     │  │   Indexes    │  │   Relationships        ││
│  │              │  │              │  │                        ││
│  │ - users      │  │ - Primary    │  │ users → pageProgress  ││
│  │ - disciplines│  │ - Foreign    │  │ disciplines → modules ││
│  │ - modules    │  │ - Composite  │  │ modules → pages       ││
│  │ - pages      │  │              │  │ pages → exercises     ││
│  │ - exercises  │  │              │  │                        ││
│  │ - progress   │  │              │  │                        ││
│  └──────────────┘  └──────────────┘  └────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

---

## 💻 Frontend

### Estrutura de Componentes

```
client/src/
├── pages/                    # Páginas principais (rotas)
│   ├── Home.tsx             # Landing page + Dashboard
│   ├── DisciplinePage.tsx   # Lista de módulos
│   ├── ModulePage.tsx       # Lista de páginas/aulas
│   └── LessonPage.tsx       # Conteúdo da aula + exercícios
│
├── components/              # Componentes reutilizáveis
│   ├── ui/                  # shadcn/ui components
│   ├── MathContent.tsx      # Renderização de LaTeX
│   ├── ExerciseCard.tsx     # Exercício interativo
│   └── ErrorBoundary.tsx    # Tratamento de erros
│
├── lib/                     # Utilitários
│   └── trpc.ts             # Cliente tRPC configurado
│
└── contexts/                # Contextos React
    └── ThemeContext.tsx     # Tema dark/light
```

### Roteamento

Usa **Wouter** (alternativa leve ao React Router):

```typescript
<Switch>
  <Route path="/" component={Home} />
  <Route path="/disciplina/:disciplineSlug" component={DisciplinePage} />
  <Route path="/disciplina/:disciplineSlug/modulo/:moduleSlug" component={ModulePage} />
  <Route path="/disciplina/:disciplineSlug/modulo/:moduleSlug/aula/:pageSlug" component={LessonPage} />
</Switch>
```

### Gerenciamento de Estado

- **React Query** (via tRPC): Cache e sincronização de dados do servidor
- **useState/useReducer**: Estado local de componentes
- **Context API**: Estado global (tema, autenticação)

### Renderização de Matemática

```typescript
// MathContent.tsx
import katex from "katex";

// Processa texto com LaTeX inline ($...$) e display ($$...$$)
function renderMathInText(text: string): string {
  // Inline: $x + y = z$
  text = text.replace(/\$(.*?)\$/g, (match, math) => {
    return katex.renderToString(math, { displayMode: false });
  });
  
  // Display: $$x^2 + y^2 = z^2$$
  text = text.replace(/\$\$(.*?)\$\$/g, (match, math) => {
    return katex.renderToString(math, { displayMode: true });
  });
  
  return text;
}
```

---

## ⚙️ Backend

### Arquitetura tRPC

```typescript
// server/routers.ts
export const appRouter = router({
  disciplines: router({
    list: publicProcedure.query(() => db.getAllDisciplines()),
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(({ input }) => db.getDisciplineBySlug(input.slug)),
  }),
  
  exercises: router({
    submit: protectedProcedure
      .input(z.object({ exerciseId: z.number(), answer: z.string() }))
      .mutation(async ({ ctx, input }) => {
        // Validação e feedback
      }),
  }),
});

export type AppRouter = typeof appRouter;
```

### Camada de Dados

```typescript
// server/db.ts
export async function getAllDisciplines(): Promise<Discipline[]> {
  const db = await getDb();
  return await db.select().from(disciplines).orderBy(disciplines.order);
}

export async function createExerciseAttempt(data: InsertExerciseAttempt) {
  const db = await getDb();
  const attemptNumber = (await getExerciseAttempts(data.userId, data.exerciseId)).length + 1;
  
  await db.insert(exerciseAttempts).values({
    ...data,
    attemptNumber,
  });
  
  return { attemptNumber, ...data };
}
```

### Middleware e Context

```typescript
// server/_core/context.ts
export async function createContext({ req, res }: CreateContextOptions): Promise<TrpcContext> {
  const user = await getUserFromSession(req);
  
  return {
    req,
    res,
    user, // null se não autenticado
  };
}

// Procedures
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user) throw new TRPCError({ code: 'UNAUTHORIZED' });
  return next({ ctx: { ...ctx, user: ctx.user } });
});
```

### Integração com LLM

```typescript
// server/_core/llm.ts
import { invokeLLM } from "./_core/llm";

const response = await invokeLLM({
  messages: [
    { role: "system", content: "Você é um professor de matemática..." },
    { role: "user", content: prompt }
  ],
  response_format: {
    type: "json_schema",
    json_schema: {
      name: "exercise",
      schema: {
        type: "object",
        properties: {
          question: { type: "string" },
          expectedAnswer: { type: "string" }
        }
      }
    }
  }
});
```

---

## 🗄️ Banco de Dados

### Schema Relacional

```
users
├── id (PK)
├── openId (unique)
├── name
├── email
└── role

disciplines
├── id (PK)
├── name
├── slug (unique)
└── order

modules
├── id (PK)
├── disciplineId (FK → disciplines)
├── name
├── slug
└── order

pages
├── id (PK)
├── moduleId (FK → modules)
├── title
├── slug
├── mainText
├── conceptSummary
└── estimatedMinutes

exercises
├── id (PK)
├── pageId (FK → pages)
├── question
├── expectedAnswer
├── alternativeAnswers (JSON)
└── hints (JSON)

exerciseAttempts
├── id (PK)
├── userId (FK → users)
├── exerciseId (FK → exercises)
├── answer
├── isCorrect
└── attemptNumber

pageProgress
├── id (PK)
├── userId (FK → users)
├── pageId (FK → pages)
├── completed
└── score

achievements
├── id (PK)
├── userId (FK → users)
├── type
├── title
└── relatedId
```

### Índices

```sql
-- Performance indexes
CREATE INDEX idx_modules_discipline ON modules(disciplineId);
CREATE INDEX idx_pages_module ON pages(moduleId);
CREATE INDEX idx_exercises_page ON exercises(pageId);
CREATE INDEX idx_attempts_user_exercise ON exerciseAttempts(userId, exerciseId);
CREATE INDEX idx_progress_user ON pageProgress(userId);
CREATE UNIQUE INDEX idx_progress_user_page ON pageProgress(userId, pageId);
```

---

## 🔄 Fluxos de Dados

### 1. Fluxo de Autenticação

```
1. Usuário clica em "Começar Agora"
   ↓
2. Redirecionamento para Manus OAuth Portal
   ↓
3. Usuário faz login no portal
   ↓
4. Callback para /api/oauth/callback
   ↓
5. Backend valida token e cria sessão
   ↓
6. Cookie de sessão é definido
   ↓
7. Redirecionamento para aplicação
   ↓
8. Frontend obtém dados do usuário via trpc.auth.me
```

### 2. Fluxo de Submissão de Exercício

```
1. Usuário digita resposta e clica "Enviar"
   ↓
2. Frontend chama trpc.exercises.submit.mutate()
   ↓
3. Backend valida resposta contra expectedAnswer
   ↓
4. Verifica alternativeAnswers (se houver)
   ↓
5. Cria registro em exerciseAttempts
   ↓
6. Retorna { isCorrect, attemptNumber, correctAnswer? }
   ↓
7. Frontend exibe feedback visual
   ↓
8. Se correto: marca exercício como completo
   ↓
9. Atualiza progresso da página
```

### 3. Fluxo de Geração de Exercício Personalizado

```
1. Usuário clica em "Gerar Exercício Personalizado"
   ↓
2. Frontend chama trpc.exercises.generatePersonalized.mutate()
   ↓
3. Backend busca progresso do usuário
   ↓
4. Monta prompt contextualizado para LLM
   ↓
5. Chama API do LLM com JSON Schema
   ↓
6. LLM retorna exercício estruturado
   ↓
7. Backend salva em generatedExercises
   ↓
8. Retorna exercício para frontend
   ↓
9. Frontend renderiza exercício dinamicamente
```

### 4. Fluxo de Atualização de Progresso

```
1. Usuário completa todos os exercícios da página
   ↓
2. Clica em "Marcar como Concluído"
   ↓
3. Frontend chama trpc.progress.updatePage.mutate()
   ↓
4. Backend atualiza pageProgress
   ↓
5. Verifica se todos as páginas do módulo foram completadas
   ↓
6. Se sim: cria achievement "Módulo Completo"
   ↓
7. Envia notificação ao proprietário
   ↓
8. Retorna sucesso para frontend
   ↓
9. Frontend atualiza UI e exibe conquista
```

---

## 🔒 Segurança

### Autenticação e Autorização

- **OAuth 2.0** via Manus
- **Session Cookies** HTTP-only e Secure
- **JWT** para validação de sessão
- **Protected Procedures** no tRPC

### Validação de Dados

```typescript
// Todas as entradas são validadas com Zod
.input(z.object({
  exerciseId: z.number().positive(),
  answer: z.string().min(1).max(500),
}))
```

### Proteção contra Ataques

- **SQL Injection**: Drizzle ORM com prepared statements
- **XSS**: React escapa automaticamente, KaTeX sanitiza LaTeX
- **CSRF**: Cookies com SameSite=Strict
- **Rate Limiting**: (TODO: implementar)

---

## ⚡ Performance

### Frontend

- **Code Splitting**: Lazy loading de rotas
- **React Query Cache**: Reduz requisições duplicadas
- **Memoization**: useMemo/useCallback em componentes pesados
- **Tailwind JIT**: CSS otimizado em build

### Backend

- **Connection Pooling**: MySQL connection pool
- **Query Optimization**: Índices estratégicos
- **Lazy Loading**: getDb() inicializa sob demanda
- **Caching**: (TODO: Redis para queries frequentes)

### Banco de Dados

- **Índices Compostos**: Para queries multi-coluna
- **Eager Loading**: Joins para reduzir N+1 queries
- **Paginação**: (TODO: para listas grandes)

---

## 🚀 Deploy

### Build

```bash
# Frontend + Backend
pnpm build

# Gera:
# - client/dist/ (React build)
# - dist/ (Express bundle)
```

### Variáveis de Ambiente

```env
NODE_ENV=production
DATABASE_URL=mysql://...
JWT_SECRET=...
OAUTH_SERVER_URL=...
BUILT_IN_FORGE_API_KEY=...
```

### Infraestrutura Recomendada

- **Frontend**: Vercel, Netlify, ou CDN
- **Backend**: Railway, Render, ou VPS
- **Banco de Dados**: TiDB Cloud, PlanetScale, ou MySQL gerenciado
- **Monitoramento**: Sentry para erros, Plausible para analytics

---

## 📈 Escalabilidade

### Horizontal Scaling

- Backend stateless (sessões em banco/Redis)
- Load balancer para múltiplas instâncias
- CDN para assets estáticos

### Vertical Scaling

- Otimização de queries
- Índices adicionais
- Connection pooling aumentado

### Futuras Otimizações

- [ ] Cache Redis para queries frequentes
- [ ] CDN para assets de conteúdo
- [ ] WebSockets para notificações em tempo real
- [ ] Worker threads para geração de exercícios em lote

---

## 🔧 Manutenção

### Logs

```typescript
// Estrutura de logs
console.log("[Database] Connected successfully");
console.error("[LLM] Failed to generate exercise:", error);
```

### Monitoramento

- Logs de erro capturados
- Métricas de performance (TODO)
- Alertas para falhas críticas (TODO)

### Backups

- Backup diário do banco de dados
- Retenção de 30 dias
- Testes de restore mensais

---

## 📚 Referências

- [tRPC Documentation](https://trpc.io/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [React Query](https://tanstack.com/query/latest)
- [KaTeX](https://katex.org/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**Última atualização**: Dezembro 2024  
**Versão**: 0.2.0  
**Mantido por**: MSC Consultorias
