# 🚀 Guia de Deploy - Arquimedes

Este guia descreve como fazer o deploy do Arquimedes em uma VPS.

## 📋 Pré-requisitos

- VPS com Ubuntu 24.04
- Acesso root via SSH
- Domínio configurado apontando para o IP da VPS
- Variáveis de ambiente configuradas

## 🛠️ Instalação

### 1. Preparar o Servidor

Conecte-se à VPS via SSH:

```bash
ssh root@SEU_IP
```

Execute o script de setup:

```bash
curl -fsSL https://raw.githubusercontent.com/MSC-Consultoria/arquimedes0.0.1/main/deploy/setup_vps.sh | bash
```

Ou manualmente:

```bash
wget https://raw.githubusercontent.com/MSC-Consultoria/arquimedes0.0.1/main/deploy/setup_vps.sh
chmod +x setup_vps.sh
./setup_vps.sh
```

### 2. Clonar o Repositório

```bash
git clone https://github.com/MSC-Consultoria/arquimedes0.0.1.git /var/www/arquimedes
cd /var/www/arquimedes
```

### 3. Instalar Dependências

```bash
pnpm install
```

### 4. Configurar Variáveis de Ambiente

Crie o arquivo `.env`:

```bash
nano .env
```

Adicione as seguintes variáveis (ajuste conforme necessário):

```env
NODE_ENV=production
PORT=3000

# Database
DATABASE_URL=mysql://usuario:senha@host:3306/database

# JWT
JWT_SECRET=sua_chave_secreta_aqui

# OAuth (Manus)
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://portal.manus.im
VITE_APP_ID=seu_app_id

# Owner Info
OWNER_OPEN_ID=seu_open_id
OWNER_NAME=Seu Nome

# Manus Forge API
BUILT_IN_FORGE_API_URL=https://forge-api.manus.im
BUILT_IN_FORGE_API_KEY=sua_chave_api
VITE_FRONTEND_FORGE_API_KEY=sua_chave_frontend
VITE_FRONTEND_FORGE_API_URL=https://forge-api.manus.im

# Analytics
VITE_ANALYTICS_ENDPOINT=https://analytics.manus.im
VITE_ANALYTICS_WEBSITE_ID=seu_website_id

# App Config
VITE_APP_TITLE=Arquimedes - Matemática Descomplicada
VITE_APP_LOGO=/logo.png
```

### 5. Build da Aplicação

```bash
pnpm build
```

### 6. Configurar PM2

Inicie a aplicação com PM2:

```bash
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

Execute o comando gerado pelo `pm2 startup` (se houver).

### 7. Configurar Nginx

Copie a configuração do Nginx:

```bash
cp deploy/nginx.conf /etc/nginx/sites-available/mscconsultoriarj.com.br
```

Ou crie manualmente:

```bash
nano /etc/nginx/sites-available/mscconsultoriarj.com.br
```

Ative o site:

```bash
ln -s /etc/nginx/sites-available/mscconsultoriarj.com.br /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl restart nginx
```

### 8. Configurar SSL (HTTPS)

Obtenha certificado SSL gratuito com Let's Encrypt:

```bash
certbot --nginx -d mscconsultoriarj.com.br -d www.mscconsultoriarj.com.br
```

Siga as instruções na tela.

## ✅ Verificação

Acesse seu domínio: https://mscconsultoriarj.com.br

## 🔧 Comandos Úteis

### PM2

```bash
# Ver status
pm2 status

# Ver logs
pm2 logs arquimedes

# Reiniciar
pm2 restart arquimedes

# Parar
pm2 stop arquimedes

# Monitorar
pm2 monit
```

### Nginx

```bash
# Testar configuração
nginx -t

# Reiniciar
systemctl restart nginx

# Ver logs
tail -f /var/log/nginx/arquimedes_error.log
tail -f /var/log/nginx/arquimedes_access.log
```

### Git

```bash
# Atualizar código
cd /var/www/arquimedes
git pull origin main
pnpm install
pnpm build
pm2 restart arquimedes
```

## 🔒 Segurança

- Mantenha as variáveis de ambiente seguras
- Use senhas fortes para o banco de dados
- Mantenha o sistema atualizado: `apt update && apt upgrade`
- Configure firewall: `ufw status`
- Monitore logs regularmente

## 📞 Suporte

Para problemas ou dúvidas, consulte a documentação ou entre em contato.

---

**Arquimedes** - Plataforma de Educação em Matemática e Ciências
