FROM node:20-alpine as base

RUN apk add --no-cache libc6-compat
RUN npm i -g pnpm@8

FROM base as build

RUN mkdir -p /usr/src/qwik-mikro-orm-template
WORKDIR /usr/src/qwik-mikro-orm-template

COPY package.json /usr/src/qwik-mikro-orm-template/
COPY pnpm-lock.yaml /usr/src/qwik-mikro-orm-template/

RUN pnpm i --frozen-lockfile

COPY . /usr/src/qwik-mikro-orm-template/

RUN pnpm run build.node

FROM base as run

RUN mkdir -p /usr/opt/qwik-mikro-orm-template

COPY --from=build /usr/src/qwik-mikro-orm-template/dist /usr/opt/qwik-mikro-orm-template/dist
COPY --from=build /usr/src/qwik-mikro-orm-template/server /usr/opt/qwik-mikro-orm-template/server
COPY --from=build /usr/src/qwik-mikro-orm-template/package.json /usr/opt/qwik-mikro-orm-template/package.json
COPY --from=build /usr/src/qwik-mikro-orm-template/pnpm-lock.yaml /usr/opt/qwik-mikro-orm-template/pnpm-lock.yaml

WORKDIR /usr/opt/qwik-mikro-orm-template

RUN pnpm i -P --frozen-lockfile --ignore-scripts

CMD ["pnpm", "run", "serve.node"]

EXPOSE 3000
