FROM node:16-alpine
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json  ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 8008
ENV PORT 8008

CMD ["npm", "run", "start"]