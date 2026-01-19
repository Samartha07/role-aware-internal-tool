# 1. Base image
FROM node:22-alpine

# 2. Set working directory
WORKDIR /app

# 3. Copy package files
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy rest of the code
COPY . .

# 6. Expose app port
EXPOSE 3000

# 7. Start the app
CMD ["node", "src/app.js"]
