FROM node:23.11.1-bullseye AS development

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
COPY nx.json .
COPY tsconfig.base.json .

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

WORKDIR /app
RUN npm install -g pnpm@10 && pnpm fetch --prod
COPY . .
RUN pnpm install --frozen-lockfile && pnpm nx build timer --prod

CMD ["pnpm", "dev"]

FROM nginx:1.28.0-alpine3.21-slim@sha256:39a9a15e0a81914a96fa9ffa980cdfe08e2e5e73ae3424f341ad1f470147c413 AS production

RUN apk --no-cache add curl

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN mkdir -p /etc/nginx/conf.d /var/cache/nginx /run && \
  chown -R 1000:1000 /etc/nginx/conf.d /var/cache/nginx /run && \
  chmod 775 /etc/nginx/conf.d /var/cache/nginx /run

USER 1000:1000

COPY --from=development --chown=1000:1000 /app/dist/apps/timer /usr/share/nginx/html

COPY --chown=1000:1000 apps/timer/nginx.conf /etc/nginx/conf.d/default.conf.template

EXPOSE 8080

ENTRYPOINT ["/bin/sh", "-c", "envsubst '${VITE_API_URL}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]
