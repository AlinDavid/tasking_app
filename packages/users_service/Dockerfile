FROM node:lts-alpine

RUN npm i -g @nestjs/cli

# Create and set the working directory in the container
WORKDIR /usr/src/user

# Copy package.json and yarn.lock to the working directory
COPY package.json ./

# Install dependencies using Yarn
RUN yarn install

# Copy the rest of the application files to the working directory
COPY . .

# Build the NestJS application
RUN yarn run build

# Expose the port on which the NestJS application will run (change this if your app uses a different port)
EXPOSE 8001

# Command to start the NestJS server
CMD ["yarn", "start:prod"]
