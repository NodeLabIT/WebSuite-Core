FROM node:10.9.0-alpine

RUN mkdir -p /opt/websuite
WORKDIR /opt/websuite

VOLUME /opt/websuite/data
VOLUME /opt/websuite/logs

COPY package.json /opt/websuite

RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ \
        gcc

RUN  npm install && npm cache clean --force

RUN apk del .gyp

COPY core /opt/websuite/core
COPY cp /opt/websuite/core
COPY frontend /opt/websuite/core
COPY system /opt/websuite/core

COPY index.js /opt/websuite
COPY docker.js /opt/websuite

COPY data/permissionsList/* /opt/websuite/data/permissionsList/
COPY data/options.json /opt/websuite/data
COPY data/plugins.json /opt/websuite/data
COPY data/config.example.json /opt/websuite/data/config.json

#CMD node docker.js

CMD node index.js

EXPOSE 8080
EXPOSE 8081