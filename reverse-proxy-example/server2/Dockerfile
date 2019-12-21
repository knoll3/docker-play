FROM node:12.9

RUN mkdir -p /src
WORKDIR /src

COPY ./yarn.lock /src/yarn.lock
COPY ./package.json /src/package.json
RUN yarn install

ADD . /src
RUN yarn install

CMD ["/usr/local/bin/yarn", "start"]

