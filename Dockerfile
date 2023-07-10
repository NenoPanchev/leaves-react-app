# Use the official Node.js image as the base image
FROM node:14.17.6-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY . .

# Install dependencies
RUN npm install

# Build the frontend app
RUN npm run build

# Expose the port on which your frontend app runs (if applicable)
EXPOSE 3000

# Specify the command to start your frontend app server
CMD ["npm", "start"]
