# base image to use
FROM node:15.12-stretch

LABEL description="Website" \
      maintainer="luis.urday@bohr-energie.fr"

ENV HOME /home/bohruser

#USER $DCORE_USER
WORKDIR /home/bohruser

# copy server
COPY / web/

WORKDIR /home/bohruser/web
RUN rm -R node_modules
RUN npm install 

#Master node
ENTRYPOINT ["npm", "start"]
