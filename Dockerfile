FROM node:alpine

ENTRYPOINT ["npm", "run", "dev"]

ENV DEV /opt/dev

WORKDIR $DEV

COPY package.json $DEV/

RUN npm i

COPY index.html .eslintrc.js vite.config.js $DEV/

COPY src $DEV/src
