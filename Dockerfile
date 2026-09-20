# ---------- étape 1 : build ----------
FROM node:22-alpine AS build

WORKDIR /app

# cache des dépendances : on copie d'abord les manifestes
COPY package*.json ./
RUN npm ci

COPY . .
# adresse de l'API de données, figée dans le build par Vite
ARG VITE_API_URL=http://localhost:3000
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

# ---------- étape 2 : service ----------
FROM nginx:1.27-alpine AS runtime

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget -q --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
