# Deploy recomendado: Hostinger + Railway

Este projeto funciona melhor com esta divisão:

- Hostinger: arquivos do front-end publicados no seu domínio
- Railway: API Node.js e banco PostgreSQL

## Como fica a arquitetura

1. O cliente acessa o domínio na Hostinger.
2. O front-end chama a API pública do Railway.
3. O Railway grava e lê os dados no PostgreSQL hospedado.
4. Assim, produtos e pedidos ficam visíveis em qualquer dispositivo.

## 1. Publicar a API no Railway

1. Envie o projeto para um repositório GitHub.
2. No Railway, crie um novo projeto a partir desse repositório.
3. Adicione um serviço PostgreSQL no próprio Railway.
4. No serviço da aplicação, configure estas variáveis de ambiente:
   - PORT=3000
   - DATABASE_URL=valor gerado pelo PostgreSQL do Railway
   - JWT_SECRET=uma-chave-forte
   - ADMIN_EMAIL=seu-email-admin
   - ADMIN_PASSWORD=sua-senha-admin
   - FRONTEND_ORIGIN=https://seudominio.com
5. Defina o start command como:
   - npm start
6. Após o deploy, copie a URL pública da API, por exemplo:
   - https://essence-sam-api.up.railway.app

## 2. Configurar o front-end para usar a API do Railway

Antes de publicar na Hostinger, edite o arquivo api-config.js e defina a URL pública da API:

```js
window.ESSENCE_SAM_API_URL = "https://essence-sam-api.up.railway.app/api";
```

O arquivo já foi preparado para usar essa variável. Se ela estiver preenchida, o front-end vai usar o Railway em vez de tentar acessar /api no mesmo domínio.

## 3. Publicar o front-end na Hostinger

Publique estes arquivos no domínio da loja:

- index.html
- style.css
- script.js
- api-config.js

Se a sua publicação for apenas do front-end estático, isso é suficiente para a parte visual. O cadastro de produtos e pedidos continuará funcionando porque o site vai conversar com a API do Railway.

## 4. Testes depois do deploy

Faça estes testes nessa ordem:

1. Abra a URL da API no navegador:
   - https://sua-api.up.railway.app/api/health
2. Confirme se responde com ok true.
3. Abra o seu domínio da Hostinger.
4. Faça login no ADM.
5. Cadastre um produto.
6. Abra o site no celular.
7. Confirme se o mesmo produto aparece lá.

## 5. Problemas comuns

### O produto aparece no PC, mas não no celular

Causa mais comum:

- o front-end publicado ainda está usando armazenamento local ou a origem errada da API

Verifique:

- se api-config.js está apontando para a URL pública do Railway
- se a API do Railway está online
- se FRONTEND_ORIGIN está com o domínio correto

### Erro de CORS

Verifique se FRONTEND_ORIGIN está configurado com o domínio exato do site, por exemplo:

- https://seudominio.com

Se usar www, configure exatamente o endereço que será acessado.

### A API abre, mas o login não funciona

Verifique:

- ADMIN_EMAIL
- ADMIN_PASSWORD
- JWT_SECRET

Depois faça um novo deploy no Railway.

## 6. Resumo prático

- Hostinger entrega o site visual
- Railway executa Node.js
- Railway PostgreSQL guarda os dados
- o front-end precisa apontar para a URL pública da API

Sem isso, cada dispositivo pode acabar vendo dados diferentes.