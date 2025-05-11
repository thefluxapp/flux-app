FROM oven/bun:alpine AS builder

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install -f --no-cache
COPY . .
RUN bun run build

FROM nginx:alpine

WORKDIR /app

ADD .github/workflows/conf.d /etc/nginx/conf.d
COPY --from=builder /app/dist /app
