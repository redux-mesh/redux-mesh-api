FROM node

COPY package.json .
COPY yarn.lock .

RUN npm install -g yarn && yarn

COPY . .

EXPOSE 8080
CMD ["npm", "start"]
