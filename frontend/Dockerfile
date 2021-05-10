FROM node:15.13.0-alpine as builder
WORKDIR /app
COPY ./angular-db-viewer .
RUN npm i && npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist/angular-db-viewer .
ENTRYPOINT ["nginx", "-g", "daemon off;"]
