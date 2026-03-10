FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
COPY apps/studio/package.json ./apps/studio/package.json
COPY packages/shared-types/package.json ./packages/shared-types/package.json
RUN npm install
COPY . .
WORKDIR /app/apps/studio
EXPOSE 3333
CMD ["npm", "run", "dev"]
