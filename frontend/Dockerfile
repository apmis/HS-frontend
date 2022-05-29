# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:14-alpine3.12 as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app/
# ARG REACT_APP_API_URL=http://host.docker.internal:3000
ARG DOLLAR=$
RUN apk --no-cache add gettext
ENV DOLLAR=${DOLLAR}
ENV REACT_APP_API_URL=${REACT_APP_API_URL}
RUN envsubst < /app/nginx.tmpl > /app/nginx.conf
RUN cat /app/nginx.conf | tee /my-install-cmd.log
RUN npm run build
# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.15
COPY --from=build-stage /my-install-cmd.log /my-install-cmd.log
COPY --from=build-stage /app/build/ /usr/share/nginx/html
# Copy the default nginx.conf provided by tiangolo/node-frontend
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf

#Generate self signed cert

COPY self-signed.conf /etc/nginx/snippets/self-signed.conf
COPY ssl-params.conf /etc/nginx/snippets/ssl-params.conf
COPY ssl-dhparams.pem /etc/nginx/snippets/ssl-dhparams.pem
COPY options-ssl-nginx.conf /etc/nginx/snippets/options-ssl-nginx.conf

RUN apt-get update && \
    apt-get install -y openssl && \
    openssl req -x509 -nodes -newkey rsa:4096 -days 1\
    -keyout /etc/nginx/privkey.pem \
    -out /etc/nginx/fullchain.pem \
    -subj "/CN=live.healthstack.africa"
RUN mkdir /etc/nginx/certificate
RUN cd /etc/nginx/certificate && openssl req -new -newkey rsa:4096 -x509 \
           -sha256 -days 365 -nodes -out nginx-certificate.crt -keyout nginx.key  -subj "/CN=live.healthstack.africa"

EXPOSE 80
