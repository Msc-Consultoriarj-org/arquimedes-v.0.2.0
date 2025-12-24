# 🔍 Relatório de Análise de Qualidade de Código

**Projeto:** Arquimedes
**Data:** Tue Dec 23 19:16:47 EST 2025

---

## 🗑️ Arquivos Não Utilizados (18)

**Total de linhas que podem ser removidas:** 5894

- `client/src/pages/ComponentShowcase.tsx` (1402 linhas) - Não importado em App.tsx
- `client/src/pages/ComponentsDemo.tsx` (304 linhas) - Não importado em App.tsx
- `client/src/pages/Dashboard.tsx` (466 linhas) - Não importado em App.tsx
- `client/src/pages/DisciplinePage.tsx` (170 linhas) - Não importado em App.tsx
- `client/src/pages/LessonPage.tsx` (282 linhas) - Não importado em App.tsx
- `client/src/pages/Login.tsx` (214 linhas) - Não importado em App.tsx
- `client/src/pages/ModulePage.tsx` (164 linhas) - Não importado em App.tsx
- `client/src/pages/VisualsDemo.tsx` (248 linhas) - Não importado em App.tsx
- `client/src/pages/LoginPage.tsx` (115 linhas) - Não importado em App.tsx
- `client/src/pages/ProfilePage.tsx` (279 linhas) - Não importado em App.tsx
- `client/src/pages/ExerciseRoomPage.tsx` (290 linhas) - Não importado em App.tsx
- `client/src/pages/VideoRoomPage.tsx` (212 linhas) - Não importado em App.tsx
- `client/src/pages/DailyChallengePage.tsx` (287 linhas) - Não importado em App.tsx
- `client/src/pages/DisciplinesPage.tsx` (130 linhas) - Não importado em App.tsx
- `client/src/pages/AchievementsPage.tsx` (200 linhas) - Não importado em App.tsx
- `client/src/pages/InteractiveDemo.tsx` (174 linhas) - Não importado em App.tsx
- `client/src/pages/InteractiveExerciseRoomPage.tsx` (815 linhas) - Não importado em App.tsx
- `client/src/pages/AdminPage.tsx` (142 linhas) - Não importado em App.tsx


## 📏 Arquivos Muito Grandes (4)

Arquivos com mais de 500 linhas que precisam ser modularizados:

- 🔴 `client/src/pages/ComponentShowcase.tsx` - **1402 linhas**
- 🔴 `server/db.ts` - **1174 linhas**
- 🟡 `client/src/pages/InteractiveExerciseRoomPage.tsx` - **815 linhas**
- 🟢 `client/src/components/ui/sidebar.tsx` - **669 linhas**


## ⚠️ Tipagens Fracas (24)

**Total de ocorrências:** 48

- `client/src/hooks/usePersistFn.ts` - Uso de 'any' type (1x)
  - Linhas: 3
- `client/src/hooks/usePersistFn.ts` - Array de 'any' (1x)
  - Linhas: 3
- `client/src/lib/sounds.ts` - Type assertion 'as any' (1x)
  - Linhas: 24
- `client/src/lib/structuredData.ts` - Uso de 'any' type (1x)
  - Linhas: 178
- `client/src/components/MathContent.tsx` - Uso de 'any' type (9x)
  - Linhas: 81, 86, 91, 96, 101
- `client/src/components/StructuredData.tsx` - Uso de 'any' type (1x)
  - Linhas: 5
- `client/src/components/ui/dialog.tsx` - Type assertion 'as any' (1x)
  - Linhas: 107
- `client/src/components/ui/input.tsx` - Type assertion 'as any' (1x)
  - Linhas: 25
- `client/src/components/ui/textarea.tsx` - Type assertion 'as any' (1x)
  - Linhas: 24
- `client/src/pages/ProfilePage.tsx` - Uso de 'any' type (1x)
  - Linhas: 100
- `client/src/pages/ExerciseRoomPage.tsx` - Uso de 'any' type (1x)
  - Linhas: 82
- `client/src/pages/DailyChallengePage.tsx` - Uso de 'any' type (1x)
  - Linhas: 90
- `client/src/pages/AdminPage.tsx` - Uso de 'any' type (1x)
  - Linhas: 27
- `client/src/pages/AdminPage.tsx` - Comentário @ts-ignore (1x)
  - Linhas: 18
- `server/db.ts` - Uso de 'any' type (1x)
  - Linhas: 865
- `server/db.ts` - Type assertion 'as any' (6x)
  - Linhas: 134, 163, 200, 227, 318
- `server/routers.ts` - Uso de 'any' type (2x)
  - Linhas: 609, 612
- `server/storage.ts` - Type assertion 'as any' (1x)
  - Linhas: 60
- `server/points.test.ts` - Type assertion 'as any' (2x)
  - Linhas: 23, 24
- `server/standalone.test.ts` - Type assertion 'as any' (2x)
  - Linhas: 21, 22
- `server/dailyChallenge.test.ts` - Type assertion 'as any' (2x)
  - Linhas: 21, 22
- `server/moduleVideos.test.ts` - Type assertion 'as any' (2x)
  - Linhas: 20, 21
- `server/achievements.test.ts` - Type assertion 'as any' (2x)
  - Linhas: 21, 25
- `server/_core/sdk.ts` - Type assertion 'as any' (6x)
  - Linhas: 138, 139, 142, 249, 250


## 🗑️ Componentes Obsoletos/Demo (4)

**Total de linhas:** 2128

- `client/src/pages/ComponentShowcase.tsx` (1402 linhas) - Nome sugere componente de demonstração
- `client/src/pages/ComponentsDemo.tsx` (304 linhas) - Nome sugere componente de demonstração
- `client/src/pages/VisualsDemo.tsx` (248 linhas) - Nome sugere componente de demonstração
- `client/src/pages/InteractiveDemo.tsx` (174 linhas) - Nome sugere componente de demonstração


## 📊 Resumo

- **Arquivos não utilizados:** 18
- **Arquivos muito grandes:** 4
- **Problemas de tipagem:** 24
- **Componentes obsoletos:** 4

**Linhas que podem ser removidas:** ~8022