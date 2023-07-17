# Use the official Node.js image as the base image
FROM node:16.9.1

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY build/ /app/


# Build the frontend app
RUN npm install -g serve

ENV SERVER_PORT=80

# Expose the port on which your frontend app runs (if applicable)
EXPOSE 80

# Specify the command to start your frontend app server
CMD ["serve -s build -l $SERVER_PORT"]
