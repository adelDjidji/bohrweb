# base image to use
FROM node:16.19-alpine

LABEL description="Website" \
      maintainer="luis.urday@bohr-energie.fr"

ENV HOME /home/bohruser

#USER $DCORE_USER
WORKDIR /home/bohruser

# copy server
COPY / web/

WORKDIR /home/bohruser/web
RUN rm -R node_modules
RUN npm install --legacy-peer-deps

#Master node
ENTRYPOINT ["npm", "start"]
