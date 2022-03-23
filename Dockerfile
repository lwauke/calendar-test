FROM node:alpine

ENTRYPOINT ["npm", "run", "dev", "--", "--host"]

ENV DEV /opt/dev

WORKDIR $DEV

COPY package.json $DEV/

RUN npm i

COPY index.html .eslintrc.cjs vite.config.js $DEV/

COPY src $DEV/src
