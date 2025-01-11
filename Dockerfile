# Step 1: Use an official Node.js 20 image as a base image
FROM node:20-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to the container
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application files into the container
COPY . .

# Step 6: Build the React app
RUN npm run build

# Step 7: Expose port 3000 (React default port)
EXPOSE 3000

# Step 8: Start the app
CMD ["npm", "start"]
