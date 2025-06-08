FROM node:23.11.1-bullseye AS development

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
COPY nx.json .
COPY tsconfig.base.json .

RUN npm install -g pnpm@10 && pnpm install --frozen-lockfile

RUN pnpm nx run records:build:production

FROM nginx:1.28.0-alpine3.21-slim@sha256:39a9a15e0a81914a96fa9ffa980cdfe08e2e5e73ae3424f341ad1f470147c413 AS production

RUN apk --no-cache add curl

ARG API_URL
ENV API_URL=$API_URL

RUN mkdir -p /etc/nginx/conf.d /var/cache/nginx /run && \
chown -R 1000:1000 /etc/nginx/conf.d /var/cache/nginx /run && \
chmod 775 /etc/nginx/conf.d /var/cache/nginx /run

USER 1000:1000

COPY --from=development --chown=1000:1000 /app/dist/apps/records/browser /usr/share/nginx/html

COPY --chown=1000:1000 apps/records/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

ENTRYPOINT ["nginx", "-g", "daemon off;"]
