FROM oven/bun:1 AS base

WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY package.json bun.lockb ./

RUN bun install --frozen-lockfile


FROM oven/bun:1 AS release

COPY --from=base /usr/src/app/node_modules node_modules
COPY . .

RUN bun run build

EXPOSE 3000

ENTRYPOINT ["bun", "run", "start"]
