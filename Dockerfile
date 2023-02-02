ARG NODE_ENV=#{Environment}#
ARG API_ENDPOINT=#{ApiEndpoint}#
ARG API_KEY=#{ApiKey}#
ARG IMAGE_SERVER=#{ImageServer}#
ARG AUTH_ENDPOINT=#{AuthEndpoint}#
ARG SIGN_ENDPOINT=#{SignEndpoint}#
ARG BASE_URL=#{BaseUrl}#
ARG GTM_ID=#{GtmId}#
ARG FALLBACK_CHANNEL_ID=#{FallbackChannelId}#
ARG DOMAIN_SV=#{DomainSv}#
ARG DOMAIN_EN=#{DomainEn}#
ARG DEFAULT_LOCALE=#{DefaultLocale}#
ARG APPINSIGHTS_INSTRUMENTATION_KEY=#{AppinsightsInstrumentationKey}#

# Build the app on a separate "machine".
FROM node:14.15.5-alpine as builder
WORKDIR /app
RUN apk add --no-cache curl git && \
    apk add --no-cache curl && \
    curl -sf https://gobinaries.com/tj/node-prune | /bin/sh -s -- -b /usr/local/bin
COPY . .
# Re-initialize the argument D:
ARG API_ENDPOINT
ARG API_KEY
ARG IMAGE_SERVER
ARG AUTH_ENDPOINT
ARG SIGN_ENDPOINT
ARG BASE_URL
ARG GTM_ID
ARG FALLBACK_CHANNEL_ID
ARG DOMAIN_SV
ARG DOMAIN_EN
ARG DEFAULT_LOCALE
ARG APPINSIGHTS_INSTRUMENTATION_KEY

ENV API_KEY=${API_KEY}
ENV API_ENDPOINT=${API_ENDPOINT}
ENV IMAGE_SERVER=${IMAGE_SERVER}
ENV AUTH_ENDPOINT=${AUTH_ENDPOINT}
ENV SIGN_ENDPOINT=${SIGN_ENDPOINT}
ENV BASE_URL=${BASE_URL}
ENV GTM_ID=${GTM_ID}
ENV FALLBACK_CHANNEL_ID=${FALLBACK_CHANNEL_ID}
ENV DOMAIN_SV=${DOMAIN_SV}
ENV DOMAIN_EN=${DOMAIN_EN}
ENV DEFAULT_LOCALE=${DEFAULT_LOCALE}
ENV APPINSIGHTS_INSTRUMENTATION_KEY=${APPINSIGHTS_INSTRUMENTATION_KEY}
RUN npm install

# Have to put the environment here, otherwise Node will get cranky ヽ(ಠ_ಠ) ノ
ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}
RUN npm run build \
    && node-prune \
    && mkdir output \
    && cp -r package.json nuxt.config.js node_modules .nuxt static scripts output
    # Put all the garbage in the 'output' folder

# Grab the parts that makes our app work, and put them on a fresh linux image
FROM node:14.15.5-alpine
WORKDIR /app
ARG PORT=3000
ARG NODE_ENV
ARG API_ENDPOINT
ARG API_KEY
ARG IMAGE_SERVER
ARG AUTH_ENDPOINT
ARG SIGN_ENDPOINT
ARG BASE_URL
ARG GTM_ID
ARG FALLBACK_CHANNEL_ID
ARG DOMAIN_SV
ARG DOMAIN_EN
ARG DEFAULT_LOCALE
ARG APPINSIGHTS_INSTRUMENTATION_KEY

ENV NODE_ENV=${NODE_ENV}
ENV API_KEY=${API_KEY}
ENV API_ENDPOINT=${API_ENDPOINT}
ENV IMAGE_SERVER=${IMAGE_SERVER}
ENV AUTH_ENDPOINT=${AUTH_ENDPOINT}
ENV SIGN_ENDPOINT=${SIGN_ENDPOINT}
ENV BASE_URL=${BASE_URL}
ENV GTM_ID=${GTM_ID}
ENV FALLBACK_CHANNEL_ID=${FALLBACK_CHANNEL_ID}
ENV DOMAIN_SV=${DOMAIN_SV}
ENV DOMAIN_EN=${DOMAIN_EN}
ENV DEFAULT_LOCALE=${DEFAULT_LOCALE}
ENV APPINSIGHTS_INSTRUMENTATION_KEY=${APPINSIGHTS_INSTRUMENTATION_KEY}
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=${PORT}
COPY --from=builder ./app/output ./
EXPOSE ${PORT}
CMD ["npm", "run", "start"]