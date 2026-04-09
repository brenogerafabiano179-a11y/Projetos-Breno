# Deploy com Railway + Supabase

Use este fluxo quando quiser:

- API Node.js no Railway
- Banco PostgreSQL no Supabase
- Front-end publicado na Hostinger

## 1. O que já está pronto no projeto

O back-end já está preparado para:

- ler `DATABASE_URL`
- conectar com PostgreSQL remoto
- usar SSL com Supabase
- servir os endpoints `/api/*`

Arquivos principais:

- `server/server.js`
- `server/db.js`
- `.env.example`
- `api-config.js`

## 2. O que pegar no Supabase

No painel do Supabase, abra:

- Project Settings
- Database

Você vai precisar de:

1. Connection string do PostgreSQL
2. Project URL
3. Anon key

Para este projeto, o item realmente obrigatório para a API Node é a connection string do PostgreSQL.

## 3. Onde achar no Supabase

### Connection string do PostgreSQL

No Supabase:

1. Abra o projeto.
2. Vá em `Project Settings`.
3. Vá em `Database`.
4. Procure `Connection string`.
5. Escolha o formato compatível com Node/Postgres.

Exemplo:

`postgresql://postgres:SUA_SENHA@db.seu-projeto.supabase.co:5432/postgres`

### Project URL

No Supabase:

1. Abra o projeto.
2. Vá em `Project Settings`.
3. Vá em `API`.
4. Copie o campo `Project URL`.

Exemplo:

`https://seu-projeto.supabase.co`

### Anon key

No Supabase:

1. Abra o projeto.
2. Vá em `Project Settings`.
3. Vá em `API`.
4. Copie a `anon public` key.

Hoje ela não é obrigatória para o back-end Node deste projeto, mas vale guardar.

## 4. Como subir a API no Railway

### Criar o projeto

1. Entre no Railway.
2. Clique em `New Project`.
3. Escolha `Deploy from GitHub repo`.
4. Selecione o repositório da loja.

### Variáveis de ambiente no Railway

No serviço da aplicação, crie estas variáveis:

1. `PORT=3000`
2. `DATABASE_URL=postgresql://postgres:SUA_SENHA@db.seu-projeto.supabase.co:5432/postgres`
3. `PGSSLMODE=require`
4. `JWT_SECRET=sua-chave-forte`
5. `ADMIN_EMAIL=seu-email-admin`
6. `ADMIN_PASSWORD=sua-senha-admin`
7. `FRONTEND_ORIGIN=https://seudominio.com`

Se seu domínio usar `www`, use exatamente:

- `https://www.seudominio.com`

### Start command

Use:

`npm start`

## 5. Como gerar a URL pública no Railway

1. Abra o serviço da aplicação.
2. Vá em `Settings` ou `Networking`.
3. Gere um domínio público.

Você vai receber algo assim:

`https://essence-sam-api.up.railway.app`

A URL da API será:

`https://essence-sam-api.up.railway.app/api`

## 6. Como ajustar o front-end

Quando a URL pública da API existir, edite `api-config.js` e preencha:

```js
window.ESSENCE_SAM_API_URL = "https://essence-sam-api.up.railway.app/api";
```

Depois publique na Hostinger estes arquivos:

- `index.html`
- `style.css`
- `script.js`
- `api-config.js`

## 7. Testes que você deve fazer

### Teste 1: saúde da API

Abra no navegador:

`https://essence-sam-api.up.railway.app/api/health`

Esperado:

```json
{"ok":true,"databaseTime":"..."}
```

### Teste 2: catálogo

Abra:

`https://essence-sam-api.up.railway.app/api/products`

Esperado:

- um array JSON
- vazio ou com produtos cadastrados

### Teste 3: site publicado

1. Abra o domínio na Hostinger.
2. Faça login no ADM.
3. Cadastre um produto.
4. Abra o site no celular.
5. Verifique se o produto aparece.

## 8. Erros mais comuns

### O site abre, mas não salva produtos

Causas comuns:

- `api-config.js` sem a URL do Railway
- API do Railway offline
- `FRONTEND_ORIGIN` diferente do domínio real

### Erro de CORS

Corrija `FRONTEND_ORIGIN` para o domínio exato do front.

### Erro de conexão com Supabase

Verifique:

- `DATABASE_URL`
- `PGSSLMODE=require`
- senha do banco correta

## 9. O que me enviar para eu fechar a configuração

Quando você terminar a parte do Railway, me envie só isto:

1. URL pública da API do Railway
2. domínio final da Hostinger

Com isso eu ajusto o `api-config.js` para o valor exato.