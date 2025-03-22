# 📦 Frontend - Sistema de Gerenciamento

Este projeto é o frontend de um sistema de gerenciamento, desenvolvido com **Next.js**, **ShadCN UI**, **Tailwind CSS**, **TanStack Query** e outras tecnologias modernas.

## 🚀 Tecnologias Utilizadas

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ShadCN UI](https://ui.shadcn.com/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Zod](https://zod.dev/)
- [React Hook Form](https://react-hook-form.com/)
- [Next Auth](https://next-auth.js.org/)
- [Ky](https://github.com/sindresorhus/ky) para requisições HTTP

## 📂 Estrutura

- `app/` – Arquivos principais do Next.js (rotas, layout)
- `components/` – Componentes reutilizáveis da UI
- `modules/` – Módulos específicos (ex: auth, produtos, pedidos)
- `lib/` – Funções utilitárias e configs (ex: auth, api)
- `services/` – Configuração da API com `ky`
- `__tests__/` – Testes unitários e de integração com Jest e Testing Library

## 📦 Requisitos

- Node.js 18+
- Yarn (ou npm/pnpm)

## 🧪 Rodando o Projeto

### Ambiente de Desenvolvimento

```bash
yarn install
yarn dev
