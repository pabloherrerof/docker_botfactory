FROM node:21-alpine

WORKDIR /app/ui

# Copy lock files if file exists
COPY package.json yarn.lock* package-lock.json* ./

RUN npm install

COPY . .

RUN npm run build

CMD npm run start