<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

# DentControl backend API

Nest.js backend API for the DentControl patient manager application.

Swagger UI: http://localhost:3000/docs

## Installation

place auth config options in the src/config/config.ts file or in a .env file in the root folder

place database config options in a ormconfig.json file in the root folder

run:

```bash
$ npm install

$ npx typeorm migration:generate -n MyTable -d src/migrations

$ npm run build

$ npm run start

```
