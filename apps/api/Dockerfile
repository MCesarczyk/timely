FROM timely-base AS builder

ARG PORT
ARG DATABASE_URL

ENV PORT=${PORT:-4000}
ENV DATABASE_URL=${DATABASE_URL}
ENV NODE_ENV=production

WORKDIR /app
RUN pnpm fetch --prod
COPY --chown=node:node . .
RUN pnpm install --prod --frozen-lockfile && chown -R node:node /app

USER node

COPY --chown=node:node ./apps/api/prepare-db.sh ./prepare-db.sh
RUN chmod +x ./prepare-db.sh

RUN [ "./prepare-db.sh" ]

RUN pnpm nx build api --prod

FROM node:23.11.0-alpine3.21 AS runner

WORKDIR /app
COPY --from=builder /app/dist/apps/api /app
COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/node_modules/tslib /app/node_modules
# COPY --from=builder /app/node_modules/@nestjs/common /app/node_modules/@nestjs/common
# COPY --from=builder /app/node_modules/@nestjs/core /app/node_modules/@nestjs/core
# COPY --from=builder /app/node_modules/@prisma/client /app/node_modules/@prisma/client
# RUN npm install -g pnpm@10 && pnpm add tslib@2.3.0 @nestjs/common @nestjs/core @prisma/client

EXPOSE 4000
CMD ["node", "main.js"]
