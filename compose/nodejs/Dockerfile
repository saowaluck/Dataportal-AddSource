FROM node:9.4.0

ENV APPLICATION_ROOT /app/
RUN mkdir -p $APPLICATION_ROOT
ADD ./src/server.js $APPLICATION_ROOT\src/
ADD package.json $APPLICATION_ROOT

WORKDIR $APPLICATION_ROOT
RUN yarn install
CMD yarn node-start
