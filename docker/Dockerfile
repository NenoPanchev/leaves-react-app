# Use the official Node.js image as the base image
FROM node:16.9.1

# Set the working directory
WORKDIR /home/node/app

RUN mkdir -p /home/node/app/certificates

# Copy package.json and package-lock.json
COPY build/ /home/node/app/build

COPY run.sh/ /home/node/app/run.sh

COPY vacation-ui-bundle.crt /home/node/app/certificates/vacation-ui.crt

COPY vacation-ui.key /home/node/app/certificates/vacation-ui.key

# Build the frontend app
RUN npm install -g serve

RUN chmod +x run.sh

ENV SERVER_PORT=443

# Expose the port on which your frontend app runs (if applicable)
EXPOSE 443

# Specify the command to start your frontend app server
CMD ["./run.sh"]
