# Build stage
FROM node:18-alpine as build-stage
# Install git (required by some npm/yarn packages)
RUN apk add --no-cache git
WORKDIR /app
# Copy package files and lock file for faster, more reliable installs
COPY package*.json yarn.lock* ./
# Configure yarn with increased timeouts and better network handling
# Ignore engine checks to allow Node.js 18 compatibility
RUN yarn config set network-timeout 600000 && \
    yarn config set network-concurrency 1 && \
    yarn config set http-timeout 600000 && \
    yarn install --network-timeout 600000 --network-concurrency 1 --ignore-engines --frozen-lockfile || \
    (echo "First attempt failed, retrying without frozen lockfile..." && \
     yarn install --network-timeout 600000 --network-concurrency 1 --ignore-engines)
COPY . .
ARG VUE_APP_API_URL
ENV VUE_APP_API_URL=$VUE_APP_API_URL
RUN yarn build

# Production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
