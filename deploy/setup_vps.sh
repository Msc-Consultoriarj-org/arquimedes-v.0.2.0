#!/bin/bash

# Script de Configuração Inicial para VPS Hostinger (Ubuntu 24.04)
# Execute este script como root ou com sudo

echo ">>> Atualizando o sistema..."
apt update && apt upgrade -y

echo ">>> Instalando Node.js 20..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

echo ">>> Verificando versões..."
node -v
npm -v

echo ">>> Instalando PM2 (Gerenciador de Processos)..."
npm install -g pm2

echo ">>> Instalando Nginx (Servidor Web)..."
apt install -y nginx

echo ">>> Instalando Certbot (SSL)..."
apt install -y certbot python3-certbot-nginx

echo ">>> Configurando Firewall..."
ufw allow 'Nginx Full'
ufw allow OpenSSH
ufw enable

echo ">>> Instalação concluída!"
