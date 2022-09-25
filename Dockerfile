FROM node:16-bullseye
WORKDIR /srv/CrazyBot
RUN npm i --force && npm cache clean --force
COPY . .
CMD ["node", "index.js"]