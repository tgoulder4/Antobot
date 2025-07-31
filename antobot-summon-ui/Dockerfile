FROM node:20.18.0

WORKDIR /app

COPY package*.json ./

# npm clean install (deletes node_modules and installs fresh)
RUN npm ci 

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]