# 🚀 Guia de Deploy no GitHub

Este documento fornece instruções passo a passo para fazer o deploy do projeto Arquimedes no GitHub.

---

## 📋 Pré-requisitos

- Conta no GitHub
- Git instalado localmente
- Acesso ao repositório local do projeto
- Permissões para criar repositórios na organização MSC Consultorias (ou conta pessoal)

---

## 🔧 Passo 1: Criar Repositório no GitHub

### Via Interface Web

1. Acesse [github.com](https://github.com)
2. Clique no botão **"+"** no canto superior direito
3. Selecione **"New repository"**
4. Preencha os dados:
   - **Repository name**: `arquimedes`
   - **Description**: `Plataforma de educação em matemática básica para adultos - Do básico ao avançado`
   - **Visibility**: Public (ou Private, conforme preferência)
   - **NÃO** marque "Initialize this repository with a README"
   - **NÃO** adicione .gitignore ou license (já temos localmente)
5. Clique em **"Create repository"**

### Via GitHub CLI (alternativa)

```bash
gh repo create msc-consultorias/arquimedes \
  --public \
  --description "Plataforma de educação em matemática básica para adultos" \
  --source=. \
  --remote=origin
```

---

## 📤 Passo 2: Conectar Repositório Local ao GitHub

### Se você criou via interface web

```bash
# Adicionar remote origin
git remote add origin https://github.com/msc-consultorias/arquimedes.git

# Ou com SSH (recomendado)
git remote add origin git@github.com:msc-consultorias/arquimedes.git

# Verificar remote
git remote -v
```

### Se você criou via GitHub CLI

O remote já foi configurado automaticamente.

---

## 🚀 Passo 3: Push do Código

```bash
# Push da branch main
git push -u origin main

# Verificar se o push foi bem-sucedido
git log --oneline -1
```

**Saída esperada:**
```
Enumerating objects: 150, done.
Counting objects: 100% (150/150), done.
Delta compression using up to 8 threads
Compressing objects: 100% (120/120), done.
Writing objects: 100% (150/150), 1.5 MiB | 2.0 MiB/s, done.
Total 150 (delta 30), reused 0 (delta 0)
To github.com:msc-consultorias/arquimedes.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

---

## 🏷️ Passo 4: Criar Release (Opcional)

### Via Interface Web

1. Vá para a página do repositório no GitHub
2. Clique em **"Releases"** na barra lateral direita
3. Clique em **"Create a new release"**
4. Preencha:
   - **Tag version**: `v0.2.0`
   - **Release title**: `Arquimedes v0.2.0 - Lançamento Inicial`
   - **Description**: Cole o conteúdo do CHANGELOG.md para v0.2.0
5. Clique em **"Publish release"**

### Via GitHub CLI

```bash
gh release create v0.2.0 \
  --title "Arquimedes v0.2.0 - Lançamento Inicial" \
  --notes-file CHANGELOG.md
```

---

## ⚙️ Passo 5: Configurar Repositório

### Configurações Recomendadas

1. **Settings → General**
   - ✅ Allow merge commits
   - ✅ Allow squash merging
   - ✅ Allow rebase merging
   - ✅ Automatically delete head branches

2. **Settings → Branches**
   - Adicionar regra de proteção para `main`:
     - ✅ Require pull request reviews before merging
     - ✅ Require status checks to pass before merging
     - ✅ Require branches to be up to date before merging

3. **Settings → Pages** (se quiser GitHub Pages para docs)
   - Source: Deploy from a branch
   - Branch: `main` / `/docs`

4. **Settings → Secrets and variables → Actions**
   - Adicionar secrets necessários para CI/CD (se configurar)

---

## 🏷️ Passo 6: Adicionar Topics

1. Vá para a página principal do repositório
2. Clique em ⚙️ ao lado de "About"
3. Adicione topics:
   - `education`
   - `mathematics`
   - `e-learning`
   - `react`
   - `typescript`
   - `trpc`
   - `tailwindcss`
   - `drizzle-orm`
   - `latex`
   - `portuguese`

---

## 📊 Passo 7: Adicionar Badges ao README (Opcional)

O README já inclui badges básicos. Para adicionar mais:

```markdown
![Build Status](https://github.com/msc-consultorias/arquimedes/workflows/CI/badge.svg)
![Coverage](https://img.shields.io/codecov/c/github/msc-consultorias/arquimedes)
![Contributors](https://img.shields.io/github/contributors/msc-consultorias/arquimedes)
![Last Commit](https://img.shields.io/github/last-commit/msc-consultorias/arquimedes)
```

---

## 🔄 Workflow de Desenvolvimento

### Para Contribuidores

```bash
# 1. Fork o repositório no GitHub

# 2. Clone seu fork
git clone https://github.com/SEU-USUARIO/arquimedes.git
cd arquimedes

# 3. Adicione upstream
git remote add upstream https://github.com/msc-consultorias/arquimedes.git

# 4. Crie uma branch para sua feature
git checkout -b feature/minha-feature

# 5. Faça suas alterações e commit
git add .
git commit -m "feat: adiciona nova funcionalidade"

# 6. Push para seu fork
git push origin feature/minha-feature

# 7. Abra um Pull Request no GitHub
```

### Para Mantenedores

```bash
# Atualizar main local
git checkout main
git pull origin main

# Criar branch para nova feature
git checkout -b feature/nova-funcionalidade

# Desenvolver e testar
# ...

# Commit e push
git add .
git commit -m "feat: adiciona nova funcionalidade"
git push origin feature/nova-funcionalidade

# Criar Pull Request e fazer merge após revisão
```

---

## 🔐 Autenticação SSH (Recomendado)

### Gerar chave SSH

```bash
# Gerar nova chave SSH
ssh-keygen -t ed25519 -C "seu-email@example.com"

# Adicionar ao ssh-agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# Copiar chave pública
cat ~/.ssh/id_ed25519.pub
```

### Adicionar ao GitHub

1. Vá para **Settings → SSH and GPG keys**
2. Clique em **"New SSH key"**
3. Cole a chave pública
4. Clique em **"Add SSH key"**

### Testar conexão

```bash
ssh -T git@github.com
```

---

## 📝 Comandos Úteis

```bash
# Ver status do repositório
git status

# Ver histórico de commits
git log --oneline --graph --all

# Ver diferenças
git diff

# Ver branches
git branch -a

# Atualizar do remote
git fetch origin
git pull origin main

# Criar tag
git tag -a v0.2.0 -m "Release v0.2.0"
git push origin v0.2.0

# Ver informações do remote
git remote show origin
```

---

## 🐛 Troubleshooting

### Erro: "remote origin already exists"

```bash
git remote remove origin
git remote add origin git@github.com:msc-consultorias/arquimedes.git
```

### Erro: "Permission denied (publickey)"

Configure SSH corretamente (veja seção de Autenticação SSH acima).

### Erro: "Updates were rejected"

```bash
# Pull primeiro
git pull origin main --rebase

# Depois push
git push origin main
```

### Conflitos de Merge

```bash
# Ver arquivos em conflito
git status

# Resolver manualmente os conflitos
# Depois:
git add .
git commit -m "fix: resolve merge conflicts"
```

---

## 📚 Recursos Adicionais

- [GitHub Docs](https://docs.github.com/)
- [Git Documentation](https://git-scm.com/doc)
- [GitHub Flow](https://guides.github.com/introduction/flow/)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

## ✅ Checklist Final

- [ ] Repositório criado no GitHub
- [ ] Remote origin configurado
- [ ] Código enviado (git push)
- [ ] README.md visível na página principal
- [ ] License configurada
- [ ] Topics adicionados
- [ ] Branch protection configurada
- [ ] Issues templates funcionando
- [ ] PR template funcionando
- [ ] Release v0.2.0 criada (opcional)

---

**Última atualização**: Dezembro 2024  
**Mantido por**: MSC Consultorias
