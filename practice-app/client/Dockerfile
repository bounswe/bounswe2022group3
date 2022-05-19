FROM node:14
WORKDIR /app
COPY package.json .
RUN npm i
COPY . .
COPY next.config.prod.js next.config.js
CMD npm run dev