FROM alpine:3.4

# Install NodeJS

RUN apk add --update nodejs

# -
RUN mkdir /server
RUN mkdir /server/public
RUN mkdir /client

# add client dependencies

# build client

WORKDIR /client
COPY client/package.json .
RUN npm install
COPY client/. .
RUN npm run-script build
RUN cp -r build/. /server/public/


# add server dependencies

WORKDIR /server
COPY server/package.json /server
RUN cd /server; npm install

# run the server
# Bundle app source

COPY server/. /server

EXPOSE 3000 443
EXPOSE 3000 80

CMD ["npm", "start"]
