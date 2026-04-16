FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

RUN npm install -g serve

# IMPORTANT: use platform port
ENV PORT=8080

EXPOSE 8080

CMD ["sh", "-c", "serve -s dist -l $PORT"]