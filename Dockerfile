FROM node:24-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY index.js index.js
COPY src/ src/

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

CMD ["node", "index.js"]
