# 📤 Como Fazer Push para o GitHub

O commit já foi criado localmente. Agora você precisa fazer o push para o repositório no GitHub.

## Opção 1: Usar GitHub CLI (Recomendado)

Se você já tem o GitHub CLI configurado no sandbox:

```bash
cd /home/ubuntu/arquimedes
gh auth login
git push origin main
```

## Opção 2: Usar Token de Acesso Pessoal

1. **Criar Token no GitHub:**
   - Acesse: https://github.com/settings/tokens
   - Clique em "Generate new token" > "Generate new token (classic)"
   - Marque as permissões: `repo` (todas)
   - Clique em "Generate token"
   - **Copie o token** (você não poderá vê-lo novamente)

2. **Fazer Push com Token:**
   ```bash
   cd /home/ubuntu/arquimedes
   git push https://SEU_TOKEN@github.com/MSC-Consultoria/arquimedes0.0.1.git main
   ```

## Opção 3: Configurar SSH (Mais Seguro)

1. **Gerar chave SSH:**
   ```bash
   ssh-keygen -t ed25519 -C "seu_email@example.com"
   cat ~/.ssh/id_ed25519.pub
   ```

2. **Adicionar chave no GitHub:**
   - Acesse: https://github.com/settings/keys
   - Clique em "New SSH key"
   - Cole a chave pública
   - Salve

3. **Fazer Push:**
   ```bash
   cd /home/ubuntu/arquimedes
   git remote set-url origin git@github.com:MSC-Consultoria/arquimedes0.0.1.git
   git push origin main
   ```

## Verificar Status

Após o push bem-sucedido:

```bash
git status
git log --oneline -5
```

## Commit Criado

O seguinte commit está pronto para ser enviado:

```
feat: adicionar configurações de deploy para VPS Hostinger

- Adicionar ecosystem.config.cjs para PM2
- Criar script de setup da VPS (deploy/setup_vps.sh)
- Adicionar configuração Nginx (deploy/nginx.conf)
- Criar guia de deploy (DEPLOY.md)
- Adicionar HOSTINGER.md ao .gitignore
- Atualizar todo.md com tarefas de deploy
```

## Arquivos Adicionados

- `ecosystem.config.cjs` - Configuração do PM2
- `deploy/setup_vps.sh` - Script de instalação da VPS
- `deploy/nginx.conf` - Configuração do Nginx
- `DEPLOY.md` - Guia completo de deploy
- `.gitignore` - Atualizado com HOSTINGER.md
- `todo.md` - Atualizado com tarefas de deploy
