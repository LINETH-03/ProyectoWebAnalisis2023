FROM node:18.15.0 as build-stage

WORKDIR /frontend
COPY package.json .
RUN npm install
COPY . .

ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

RUN npm run build

# Stage 2
FROM nginx:1.17.0-alpine

COPY --from=build-stage /frontend/dist /usr/share/nginx/html

EXPOSE $REACT_DOCKER_PORT

CMD nginx -g 'daemon off;'
