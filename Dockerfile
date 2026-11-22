# syntax=docker/dockerfile:1

# using alpine base image to avoid `sharp` memory leaks.
# @see https://sharp.pixelplumbing.com/install#linux-memory-allocator

# base
FROM node:26-alpine AS base

RUN mkdir /app && chown -R node:node /app
WORKDIR /app

# node.js 26 no longer bundles corepack, so install the pnpm version pinned in `devEngines.packageManager`.
COPY package.json /tmp/
RUN npm install --global "pnpm@$(node -p "require('/tmp/package.json').devEngines.packageManager.version")" \
	&& rm /tmp/package.json

USER node

COPY --chown=node:node package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# production dependencies, only invalidated when dependencies change.
FROM base AS deps

RUN --mount=type=cache,id=pnpm-store,target=/home/node/.local/share/pnpm/store,uid=1000,gid=1000 \
	pnpm install --frozen-lockfile --ignore-scripts --prod

# build
FROM base AS build

# skip installing git hooks.
ENV CI=true

# install all dependencies before copying the source, so content changes do not invalidate this layer.
RUN --mount=type=cache,id=pnpm-store,target=/home/node/.local/share/pnpm/store,uid=1000,gid=1000 \
	pnpm install --frozen-lockfile

COPY --chown=node:node ./ ./

ARG PUBLIC_APP_BASE_PATH
ARG PUBLIC_APP_BASE_URL
ARG PUBLIC_BOTS
ARG PUBLIC_GOOGLE_SITE_VERIFICATION
ARG PUBLIC_KEYSTATIC_GITHUB_APP_SLUG
ARG PUBLIC_KEYSTATIC_GITHUB_REPO_NAME
ARG PUBLIC_KEYSTATIC_GITHUB_REPO_OWNER
ARG PUBLIC_KEYSTATIC_MODE
ARG PUBLIC_MATOMO_BASE_URL
ARG PUBLIC_MATOMO_ID
ARG PUBLIC_REDMINE_ID

# disable validation for runtime environment variables
ENV ENV_VALIDATION=public

ENV NODE_ENV=production

RUN --mount=type=secret,id=KEYSTATIC_GITHUB_CLIENT_ID,uid=1000 \
		--mount=type=secret,id=KEYSTATIC_GITHUB_CLIENT_SECRET,uid=1000 \
		--mount=type=secret,id=KEYSTATIC_SECRET,uid=1000 \
			KEYSTATIC_GITHUB_CLIENT_ID=$(cat /run/secrets/KEYSTATIC_GITHUB_CLIENT_ID) \
			KEYSTATIC_GITHUB_CLIENT_SECRET=$(cat /run/secrets/KEYSTATIC_GITHUB_CLIENT_SECRET) \
			KEYSTATIC_SECRET=$(cat /run/secrets/KEYSTATIC_SECRET) \
		pnpm run build

# serve
FROM node:26-alpine AS serve

RUN mkdir /app && chown -R node:node /app
WORKDIR /app

USER node

COPY --from=deps --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/dist ./

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

EXPOSE 3000

CMD [ "node", "./server/entry.mjs" ]
