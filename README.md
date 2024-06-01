# Orbital-24-Infinity

Orbital 2024 Project for Team Infinity

This project is [hosted on Vercel](https://orbital-24-infinity.vercel.app/login), running Next.js on frontend, Postgres for database, and Python for the AI part.

It is deployed on Vercel with [this](https://github.com/InfinityTwo/Orbital-24-Infinity-Frontend-Deployment) forked repository.

## Getting Started

### First, install the relevant dependencies and libraries using

```bash
yarn run install
#or
npm install
```

### Secondly, edit the .env file with the appropriate values.
- For live Postgres database and Firebase .env variables, you will have to request it from me (owner).
- For development purposes, please fork the repo and deploy your own Firebase (with Google Authentication) and Vercel app and fill in the variables yourself.

### Thirdly, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Deployment

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
