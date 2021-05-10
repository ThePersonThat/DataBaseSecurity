FROM node:15.13.0-alpine
WORKDIR /usr/src/app
COPY ./server/package-*.json ./
RUN npm install
COPY ./server .
CMD ["npm", "start"]
