# Rest API for Gtr Record API

A rest api application for retrieve data from Postgres by using Node.js, Express, and Sequelize.

Mert Denizgez

mertdenizgez@gmail.com

## Quick Start

Install the dependencies:

```bash
yarn install
```

Set the environment variables:

```bash
cp .env.example .env
```

## Environment Variables

Example environment variables that `.env` file should inclue

```bash
# Port number
PORT=3000

# Database config
DATABASE='DBNAME'
DB_USERNAME='USERNAME'
DB_PASSWORD='PASSWORD'
DB_HOST='localhost'
```

## Commands

```bash
yarn start
```

Linting:

```bash
# run ESLint
yarn lint

# run prettier
yarn format

```
