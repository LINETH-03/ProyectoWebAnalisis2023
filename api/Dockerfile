# Usar una imagen base con Node.js
FROM node:18.15.0
WORKDIR /api
COPY package.json .
RUN npm install
COPY . .
CMD ["node", "server.js"]
