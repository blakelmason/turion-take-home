FROM node:20-alpine

# Set the working directory
WORKDIR /app/api

# Copy package.json and package-lock.json
COPY ./api/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY ./api ./

# Copy the types directory to the appropriate location
COPY ./types /app/types

# Build the project
RUN npm run build

# Set the command to run the built files
CMD ["node", "dist/main.js"]