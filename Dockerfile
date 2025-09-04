FROM node:22-alpine

WORKDIR /app
COPY package.json .
RUN bun i

COPY . .
RUN bun run build

CMD ["bun", "run", "start"]