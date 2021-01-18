FROM node:12

RUN mkdir -p /usr/src/master

COPY package.json /usr/src/master
COPY master.js /usr/src/master

WORKDIR /usr/src/master

RUN npm install

EXPOSE 5000

CMD ["npm","start"]