##DOCKERFILE FRONT
FROM eclipse-temurin:17-jdk
WORKDIR /app

COPY target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
# Usar Node LTS
FROM node:22

# Diretório de trabalho
WORKDIR /app

# Copiar apenas package.json e package-lock.json antes de instalar
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar todo o projeto
COPY . .

# Expor porta
EXPOSE 5173

# Rodar Vite
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
