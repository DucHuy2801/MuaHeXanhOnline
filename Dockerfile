FROM node:18.15
WORKDIR /srcr
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]