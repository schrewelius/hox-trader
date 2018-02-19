FROM node:latest

RUN mkdir -p /opt/client

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

WORKDIR /opt/client
COPY . /opt/client
RUN npm install --quiet

CMD ["npm", "start"]
