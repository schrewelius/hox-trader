FROM node:latest

RUN mkdir -p /opt/server

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

ARG PORT=4000
ENV PORT $PORT

WORKDIR /opt
COPY package.json package-lock.json* ./
RUN npm install --quiet
ENV PATH /opt/node_modules/.bin:$PATH

WORKDIR /opt/server
COPY . /opt/server

CMD ["npm", "start"]
