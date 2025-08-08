# Learning-Management-System
CyberSecure LMS is a full-stack, secure, and scalable Learning Management System designed for educational institutions, coaching platforms, and corporate training. Built using Next.js for the frontend, Django + PostgreSQL for the backend, and deployed on AWS, it ensures performance, modularity, and robust data security.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install related modules in the frontend directory:
```bash
cd frontend
npm install
```
Than create a .env.local file with your keys and secrets inside frontend directory like this ->
```bash
AUTH0_SECRET= your_secret that you will get once runnning below command in the terminal.
AUTH0_BASE_URL=http://localhost:3000.
AUTH0_ISSUER_BASE_URL= your base url from AUTH0 dashboard
AUTH0_CLIENT_ID= your Client ID from AUTH0 dashboard
AUTH0_CLIENT_SECRET= your Client Secret from AUTH0 dashboard
```
To get Your AUTH0_SECRET run below command in your terminal
```bash
openssl rand -hex 32
```

Than start development server By running beow commands
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
