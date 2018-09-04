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

RUN npm install && npm cache clean --force

RUN apk del .gyp

COPY core /opt/websuite/core
COPY cp /opt/websuite/cp
COPY frontend /opt/websuite/frontend
COPY system /opt/websuite/system

COPY index.js /opt/websuite/index.js
COPY docker.js /opt/websuite/docker.js

COPY data/permissionsList/* /opt/websuite/default/permissionsList/
COPY data/options.json /opt/websuite/default/options.json
COPY data/plugins.json /opt/websuite/default/plugins.json
COPY data/config.example.json /opt/websuite/default/config.json

CMD node docker.js

CMD node index.js

EXPOSE 8080
EXPOSE 8081