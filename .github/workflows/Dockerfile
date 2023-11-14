FROM node:20-alpine as build

WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile
RUN yarn build

FROM nginx:alpine-slim
COPY --from=build /app/dist /usr/share/nginx/html
