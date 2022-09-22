FROM node:18.7.0 as build

EXPOSE 3000

RUN  apt-get update && apt-get install -y curl

RUN mkdir /frontend

WORKDIR /frontend

COPY package.json ./

RUN npm install 

COPY . .

RUN npm run build

# Stage two 
FROM nginx:1.16.1

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /frontend/build/ /usr/share/nginx/html

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

RUN apt update && apt install nano curl -y

CMD ["nginx", "-g", "daemon off;"]

HEALTHCHECK CMD curl --fail http://20.20.4.30/ || exit 1
