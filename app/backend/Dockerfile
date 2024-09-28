FROM node:22

WORKDIR /app

COPY package.json package-lock.json tsconfig.json ./
RUN npm install
COPY src src
RUN npm run build

EXPOSE 8000
CMD ["npm", "start"]
