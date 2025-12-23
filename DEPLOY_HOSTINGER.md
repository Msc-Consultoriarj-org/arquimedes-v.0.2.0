# Guia de Deploy - Hostinger VPS (Ubuntu 24.04)

Este guia descreve o processo passo a passo para colocar o projeto Arquimedes no ar usando sua VPS da Hostinger.

## 1. Preparação Local

Certifique-se de que você tem os seguintes arquivos no seu projeto (já criados):
- `ecosystem.config.cjs` (Configuração do PM2)
- `deploy/setup_vps.sh` (Script de instalação)
- `deploy/nginx.conf` (Configuração do servidor web)

**Importante:** O arquivo `HOSTINGER.md` contendo suas senhas foi adicionado ao `.gitignore` para não ser enviado ao GitHub. Mantenha-o seguro localmente.

## 2. Acesso à VPS

Abra seu terminal (PowerShell ou CMD) e conecte-se via SSH usando o IP da sua VPS:

```powershell
ssh root@147.79.84.235
```
*Digite a senha da VPS quando solicitado (está no seu arquivo HOSTINGER.md).*

## 3. Configuração do Servidor

Uma vez conectado na VPS, vamos preparar o ambiente.

1.  **Crie o script de setup:**
    ```bash
    nano setup.sh
    ```
2.  **Cole o conteúdo do arquivo `deploy/setup_vps.sh`** que está no seu projeto local.
3.  **Salve e saia:** (Ctrl+O, Enter, Ctrl+X).
4.  **Execute o script:**
    ```bash
    chmod +x setup.sh
    ./setup.sh
    ```

## 4. Enviando o Código

Você tem duas opções: clonar do GitHub (recomendado) ou copiar os arquivos do seu computador.

### Opção A: Clonar do GitHub (Recomendado)
Se você já subiu o código para o GitHub:
```bash
git clone https://github.com/SEU_USUARIO/arquimedes.git
cd arquimedes
npm install
npm run build
```

### Opção B: Copiar arquivos via SCP (Se não estiver no GitHub)
No seu computador local (abra outro terminal):
```powershell
# Estando na pasta do projeto
scp -r . root@147.79.84.235:/var/www/arquimedes
```
*Nota: Isso pode demorar um pouco.*

Na VPS:
```bash
cd /var/www/arquimedes
npm install
npm run build
```

## 5. Configuração das Variáveis de Ambiente

Na pasta do projeto na VPS:

1.  Crie o arquivo `.env`:
    ```bash
    nano .env
    ```
2.  Cole o conteúdo do seu `.env` local, mas faça estas alterações:
    *   Adicione/Altere: `NODE_ENV=production`
    *   Adicione: `PORT=3000`
    *   Certifique-se que `DATABASE_URL` e chaves do Supabase estão corretas.

## 6. Iniciando a Aplicação

Vamos usar o PM2 para manter o site online.

```bash
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```
*(Execute o comando que o `pm2 startup` gerar, se houver)*

## 7. Configurando o Domínio (Nginx)

1.  Crie o arquivo de configuração:
    ```bash
    nano /etc/nginx/sites-available/mscconsultoriarj.com.br
    ```
2.  Cole o conteúdo do arquivo `deploy/nginx.conf` local.
3.  Ative o site:
    ```bash
    ln -s /etc/nginx/sites-available/mscconsultoriarj.com.br /etc/nginx/sites-enabled/
    rm /etc/nginx/sites-enabled/default  # Remove o padrão se existir
    nginx -t                             # Testa a configuração
    systemctl restart nginx
    ```

## 8. Configurando HTTPS (SSL Gratuito)

Para deixar o site seguro (cadeado verde):

```bash
certbot --nginx -d mscconsultoriarj.com.br -d www.mscconsultoriarj.com.br
```
*Siga as instruções na tela (digite seu e-mail, aceite os termos).*

## 9. Conclusão

Seu site deve estar acessível em: https://mscconsultoriarj.com.br

### Comandos Úteis para Manutenção
- Ver logs: `pm2 logs arquimedes`
- Reiniciar site: `pm2 restart arquimedes`
- Parar site: `pm2 stop arquimedes`
