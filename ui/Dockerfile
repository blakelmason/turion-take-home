FROM node:20-alpine

WORKDIR /app/ui

COPY ./ui/package*.json ./

RUN npm install

COPY ./ui ./
COPY ./types /app/types

# Build the project
RUN npm run build

# Set the command to serve the built files
CMD ["npm", "run", "preview"]