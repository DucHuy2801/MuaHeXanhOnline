FROM node:16.20
WORKDIR /srcr
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]