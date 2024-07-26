# Orbital-24-Infinity

Orbital 2024 Project for Team Infinity

This project is [hosted on Vercel](https://orbital-24-infinity-frontend-deployment.vercel.app/login), running Next.js on frontend, Postgres for database, and Python for the AI part.

It is deployed on Vercel with [this](https://github.com/Orbital6039/Orbital-24-Infinity-Frontend-Deployment) forked repository.

## Getting Started

### First, install the relevant dependencies and libraries using

```bash
npm install
#or
yarn run install
```

### Secondly, setup Firebase, Vercel with Postgres and edit the .env file with the appropriate values & host backend.

- For live Vercel Postgres and Firebase .env variables, you will have to request it from me (owner).
- For development purposes, please fork the repo and deploy your own Firebase (with Google Authentication) and Vercel app and fill in the variables yourself.
- You will need to host your own backend as we do not provide a mock backend.

### Thirdly, link Vercel and initialise Prisma.

```bash
vercel link
npx prisma generate
npx prisma db push
```

### Lastly, run the development server:

```bash
npm run dev
# or
yarn dev
```

## Deployment

If there is an update to the schema, run

```bash
npx prisma db push --force-reset --accept-data-loss
```

To edit the db with a GUI on localhost, run

```bash
npx prisma studio
```

- Since it's deployed on Vercel, it should automatically work once you push to the main branch.

## To run Unit Testing

- Rename .babelrc-test to .babelrc
- Then run either of the commands

```bash
npm run test
# or
yarn test
```
