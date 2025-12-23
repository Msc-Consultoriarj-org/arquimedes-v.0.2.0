# 🎓 Arquimedes - Plataforma de Educação em Matemática

<div align="center">

![Arquimedes Logo](https://img.shields.io/badge/Arquimedes-Matem%C3%A1tica%20Descomplicada-2563eb?style=for-the-badge)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)

**Educação de qualidade em matemática básica para adultos**

*Do básico ao avançado, sem infantilização*

[Demo ao Vivo](https://3000-izawxsbz194xne7hs1lhx-bbd42229.us2.manus.computer) · [Reportar Bug](https://github.com/msc-consultorias/arquimedes/issues) · [Solicitar Funcionalidade](https://github.com/msc-consultorias/arquimedes/issues)

</div>

---

## 📋 Sobre o Projeto

**Arquimedes** é uma plataforma educacional moderna desenvolvida pela **MSC Consultorias** com o objetivo de desmistificar o ensino de matemática para adultos. A plataforma oferece uma abordagem clara, prática e profissional, focando em conceitos fundamentais com aplicações do cotidiano.

### 🎯 Missão

Proporcionar educação matemática de qualidade, acessível e contextualizada para adultos que desejam reforçar seus conhecimentos básicos ou avançar em conceitos mais complexos, sem a infantilização comum em materiais educacionais tradicionais.

### ✨ Diferenciais

- **Abordagem Conceitual**: Foco na compreensão profunda, não apenas em cálculos mecânicos
- **Contextualização Prática**: Exemplos do cotidiano (finanças, compras, medidas)
- **Visualização Interativa**: Diagramas, retas numéricas e equações renderizadas
- **Feedback Imediato**: Sistema de exercícios com validação automática
- **Aprendizado Adaptativo**: Exercícios personalizados gerados por IA
- **Interface Profissional**: Design limpo e moderno, adequado para adultos

---

## 🚀 Funcionalidades

### ✅ Implementadas (v0.2.0)

- **Sistema de Navegação Hierárquica**
  - Estrutura Disciplina → Módulo → Página/Aula
  - Breadcrumb intuitivo
  - Índice interativo de conteúdo

- **Renderização de Conteúdo Educacional**
  - Texto formatado com Markdown
  - Equações matemáticas em LaTeX (KaTeX)
  - Suporte a conceitos-chave destacados

- **Exercícios Interativos**
  - Validação automática de respostas
  - Feedback imediato ao aluno
  - Histórico completo de tentativas
  - Sistema de dicas progressivas

- **Gestão de Progresso**
  - Rastreamento de aulas completadas
  - Sistema de pontuação por exercício
  - Dashboard personalizado com métricas
  - Recomendações de próximos passos

- **Geração Inteligente de Exercícios**
  - Integração com LLM (Large Language Model)
  - Exercícios personalizados baseados no nível do aluno
  - Problemas contextualizados do cotidiano

- **Sistema de Notificações**
  - Alertas ao proprietário sobre marcos dos alunos
  - Notificações de novas aulas disponíveis

- **Conteúdo Completo - Módulo 1**
  - **Adição e Subtração**: 3 páginas
  - **Multiplicação**: 3 páginas
  - **Divisão**: 3 páginas
  - Total: 9 aulas com exercícios práticos

### 🔜 Roadmap Futuro

- [ ] Embeds de vídeos do YouTube
- [ ] Diagramas interativos (SVG/Canvas)
- [ ] Sistema de conquistas gamificado
- [ ] Módulos de Física (5 módulos planejados)
- [ ] Fórum de discussão entre alunos
- [ ] Certificados de conclusão

---

## 🛠️ Tecnologias

### Frontend
- **React 19** - Framework UI
- **TypeScript** - Tipagem estática
- **Tailwind CSS 4** - Estilização
- **Wouter** - Roteamento
- **KaTeX** - Renderização de LaTeX
- **shadcn/ui** - Componentes UI

### Backend
- **Node.js** - Runtime
- **Express** - Servidor HTTP
- **tRPC 11** - API type-safe
- **Drizzle ORM** - ORM para banco de dados
- **MySQL/TiDB** - Banco de dados

### Infraestrutura
- **Manus OAuth** - Autenticação
- **Manus LLM API** - Geração de exercícios
- **Vitest** - Testes unitários
- **pnpm** - Gerenciador de pacotes

---

## 📁 Estrutura do Projeto

```
arquimedes/
├── client/                    # Frontend React
│   ├── public/               # Assets estáticos
│   └── src/
│       ├── components/       # Componentes reutilizáveis
│       │   ├── ui/          # shadcn/ui components
│       │   ├── MathContent.tsx
│       │   └── ExerciseCard.tsx
│       ├── pages/           # Páginas da aplicação
│       │   ├── Home.tsx
│       │   ├── DisciplinePage.tsx
│       │   ├── ModulePage.tsx
│       │   └── LessonPage.tsx
│       ├── lib/             # Utilitários
│       │   └── trpc.ts
│       ├── App.tsx          # Rotas principais
│       └── index.css        # Estilos globais
│
├── server/                   # Backend tRPC
│   ├── _core/               # Configuração do servidor
│   │   ├── llm.ts          # Integração LLM
│   │   ├── notification.ts  # Sistema de notificações
│   │   └── context.ts      # Contexto tRPC
│   ├── db.ts               # Queries do banco de dados
│   ├── routers.ts          # Endpoints tRPC
│   └── *.test.ts           # Testes unitários
│
├── drizzle/                 # Migrations do banco
│   └── schema.ts           # Schema do banco de dados
│
├── shared/                  # Código compartilhado
│   └── const.ts            # Constantes
│
├── docs/                    # Documentação adicional
│   ├── ARCHITECTURE.md     # Arquitetura detalhada
│   └── DATABASE.md         # Guia do banco de dados
│
└── seed-data.mjs           # Script de população inicial
```

---

## 🚀 Começando

### Pré-requisitos

- **Node.js** >= 18.x
- **pnpm** >= 8.x
- **MySQL** ou **TiDB** (banco de dados)

### Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/msc-consultorias/arquimedes.git
   cd arquimedes
   ```

2. **Instale as dependências**
   ```bash
   pnpm install
   ```

3. **Configure as variáveis de ambiente**
   
   Crie um arquivo `.env` na raiz do projeto:
   ```env
   DATABASE_URL=mysql://user:password@host:port/database
   JWT_SECRET=your-jwt-secret
   OAUTH_SERVER_URL=https://api.manus.im
   VITE_OAUTH_PORTAL_URL=https://portal.manus.im
   BUILT_IN_FORGE_API_URL=https://api.manus.im
   BUILT_IN_FORGE_API_KEY=your-api-key
   ```

4. **Execute as migrations do banco de dados**
   ```bash
   pnpm db:push
   ```

5. **Popule o banco com dados iniciais**
   ```bash
   node seed-data.mjs
   ```

6. **Inicie o servidor de desenvolvimento**
   ```bash
   pnpm dev
   ```

7. **Acesse a aplicação**
   
   Abra [http://localhost:3000](http://localhost:3000) no navegador

### Executar Testes

```bash
# Executar todos os testes
pnpm test

# Executar testes em modo watch
pnpm test --watch

# Verificar tipagem TypeScript
pnpm check
```

### Build para Produção

```bash
# Build do frontend e backend
pnpm build

# Iniciar em produção
pnpm start
```

---

## 📊 Banco de Dados

### Schema Principal

O banco de dados é estruturado em torno de 8 tabelas principais:

1. **users** - Usuários autenticados
2. **disciplines** - Disciplinas (ex: Matemática Básica)
3. **modules** - Módulos dentro de disciplinas
4. **pages** - Páginas/aulas com conteúdo
5. **exercises** - Exercícios fixos por página
6. **exerciseAttempts** - Tentativas de resolução
7. **pageProgress** - Progresso do usuário por página
8. **achievements** - Conquistas dos usuários

### Acesso ao Banco

Para acessar o banco de dados diretamente, consulte o guia completo em [docs/DATABASE.md](docs/DATABASE.md).

**Conexão rápida via CLI:**
```bash
mysql -h <host> -u <user> -p<password> <database>
```

---

## 🏗️ Arquitetura

A aplicação segue uma arquitetura **full-stack type-safe** com tRPC:

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                      │
│  ┌────────────┐  ┌──────────────┐  ┌─────────────────┐ │
│  │   Pages    │  │  Components  │  │  tRPC Client    │ │
│  └────────────┘  └──────────────┘  └─────────────────┘ │
└──────────────────────────┬──────────────────────────────┘
                           │ HTTP/tRPC
┌──────────────────────────┴──────────────────────────────┐
│                   BACKEND (Express + tRPC)               │
│  ┌────────────┐  ┌──────────────┐  ┌─────────────────┐ │
│  │  Routers   │  │   DB Layer   │  │   LLM Service   │ │
│  └────────────┘  └──────────────┘  └─────────────────┘ │
└──────────────────────────┬──────────────────────────────┘
                           │ SQL
┌──────────────────────────┴──────────────────────────────┐
│                  DATABASE (MySQL/TiDB)                   │
└──────────────────────────────────────────────────────────┘
```

Para detalhes completos, veja [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

---

## 🤝 Contribuindo

Contribuições são muito bem-vindas! Este projeto é mantido pela **MSC Consultorias** e está aberto para colaborações da comunidade.

### Como Contribuir

1. **Fork** o projeto
2. Crie uma **branch** para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. **Commit** suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. **Push** para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um **Pull Request**

### Diretrizes

- Mantenha o código limpo e bem documentado
- Adicione testes para novas funcionalidades
- Siga os padrões de código existentes
- Atualize a documentação quando necessário

Para mais detalhes, consulte [CONTRIBUTING.md](CONTRIBUTING.md).

---

## 📝 Licença

Este projeto está licenciado sob a **MIT License** - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## 👥 Autores

**MSC Consultorias**
- Website: [mscconsultorias.com.br](https://mscconsultorias.com.br)
- Email: contato@mscconsultorias.com.br

---

## 🙏 Agradecimentos

- Comunidade open source
- Contribuidores do projeto
- Alunos que testaram a plataforma
- Equipe Manus pela infraestrutura

---

## 📞 Suporte

Encontrou um bug? Tem uma sugestão?

- 🐛 [Reportar Bug](https://github.com/msc-consultorias/arquimedes/issues)
- 💡 [Solicitar Funcionalidade](https://github.com/msc-consultorias/arquimedes/issues)
- 📧 Email: suporte@mscconsultorias.com.br

---

<div align="center">

**Feito com ❤️ pela MSC Consultorias**

*Transformando a educação matemática, uma aula por vez*

</div>
