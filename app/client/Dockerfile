FROM node:16-alpine
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock*  ./
RUN yarn install

COPY . .
RUN yarn build

EXPOSE 8008
ENV PORT 8008

CMD ["yarn", "start"]