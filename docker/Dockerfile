### DEPENDENCIES
FROM node:14-alpine AS dependencies
RUN apk add --no-cache libc6-compat

WORKDIR /tmp

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
RUN yarn build 
RUN yarn workspaces focus --production

## RUNNER
FROM node:14-alpine AS runner
WORKDIR /app

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/.yarn ./.yarn
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/yarn.lock ./yarn.lock
COPY --from=builder /app/.yarnrc.yml ./.yarnrc.yml
COPY --from=builder /app/.pnp.cjs ./.pnp.cjs

USER nextjs

EXPOSE 3000

ENV NEXT_TELEMETRY_DISABLED 1

CMD ["yarn", "start"]
