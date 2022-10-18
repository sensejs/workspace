ARG NODE_VERSION=19
FROM node:${NODE_VERSION} AS pnpm-installed
ARG PNPM_VERSION=^7.9.0
RUN npm install -g pnpm@${PNPM_VERSION}
WORKDIR /opt/sensejs
COPY pnpm-lock.yaml .
RUN pnpm fetch
COPY . .
RUN pnpm recursive install --offline --frozen-lockfile
RUN pnpm run build
