# ------------------------------------------------------
# Build
# ------------------------------------------------------
FROM node:lts as builder
MAINTAINER Ilya Gehrman "gehrman.ilya@gmail.com"

RUN node --version &&\
    npm --version

WORKDIR /build
COPY package.json package-lock.json ./
RUN npm install --force

COPY . ./
RUN npm run build:prod

# ------------------------------------------------------
# Production
# ------------------------------------------------------
FROM nginx:alpine

COPY ./misc/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /build/dist/browser /usr/share/nginx/html
