# 🤝 Guia de Contribuição - Arquimedes

Obrigado por considerar contribuir com o projeto **Arquimedes**! Este documento fornece diretrizes para contribuir de forma efetiva.

---

## 📋 Índice

1. [Código de Conduta](#código-de-conduta)
2. [Como Posso Contribuir?](#como-posso-contribuir)
3. [Configuração do Ambiente](#configuração-do-ambiente)
4. [Processo de Desenvolvimento](#processo-de-desenvolvimento)
5. [Padrões de Código](#padrões-de-código)
6. [Commits e Pull Requests](#commits-e-pull-requests)
7. [Testes](#testes)
8. [Documentação](#documentação)

---

## 📜 Código de Conduta

Este projeto adere a um código de conduta para garantir um ambiente acolhedor e respeitoso para todos os contribuidores.

### Nossas Promessas

- Usar linguagem acolhedora e inclusiva
- Respeitar pontos de vista e experiências diferentes
- Aceitar críticas construtivas com elegância
- Focar no que é melhor para a comunidade
- Mostrar empatia com outros membros da comunidade

### Comportamentos Inaceitáveis

- Uso de linguagem ou imagens sexualizadas
- Comentários insultuosos ou depreciativos
- Assédio público ou privado
- Publicação de informações privadas de terceiros
- Outras condutas consideradas inapropriadas

---

## 🚀 Como Posso Contribuir?

### Reportar Bugs

Antes de criar um relatório de bug, verifique se o problema já não foi reportado. Se não encontrar nada relacionado, crie uma nova issue incluindo:

- **Título claro e descritivo**
- **Passos para reproduzir** o problema
- **Comportamento esperado** vs **comportamento observado**
- **Screenshots** (se aplicável)
- **Ambiente** (navegador, versão do Node.js, etc.)

### Sugerir Melhorias

Para sugerir novas funcionalidades:

1. Verifique se a funcionalidade já não foi sugerida
2. Crie uma issue com o label `enhancement`
3. Descreva claramente:
   - O problema que a funcionalidade resolve
   - Como você imagina que funcionaria
   - Exemplos de uso

### Contribuir com Código

1. **Fork** o repositório
2. **Clone** seu fork localmente
3. Crie uma **branch** para sua contribuição
4. Faça suas alterações
5. **Teste** suas alterações
6. **Commit** seguindo nossas convenções
7. **Push** para seu fork
8. Abra um **Pull Request**

---

## ⚙️ Configuração do Ambiente

### Pré-requisitos

- Node.js >= 18.x
- pnpm >= 8.x
- MySQL ou TiDB
- Git

### Setup Inicial

```bash
# Clone seu fork
git clone https://github.com/SEU-USUARIO/arquimedes.git
cd arquimedes

# Adicione o repositório original como upstream
git remote add upstream https://github.com/msc-consultorias/arquimedes.git

# Instale as dependências
pnpm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com suas credenciais

# Execute as migrations
pnpm db:push

# Popule o banco de dados
node seed-data.mjs

# Inicie o servidor de desenvolvimento
pnpm dev
```

---

## 🔄 Processo de Desenvolvimento

### 1. Sincronize com o Upstream

Antes de começar a trabalhar, sincronize com o repositório principal:

```bash
git checkout main
git fetch upstream
git merge upstream/main
```

### 2. Crie uma Branch

Use nomes descritivos para suas branches:

```bash
# Para novas funcionalidades
git checkout -b feature/nome-da-funcionalidade

# Para correções de bugs
git checkout -b fix/descricao-do-bug

# Para melhorias de documentação
git checkout -b docs/descricao-da-melhoria
```

### 3. Faça suas Alterações

- Mantenha commits pequenos e focados
- Teste suas alterações localmente
- Siga os padrões de código do projeto

### 4. Execute os Testes

```bash
# Executar todos os testes
pnpm test

# Verificar tipagem
pnpm check

# Formatar código
pnpm format
```

### 5. Commit e Push

```bash
git add .
git commit -m "tipo: descrição breve"
git push origin nome-da-sua-branch
```

### 6. Abra um Pull Request

- Use um título claro e descritivo
- Descreva as mudanças realizadas
- Referencie issues relacionadas
- Adicione screenshots se aplicável

---

## 📝 Padrões de Código

### TypeScript

- Use **TypeScript** para todo código novo
- Evite `any`, prefira tipos explícitos
- Use interfaces para objetos complexos
- Documente funções públicas com JSDoc

### React

- Use **componentes funcionais** com hooks
- Mantenha componentes pequenos e focados
- Use **TypeScript** para props
- Evite lógica complexa no JSX

### Estilização

- Use **Tailwind CSS** para estilos
- Siga a convenção de classes do projeto
- Use componentes do **shadcn/ui** quando possível
- Mantenha consistência visual

### Backend

- Use **tRPC** para todas as APIs
- Separe lógica de negócio em `db.ts`
- Valide inputs com **Zod**
- Documente endpoints complexos

### Nomenclatura

```typescript
// Componentes: PascalCase
export function ExerciseCard() {}

// Funções: camelCase
function calculateScore() {}

// Constantes: UPPER_SNAKE_CASE
const MAX_ATTEMPTS = 3;

// Tipos/Interfaces: PascalCase
interface UserProgress {}
```

---

## 💬 Commits e Pull Requests

### Convenção de Commits

Seguimos o padrão **Conventional Commits**:

```
tipo(escopo): descrição breve

Descrição detalhada (opcional)

Rodapé (opcional)
```

**Tipos:**
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Mudanças na documentação
- `style`: Formatação, ponto e vírgula, etc.
- `refactor`: Refatoração de código
- `test`: Adição ou correção de testes
- `chore`: Manutenção, dependências, etc.

**Exemplos:**
```
feat(exercises): adiciona validação de respostas alternativas
fix(auth): corrige redirecionamento após login
docs(readme): atualiza instruções de instalação
```

### Pull Requests

**Título do PR:**
```
tipo: Descrição clara do que foi feito
```

**Descrição do PR:**
```markdown
## Descrição
Breve descrição das mudanças realizadas.

## Tipo de Mudança
- [ ] Bug fix
- [ ] Nova funcionalidade
- [ ] Breaking change
- [ ] Documentação

## Como Testar
1. Passo 1
2. Passo 2
3. Resultado esperado

## Checklist
- [ ] Código segue os padrões do projeto
- [ ] Testes foram adicionados/atualizados
- [ ] Documentação foi atualizada
- [ ] Todos os testes passam
```

---

## 🧪 Testes

### Executando Testes

```bash
# Todos os testes
pnpm test

# Modo watch
pnpm test --watch

# Coverage
pnpm test --coverage
```

### Escrevendo Testes

- Adicione testes para novas funcionalidades
- Mantenha testes simples e legíveis
- Use nomes descritivos
- Teste casos de sucesso e erro

**Exemplo:**
```typescript
describe("Exercises Router", () => {
  it("should validate correct answer", async () => {
    const result = await caller.exercises.submit({
      exerciseId: 1,
      answer: "8",
    });
    
    expect(result.isCorrect).toBe(true);
  });
});
```

---

## 📚 Documentação

### Atualizando Documentação

Sempre que adicionar ou modificar funcionalidades:

1. Atualize o **README.md** se necessário
2. Documente funções complexas com **JSDoc**
3. Adicione comentários explicativos
4. Atualize **ARCHITECTURE.md** para mudanças estruturais

### Comentários no Código

```typescript
/**
 * Valida a resposta do exercício e retorna feedback
 * 
 * @param exerciseId - ID do exercício
 * @param answer - Resposta fornecida pelo usuário
 * @returns Objeto com resultado da validação
 */
async function validateAnswer(exerciseId: number, answer: string) {
  // Implementação
}
```

---

## ❓ Dúvidas?

Se tiver dúvidas sobre como contribuir:

- Abra uma **issue** com a label `question`
- Entre em contato: contato@mscconsultorias.com.br
- Consulte a documentação em `/docs`

---

## 🎉 Reconhecimento

Todos os contribuidores serão reconhecidos no projeto. Suas contribuições ajudam a tornar a educação matemática mais acessível!

---

**Obrigado por contribuir com o Arquimedes! 🚀**

*MSC Consultorias - Transformando a educação matemática*
