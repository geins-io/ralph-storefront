ARG HOST=0.0.0.0
ARG PORT=80

# Build the app on a separate "machine".
FROM node:11.13.0-alpine as builder
WORKDIR /app
RUN apk add --no-cache curl git && \
    apk add --no-cache curl && \
    curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | /bin/sh -s -- -b /usr/local/bin
COPY . .
RUN npm install && npm run build
RUN node-prune

# Grab the parts that makes our app work, and put them on a fresh linux image
FROM node:11.13.0-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV NUXT_HOST=${HOST}
ENV NUXT_PORT=${PORT}
ADD package.json ./
ADD nuxt.config.js ./
COPY --from=builder ./app/node_modules ./node_modules/
COPY --from=builder ./app/.nuxt ./.nuxt/
COPY --from=builder ./app/static ./static/
EXPOSE ${PORT}
CMD ["npm", "run", "start"]