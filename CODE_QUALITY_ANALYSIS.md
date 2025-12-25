# 🔍 Relatório de Análise de Qualidade de Código

**Projeto:** Arquimedes
**Data:** Thu Dec 25 06:49:56 UTC 2025

---

## 🗑️ Análise de Arquivos Não Utilizados

_A detecção automática de arquivos não utilizados (dead code) é complexa neste projeto devido ao uso de um sistema de roteamento dinâmico (`wouter`). Uma análise superficial anterior indicou incorretamente que páginas essenciais como `Dashboard.tsx` e `LoginPage.tsx` estavam sem uso. Uma análise mais aprofundada, que inclua a análise da configuração do roteador, é necessária para identificar com segurança os arquivos que podem ser removidos._

## 📏 Arquivos Muito Grandes (4)

Arquivos com mais de 500 linhas que precisam ser modularizados:

- 🔴 `server/db.ts` - **1553 linhas**
- 🟡 `client/src/pages/InteractiveExerciseRoomPage.tsx` - **858 linhas**
- 🟢 `client/src/components/ui/sidebar.tsx` - **669 linhas**
- 🟢 `server/routers.ts` - **585 linhas**


## ⚠️ Tipagens Fracas (26)

**Total de ocorrências:** 50

- `client/src/hooks/usePersistFn.ts` - Uso de 'any' type (1x)
  - Linhas: 3
- `client/src/hooks/usePersistFn.ts` - Array de 'any' (1x)
  - Linhas: 3
- `client/src/lib/sounds.ts` - Type assertion 'as any' (1x)
  - Linhas: 24
- `client/src/lib/structuredData.ts` - Uso de 'any' type (1x)
  - Linhas: 178
- `client/src/pages/UnifiedExerciseRoomPage.tsx` - Uso de 'any' type (1x)
  - Linhas: 374
- `client/src/pages/UnifiedExerciseRoomPage.tsx` - Type assertion 'as any' (1x)
  - Linhas: 374
- `client/src/pages/ProfilePage.tsx` - Uso de 'any' type (1x)
  - Linhas: 161
- `client/src/pages/AdminPage.tsx` - Uso de 'any' type (1x)
  - Linhas: 27
- `client/src/pages/AdminPage.tsx` - Comentário @ts-ignore (1x)
  - Linhas: 18
- `client/src/pages/DailyChallengePage.tsx` - Uso de 'any' type (1x)
  - Linhas: 90
- `client/src/pages/ExerciseRoomPage.tsx` - Uso de 'any' type (1x)
  - Linhas: 82
- `client/src/components/StructuredData.tsx` - Uso de 'any' type (1x)
  - Linhas: 5
- `client/src/components/MathContent.tsx` - Uso de 'any' type (9x)
  - Linhas: 81, 86, 91, 96, 101
- `client/src/components/ui/input.tsx` - Type assertion 'as any' (1x)
  - Linhas: 25
- `client/src/components/ui/textarea.tsx` - Type assertion 'as any' (1x)
  - Linhas: 24
- `client/src/components/ui/dialog.tsx` - Type assertion 'as any' (1x)
  - Linhas: 107
- `server/moduleVideos.test.ts` - Type assertion 'as any' (2x)
  - Linhas: 20, 21
- `server/test-setup.ts` - Type assertion 'as any' (2x)
  - Linhas: 66, 67
- `server/points.test.ts` - Type assertion 'as any' (2x)
  - Linhas: 23, 24
- `server/storage.ts` - Type assertion 'as any' (1x)
  - Linhas: 60
- `server/db.ts` - Uso de 'any' type (1x)
  - Linhas: 885
- `server/db.ts` - Type assertion 'as any' (6x)
  - Linhas: 136, 173, 210, 237, 328
- `server/standalone.test.ts` - Type assertion 'as any' (2x)
  - Linhas: 21, 22
- `server/achievements.test.ts` - Type assertion 'as any' (2x)
  - Linhas: 21, 25
- `server/dailyChallenge.test.ts` - Type assertion 'as any' (2x)
  - Linhas: 21, 22
- `server/_core/sdk.ts` - Type assertion 'as any' (6x)
  - Linhas: 138, 139, 142, 249, 250


## 🗑️ Componentes Obsoletos/Demo (3)

**Total de linhas:** 726

- `client/src/pages/ComponentsDemo.tsx` (304 linhas) - Nome sugere componente de demonstração
- `client/src/pages/VisualsDemo.tsx` (248 linhas) - Nome sugere componente de demonstração
- `client/src/pages/InteractiveDemo.tsx` (174 linhas) - Nome sugere componente de demonstração


## 📊 Resumo

- **Arquivos muito grandes:** 4
- **Problemas de tipagem:** 26
- **Componentes obsoletos:** 3

**Linhas que podem ser removidas:** ~726