FROM node:10.13-alpine

WORKDIR /home/Descargas/apimaterial/apieden

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

EXPOSE 7001

CMD npm start
