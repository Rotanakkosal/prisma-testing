FROM node:latest
RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN npm install
RUN npm install prisma --save-dev
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]