FROM node:23.11.1-bullseye AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
COPY nx.json .
COPY tsconfig.base.json .

ARG PORT
ARG DATABASE_URL

ENV PORT=${PORT:-4000}
ENV DATABASE_URL=${DATABASE_URL}
ENV NODE_ENV=production

WORKDIR /app
RUN npm install -g pnpm@10 && pnpm fetch --prod
COPY --chown=node:node . .
RUN pnpm install --frozen-lockfile && chown -R node:node /app

USER node

COPY --chown=node:node ./apps/api/prepare-db.sh ./prepare-db.sh
RUN chmod +x ./prepare-db.sh

RUN [ "./prepare-db.sh" ]

RUN pnpm nx build api --prod

FROM node:23.11.0-alpine3.21 AS runner

RUN apk --no-cache add curl

COPY --chown=node:node --from=builder /app/dist/apps/api ./app
COPY --chown=node:node --from=builder /app/node_modules ./node_modules

USER node

EXPOSE 4000
CMD ["node", "app/main.js"]
