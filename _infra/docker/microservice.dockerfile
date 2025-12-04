FROM node:24.8.0-alpine3.22 AS base

## SERVICE - install
FROM base AS deps

ENV NODE_ENV=production
ARG SRC_PATH
ARG NPM_WORKSPACE

WORKDIR /sources
COPY ./package.json ./yarn.lock ./
COPY $SRC_PATH/package.json $SRC_PATH/
COPY ./packages/codebase-config/package.json ./packages/codebase-config/

RUN yarn workspace $NPM_WORKSPACE install --frozen-lockfile --ignore-scripts
RUN mkdir -p $SRC_PATH/node_modules

## SERVICE - build
FROM base AS runner
RUN apk update
RUN apk add --no-cache \
        nano \
        curl \
        python3

ARG SRC_PATH
ARG RELEASE_VERSION
ARG SENTRY_AUTH_TOKEN

COPY --from=deps ./sources/node_modules ./sources/node_modules
COPY --from=deps ./sources/$SRC_PATH/node_modules ./sources/$SRC_PATH/node_modules

COPY ./ ./sources
WORKDIR /sources/$SRC_PATH
RUN yarn run build

## SERVICE - start

ARG ENVIRONMENT
ARG RELEASE
ARG RELEASE_VERSION
ARG COMMIT
ARG COMMIT_TIMESTAMP
ARG CI_COMMIT_REF_SLUG
ENV PORT=8080
ENV ENVIRONMENT=$ENVIRONMENT
ENV RELEASE=$RELEASE
ENV RELEASE_VERSION=$RELEASE_VERSION
ENV COMMIT=$COMMIT
ENV COMMIT_TIMESTAMP=$COMMIT_TIMESTAMP
ENV CI_COMMIT_REF_SLUG=$CI_COMMIT_REF_SLUG

EXPOSE 8080
CMD ["yarn", "run", "start"]
HEALTHCHECK CMD wget -q --spider http://localhost:8080/ping || exit 1
