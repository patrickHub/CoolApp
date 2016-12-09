FROM node
MAINTAINER Patrick Desle Djomo

COPY test_data.json /test_data.json
COPY init_test_db.js /init_test_db.js
COPY package.json /package.json
RUN npm install

CMD node /init_test_db.js
