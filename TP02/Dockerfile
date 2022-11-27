FROM node:slim
WORKDIR /app/src
COPY . /app/
RUN npm install express typescript
EXPOSE 8000
CMD ["npx", "ts-node", "index.ts"]