ARG HOST=0.0.0.0
ARG PORT=80
ARG API_KEY=#{ApiKey}#
ARG API_ENDPOINT=#{ApiEndpoint}#
ARG IMAGE_SERVER=#{ImageServer}#

# Build the app on a separate "machine".
FROM node:14.8-alpine as builder
WORKDIR /app
RUN apk add --no-cache curl git && \
    apk add --no-cache curl && \
    curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | /bin/sh -s -- -b /usr/local/bin
COPY . .
RUN npm install && npm run build
RUN node-prune

# Grab the parts that makes our app work, and put them on a fresh linux image
FROM node:14.8-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV NUXT_HOST=${HOST}
ENV NUXT_PORT=${PORT}
ENV API_KEY=${API_KEY}
ENV API_ENDPOINT=${API_ENDPOINT}
ENV IMAGE_SERVER=${IMAGE_SERVER}
ADD package.json ./
ADD nuxt.config.js ./
COPY --from=builder ./app/node_modules ./node_modules/
COPY --from=builder ./app/.nuxt ./.nuxt/
COPY --from=builder ./app/static ./static/
COPY --from=builder ./app/scripts ./scripts/
EXPOSE ${PORT}
CMD ["npm", "run", "start"]