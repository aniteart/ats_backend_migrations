# ATS Vagas

API para cadastro e gestão de vagas.

## Stack
- Node.js (ESM), Express
- Prisma (PostgreSQL)
- Jest + Supertest (tests)

## Como rodar
```bash
npm i
cp .env.example .env   # configure DATABASE_URL
npm run dev            # node src/server.js

# Arquitetura
## Camadas
- **Controller (Express)**: valida entrada, faz parsing (ex.: salário BR), traduz erros p/ HTTP.
- **Service**: regras de negócio, delega ao Prisma.
- **Infra (Prisma)**: acesso a dados (`prisma.vaga.*`).

## Fluxo (resumo)
Request → Controller → Service → Prisma → Response.

## Convenções
- ESM (import/export).
- Erros Prisma `P2025` → HTTP 404 no controller.
- Ordenação padrão: `createdAt desc`.
- Paginação: `page`, `limit` (defaults `1` e `10`).

# Testes
## Stack
- Jest (ESM, `unstable_mockModule`)
- Supertest (rotas Express sem subir servidor)

## Rodando
```bash
npm test


## Contexto
Queremos testes rápidos e isolados, sem hits no banco, validando contrato com Prisma e contrato HTTP.

## Decisão
- Mockar `@prisma/client` no **service**.
- Mockar o **service** no **controller**.
- Supertest para rotas; Jest + ESM (`unstable_mockModule`).