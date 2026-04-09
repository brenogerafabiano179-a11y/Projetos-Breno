# Node.js + PostgreSQL - ativação da loja

1. Crie um banco PostgreSQL chamado `essence_sam`.
2. Copie `.env.example` para `.env`.
3. Ajuste em `.env`:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
4. Instale as dependências:
   - `npm install`
5. Inicie tudo com um único comando:
   - `npm start`
6. Abra a loja em `http://localhost:3000`.

## O que a API faz

- login admin
- cadastro, edição e remoção de produtos
- favoritos por sessão
- carrinho por sessão
- criação de pedidos via carrinho
- painel admin com lista de pedidos e atualização de status

## Observações

- A API cria as tabelas automaticamente ao iniciar.
- A loja é servida pela mesma aplicação Node, então não precisa abrir o `index.html` em `file://`.
- Em produção ou fora do desenvolvimento local, use uma senha forte para o PostgreSQL e mantenha `pg_hba.conf` com autenticação por senha.
- Para publicar com front-end na Hostinger e API separada no Railway, use também o arquivo HOSTINGER-RAILWAY-DEPLOY.md.
