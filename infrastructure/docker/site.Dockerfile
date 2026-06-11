FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
COPY apps/site/package.json ./apps/site/package.json
COPY apps/web/package.json ./apps/web/package.json
COPY apps/studio/package.json ./apps/studio/package.json
COPY packages/site-content/package.json ./packages/site-content/package.json
COPY packages/shared-types/package.json ./packages/shared-types/package.json
RUN npm install

FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build:site

FROM nginx:1.27-alpine AS runner
COPY --from=builder /app/apps/site/dist /usr/share/nginx/html
EXPOSE 80
