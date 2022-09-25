FROM 16-bullseye
WORKDIR /srv/CrazyBot
COPY . .
CMD ["node", "index.js"]