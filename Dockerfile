#Stage 1 - Node
FROM node:latest as node

ARG ENV=prod
ARG APP=psycontrol

ENV ENV ${ENV}
ENV APP ${APP}

WORKDIR /app
COPY ./ /app/

RUN npm ci
RUN npm run build --prod
RUN mv /app/dist/${APP}/* /app/dist/

#Stage 2 - Nginx
FROM nginx:1.13.8-alpine

COPY --from=node /app/dist/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf