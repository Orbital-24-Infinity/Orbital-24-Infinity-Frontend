# Orbital-24-Infinity

Orbital 2024 Project for Team Infinity

This project is [hosted on Vercel](https://orbital-24-infinity.vercel.app/login), running Next.js on frontend, Postgres for database, and Python for the AI part.

## Getting Started

First, install the relevant dependencies and libraries using

```bash
yarn run install
#or
npm install
```

Secondly, edit the .env file with the appropriate values.
>For live database .env variables, you will have to request it from me
>Please deploy your own firebase and vercel app if you want to not edit live database

Thirdly, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```


If there is an update to the schema, run
```bash
npx prisma db push
```

For initial data, run
```bash
npx prisma studio
```

To edit the db with a GUI on localhost, run
```bash
npx prisma generate
```