Desafio de CRUD  de Vagas para TOTVS

Ambiente DEV escolhido:

Node.js <versão: v22.18.0>
Prisma <ORM>
Express <REST>
Postgres <DB> <versão 17.6>

Para organização:

| Camada      | Função                                 | Exemplo              |
| ----------- | -------------------------------------- | -------------------- |
| Services    | Lógica de negócio / Prisma             | `vagasService.js`    |
| Controllers | Recebe requisição e responde           | `vagasController.js` |
| Routes      | Define endpoints e conecta controllers | `vagasRoutes.js`     |
| Server.js   | Configura e inicia servidor            | `server.js`          |
| Index.js    | Opcional: centraliza exportações       | `routes/index.js`    | <-- Opção em caso de muitas rotas.

