# Usar una imagen base con Node.js
FROM node:latest

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar los archivos necesarios al contenedor
COPY ./frontend/package.json ./frontend/package-lock.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos
COPY ./frontend .

# Exponer el puerto en el que el servidor de desarrollo de React va a estar escuchando  
EXPOSE 5173

# Comando para iniciar el servidor de desarrollo de React usando Vite
CMD ["npm", "run", "dev"]
