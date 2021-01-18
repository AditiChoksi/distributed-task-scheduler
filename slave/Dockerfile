FROM node:12

RUN mkdir -p /usr/src/slave

COPY package.json /usr/src/slave
COPY slave.js /usr/src/slave

WORKDIR /usr/src/slave

RUN npm install

EXPOSE 3000

CMD ["npm","start"]