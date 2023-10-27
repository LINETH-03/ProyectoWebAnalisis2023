# Usar una imagen base con Node.js
FROM node:latest

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar los archivos necesarios al contenedor
COPY ./api/package.json ./api/package-lock.json ./
COPY ./api .

# Instalar las dependencias
RUN npm install

# Exponer el puerto en el que la API va a estar escuchando 
EXPOSE 4000

# Comando para iniciar la API
CMD ["node", "server.js"]
