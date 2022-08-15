FROM node:16.16-alpine
WORKDIR /app
COPY *.json ./
RUN npm install
COPY . .
ENV NODE_ENV=production
ENV MODE=DEVELOPMENT
ENV SALT_ROUNDS=12
ENV JWT_SECRET=qwertyuiop
ENV JWT_EXPIRES_IN=2h

RUN npm run build
RUN npm run migration:run
RUN npm run seed:run
RUN addgroup -S nodeapp
RUN adduser -S nodeapp -G nodeapp
USER nodeapp
CMD npm run start