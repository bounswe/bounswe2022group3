FROM node:14
WORKDIR /app
COPY package.json .
RUN npm i
COPY . .
CMD npm run dev