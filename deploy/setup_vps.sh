#!/bin/bash

# Script de Configuração da VPS Hostinger para Arquimedes
# Ubuntu 24.04

set -e

echo "🚀 Iniciando configuração da VPS..."

# Atualizar sistema
echo "📦 Atualizando pacotes do sistema..."
apt update && apt upgrade -y

# Instalar Node.js 22.x
echo "📦 Instalando Node.js 22.x..."
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt install -y nodejs

# Instalar pnpm
echo "📦 Instalando pnpm..."
npm install -g pnpm

# Instalar PM2
echo "📦 Instalando PM2..."
npm install -g pm2

# Instalar Nginx
echo "📦 Instalando Nginx..."
apt install -y nginx

# Instalar Certbot para SSL
echo "📦 Instalando Certbot..."
apt install -y certbot python3-certbot-nginx

# Criar diretório do projeto
echo "📁 Criando diretório do projeto..."
mkdir -p /var/www/arquimedes
mkdir -p /var/www/arquimedes/logs

# Configurar firewall
echo "🔥 Configurando firewall..."
ufw allow 'Nginx Full'
ufw allow OpenSSH
ufw --force enable

echo "✅ Configuração básica concluída!"
echo ""
echo "Próximos passos:"
echo "1. Clone o repositório: git clone https://github.com/MSC-Consultoria/arquimedes0.0.1.git /var/www/arquimedes"
echo "2. Entre na pasta: cd /var/www/arquimedes"
echo "3. Instale dependências: pnpm install"
echo "4. Configure o arquivo .env"
echo "5. Faça o build: pnpm build"
echo "6. Inicie com PM2: pm2 start ecosystem.config.cjs"
