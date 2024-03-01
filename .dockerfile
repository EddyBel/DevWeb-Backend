# Base para ejecutar 
FROM node

# Crea la ruta de trabajo
WORKDIR /app

# Copiar el proyecto a la ruta de trabajo
COPY . /app

# Instala las dependencias basicas
RUN npm i

# Puerto a exponer
EXPOSE 8080

# Variables de entorno
ENV NOTION_DB_SNIPPETS c7e9c4d832f644e5b1078a212e23cce2
ENV NOTION_DB_NOTES 64de4ddb5af74b4289f19438fd6ad252
ENV NOTION_DB_POSTS 4a7ea82fe03b46cbaf5cb7f09363535e
ENV NOTION_DB_EXPERIENCE ba6d9294bfbf42d392280d4950735531
ENV NOTION_DB_PROYECTS 969991e783d44cbabe075f21eabcd2aa
ENV NOTION_DB_INFORMATION 70acd5ab5c0d43d8896da271c08d776e

# Inicializa la aplicación
CMD ["npm", "start"]