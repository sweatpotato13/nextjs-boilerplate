### DEPENDENCIES
FROM node:17-alpine AS dependencies
WORKDIR /tmp

RUN apk add --no-cache libc6-compat

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn/releases ./.yarn/releases
COPY .yarn/plugins ./.yarn/plugins

RUN yarn install --immutable

### BUILDER
FROM node:14-alpine AS builder
WORKDIR /app

COPY --from=dependencies /tmp .
COPY . .

RUN yarn next telemetry disable
COPY .env.dev .
RUN yarn export:dev

### Deployment
FROM nginx:alpine AS deployment
WORKDIR /
COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]