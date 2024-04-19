This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## CMD's to update db changes

npx prisma generate - to generate or update the client code 

npx prisma db push - to sync your db with your code changes

npx prisma studio - to see the tables and data 


## Stripe local testing

stripe login

stripe listen --forward-to localhost:3000/api/webhook

stripe trigger payment_intent.succeeded              