FROM node:18-alpine as builder

WORKDIR /frontend
COPY . .

RUN npm install
RUN npm run build

ENV NODE_ENV production

RUN npm i -g serve

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]