FROM node:10.9.0-alpine

RUN mkdir -p /opt/websuite-core
WORKDIR /opt/websuite-core

VOLUME /opt/websuite-core/data
VOLUME /opt/websuite-core/logs

COPY package.json /opt/websuite-core

RUN apk update && apk upgrade && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
    apk add --no-cache \
      chromium@edge \
      nss@edge

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ \
        gcc

RUN npm install && npm cache clean --force

#RUN apk del .gyp

COPY core /opt/websuite-core/core
COPY cp /opt/websuite-core/cp
COPY frontend /opt/websuite-core/frontend
COPY system /opt/websuite-core/system

RUN cd frontend && npm install && npm run build-dev && npm cache clean --force && cd ..
RUN cd cp && npm install && npm run build-dev && npm cache clean --force && cd ..

COPY index.js /opt/websuite-core/index.js
COPY docker.js /opt/websuite-core/docker.js
COPY crawler-user-agents.json /opt/websuite-core/crawler-user-agents.json

CMD ["sh", "-c", "node index.js"]

EXPOSE 8080
EXPOSE 8081