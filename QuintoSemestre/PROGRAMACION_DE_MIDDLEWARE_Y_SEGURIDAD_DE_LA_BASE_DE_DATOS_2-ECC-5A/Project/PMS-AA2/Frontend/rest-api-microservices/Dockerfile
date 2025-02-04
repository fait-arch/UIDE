# Dockerfile para Next.js
FROM node:lts

COPY package*.json ./

RUN npm install

COPY . .

# Construye la aplicación deshabilitando ESLint
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build -- --no-lint

EXPOSE 3000

CMD ["npm", "run", "start"]