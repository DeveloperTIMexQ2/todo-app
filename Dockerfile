############################################################
# Dockerfile para configurar aplicación en node.js - Express
############################################################

FROM node:15.7.0

WORKDIR /usr/src/app

VOLUME [ "/usr/src/app" ]

RUN npm install -g nodemon

EXPOSE 8000

CMD [ "nodemon", "-L", "index.js" ]