# qwik-mikro-orm-template

Qwik template w/ Mikro ORM

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

<!-- TODO: Add pitfalls section -->
<!-- TODO: Add deploymen section -->
