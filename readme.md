# qwik-mikro-orm-template

Qwik template w/ Mikro ORM and MySQL

## Commands

| ID              | Description                                                                                                                                                    |
|-----------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `build`         | Runs `qwik build`                                                                                                                                              |
| `build.client`  | Creates client-side bundle                                                                                                                                     |
| `build.preview` | Creates `preview` build of the app with                                                                                                                        |
| `build.node`    | Creates `production` build with `node:http` server as backend                                                                                                  |
| `build.types`   | Runs TypeScript types validation via `tsc`                                                                                                                     |
| `dev`           | Runs application with dev server                                                                                                                               |
| `dev.open`      | Same as `dev`, but opens a browser                                                                                                                             |
| `dev.debug`     | Runs `dev` server in debug mode                                                                                                                                |
| `lint`          | Rns `eslint` on project's source filed                                                                                                                         |
| `preview`       | Creates `preview` build using `build.preview` command, then starts preview server                                                                              |
| `preview.open`  | Same as `preview` command, but opens a browser                                                                                                                 |
| `serve.node`    | Creates `production` build, then starts Node.js server. Note: This command references `.env.local` file via node CLI using `--env-file` to apply configuration |
| `start`         | Starts production server. This command is used when you build the app via `docker` or `docker compose`                                                         |

## Configuration

| Name        | Required | Default value | Description                                   |
|-------------|:--------:|:-------------:|-----------------------------------------------|
| DB_NAME     | Yes      | –             | Database name                                 |
| DB_HOST     | No       | `"localhost"` | Database server hostname                      |
| DB_PORT     | No       | `3306`        | Database server port                          |
| DB_USER     | Yes      | –             | Database user name                            |
| DB_PASSWORD | Yes      | –             | Password for the user specified via `DB_USER` |

## Deployment

This template is using `node:http` as the server adapter and comes with `Dockerfile` to build an image and `compose.yaml` to run the app demo.
I would now suggest using this adapter in production, as it is not mentioned anywhere in the docs, so it can be unstable at this time.
To choose different adapter and more detailed deployment instructions, please, refer to the [Deployment](https://qwik.dev/docs/deployments/) secion of Qwik documentaion.

Following steps describe how to deploy the app demo for this template.

1. Create an `.env.local` file and fill it with your database connection information. Do not change the DB_USER value, because MySQL is configured to use root as a user, since it's just a demo.
2. Run `docker compose --env-file .env.local up`. It will build the app using `Dockerfile` and run it along configured MySQL server.
3. Open [http://127.0.0.1:3000](http://127.0.0.1:3000) and you'll see simple To-Do app in which you can add new todos and remove existing ones.

Note that docker compose is configured to store the MySQL data in `tmpfs`, which means the data will be purged once containers are stopped.

## Pitfalls

1. Because the whole server-side code is bundled in a few files,
and most of it is in just one of them, you may encounter the error when MySQL complains
that you're trying to access a table that doesn't exists.
This is because bundler is trying to deduplicate identifiers within this single bundle.
so you might get names like `Todo` and `Todo2` for an antity and this is the cause of the error.
Mikro ORM will use that name by default, because it is associated with the entity class.
To work around this problem, you should always use `tableName` option of the `Entity` decorator:

```ts
import {Entity} from "@mikro-orm/mysql"

@Entity({tableName: "my_entity"}) // Mikro ORM will use this name to make queries to the database
export class MyEntity { }
```

or you can just use `EntitySchema` to define your entities:

```ts
export interface IMyEntity { }

export const MyEntity = new EntitySchema<IMyEntity>({
  name: "MyEntity" // Mikro ORM will use this name to make queries to the database,
  properties: { }
})
```

2. If you enable minification for server-side bundle, `esbuild` will mess up class names too and this will also lead to previous error. The workaround would be the same.

3. Since the project is using `type: "module"` option in `package.json`, you have to add `.js` extension in modules paths, because this is how Node.js resolves ESM paths.
This is necessary to run migrations via `mikro-orm-esm` CLI, because it is relying on `ts-node` to load ORM config.
At the same time `Qwik` (this is either Vite or Rollup issue) cannot load and build with `.js` extension,
but this happens for client-side code only, so in order to work around this issue,
you can either use `.js` extension in your server-side, but keep avoiding it on the client.
This way you will get both `mikro-orm-esm` and `Qwik` work as expected, or you can try and add `--experimental-specifier-resolution=node` flag for `mikro-orm-esm` via `NODE_OPTIONS` environment variable.
I haven't tried the second solution yet, but it may as well work, because it was suppose to emulate an old (CJS) Node.js resolutaion algorithm for ESM files.
