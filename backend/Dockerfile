# Production
FROM node:alpine as dev
WORKDIR /app
COPY code/ /app/
RUN yarn install
EXPOSE 8080
ENTRYPOINT [ "yarn" ]
CMD ["run", "start"]