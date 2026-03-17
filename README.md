# GiftLink - Casamento

Este é um projeto NextJS para uma lista de presentes elegante e funcional.

## Repositório Remoto (Secundário)

Para enviar o seu código para o repositório no GitHub, você pode usar os seguintes comandos no seu terminal:

```bash
# Se você já tiver um origin, adicione este como secundário
git remote add secondary https://github.com/heliocalriz/casamento.git

# Para enviar os arquivos
git add .
git commit -m "Cópia do projeto para repositório secundário"
git push secondary main
```

## Tecnologias Utilizadas

- **Next.js 15** (App Router)
- **React 19**
- **Genkit** (IA para descrições de presentes)
- **Tailwind CSS** & **ShadCN UI**
- **Lucide React** (Ícones)

## Estrutura do Projeto

- `src/app`: Rotas e páginas da aplicação.
- `src/components`: Componentes reutilizáveis de UI.
- `src/ai`: Fluxos de inteligência artificial usando Genkit.
- `src/lib`: Funções utilitárias, tipos e simulação de banco de dados.

## Prisma & Banco de Dados

Este projeto foi adaptado para usar Prisma com PostgreSQL (Supabase).

- Copie `.env.example` para `.env` e preencha a senha em `DATABASE_URL` e `DIRECT_URL`.
- `DATABASE_URL` deve apontar para o pooler (pgbouncer) para uso em runtime.
- `DIRECT_URL` deve apontar diretamente para o banco (porta 5432) e será usada para migrações.

Comandos úteis:

```bash
# instalar dependências
npm install

# gerar cliente Prisma
npm run prisma:generate

# executar migração de desenvolvimento (usa directUrl do schema)
npm run prisma:migrate:dev

# abrir o Prisma Studio
npm run prisma:studio

# iniciar app localmente (padrão 3000)
npm run dev:local
```

Observação: mantenha `DATABASE_URL` com `?pgbouncer=true` para habilitar pooler em produção/local runtime, e `DIRECT_URL` para operações de migração quando necessário.

