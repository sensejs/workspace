ARG NODE_VERSION=16
FROM node:${NODE_VERSION} AS pnpm-installed
ARG PNPM_VERSION=^8.3.1
RUN npm install -g pnpm@${PNPM_VERSION}
WORKDIR /opt/sensejs
COPY pnpm-lock.yaml .npmrc ./
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm fetch
COPY . ./
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm recursive install --offline --frozen-lockfile
RUN pnpm run build
