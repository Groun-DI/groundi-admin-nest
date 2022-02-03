FROM node:16-alpine As development

WORKDIR /usr/src/app

COPY . .
RUN npm install
RUN npm run build
RUN npm run db:generate


FROM node:16-alpine as production

WORKDIR /usr/src/app

ARG NODE_ENV=prod
ENV NODE_ENV=${NODE_ENV}
COPY --from=development /usr/src/app/env ./env
COPY --from=development /usr/src/app/prisma/ ./prisma
COPY --from=development /usr/src/app/dist ./dist
COPY --from=development /usr/src/app/node_modules ./node_modules

CMD ["node","dist/main"]
