FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json ./

RUN npm install

COPY . .


# Expose the port on which the application will run
EXPOSE 3000

# Start the application
CMD ["node", "index.js"]
