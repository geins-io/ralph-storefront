FROM node:11.13.0-alpine

ENV APP_ROOT /src

# create destination directory
RUN mkdir ${APP_ROOT}
WORKDIR ${APP_ROOT}
ADD . ${APP_ROOT}

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

RUN npm install
RUN npm run build

ENV HOST 0.0.0.0