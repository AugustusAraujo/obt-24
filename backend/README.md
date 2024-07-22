# **Estude Melhor's API**

> This is the api of all business logic and services of Estude Melhor.

## **_Summary_**

- [Directory Structure](#directory-structure)
- [Starting development environment](#starting-development-environment)
- [Using Docker](#using-docker)

## **Directory Structure**

- `prisma` - Prisma's configuration folder.
- `e2e` - E2E tests.
- `build` - The output of build.
- `src` - All source code files like controllers, useCases, providers, etc.

  - `http` - This folder contains api's http layer.
    - `controllers` Contains all http controllers.
    - `middlewares` Contains all http middlewares.
    - `routes` Contains all http routes.
  - `infra/providers` - This folder contains all data providers or thirty party services.
  - `services` - Contains low-level logic like: queries on database, send an email, etc.
  - `useCases` This one is the most important folder of this project because it is contains all business logic of api. Example: UseCases are a important part because they execute a single task like _make user login_. This is why this folder is very important.
  - **_`routes.ts`_** Imports all routes to a single place.
  - **_`index.ts`_** The api's main file.

## **Starting development environment**

**Set environment variables**

```sh
cp .env.example .env
```

After this you should add the config .

### **Install the dependencies**

```sh
yarn
```

You should use [yarn](https://yarnpkg.com/).

### **Start the server**

Use the `serve` script on your terminal

```sh
yarn serve
```

I think your server is running in the port given in the config file. *The default port is 3000.*

## **Starting the database**

Make sure if you have docker in your machine. If you don't have it installed [click here](https://docker.com).

To start the database and redis, run:

```sh
docker-compose up
```

After this you can use prisma studio UI to manage the database.

You can run:

```bash
yarn prisma:studio
```

After this command you're able to use prisma studio, that can be acessed through ``localhost:5555``
