FROM node:latest

WORKDIR /server/index

COPY . .

RUN npm install

EXPOSE 4044

ENTRYPOINT ["npm", "start"]
