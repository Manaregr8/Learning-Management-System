This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

but before that create a .env.local file with your keys and secrets like this ->

AUTH0_SECRET= your_secret that you will get once runnning below command in the terminal.
```bash
openssl rand -hex 32
```
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL= your base url from AUTH0 dashboard
AUTH0_CLIENT_ID= your Client ID from AUTH0 dashboard
AUTH0_CLIENT_SECRET= your Client Secret from AUTH0 dashboard
