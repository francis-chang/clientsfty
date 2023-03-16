FROM node:18 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./package.json /app/
COPY ./package-lock.json /app/
RUN echo "//registry.npmjs.org/:_authToken=CA542B77-8308-4593-8854-9A5AE818B6D1" > /app/.npmrc && \
    npm install && \
    rm -f /app/.npmrc

RUN npm ci
COPY . /app
RUN npm run build


FROM nginx:1.17.8-alpine
COPY --from=build /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/default.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]