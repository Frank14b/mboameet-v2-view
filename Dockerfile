FROM node:21-alpine as build

WORKDIR /app

COPY mboameet-v2-view/package.json mboameet-v2-view/package-lock.json ./
RUN npm install

# Copy source code
COPY mboameet-v2-view/. .

# Set environment variables
ENV NEXT_PUBLIC_APP_ENV="dev"
ENV NEXT_PUBLIC_LIVE_API="http://mboameet-v2-api/api"
ENV NEXT_PUBLIC_DEV_API="http://mboameet-v2-api/api"
ENV NEXT_PUBLIC_ENCRYPT_PASSWORD="TODO"
# server actions variables
ENV APP_ENV="dev"
ENV LIVE_API="http://mboameet-v2-api/api"
ENV DEV_API="http://mboameet-v2-api/api"
ENV ENCRYPT_PASSWORD="TODO"
ENV API_VERSION="v1"
# publics files host link
ENV NEXT_PUBLIC_API_PUBLIC_FILES_LINK="http://localhost:5000/"
# 60 seconds before each resend otp
ENV NEXT_PUBLIC_API_PUBLIC_RESEND_OTP_TIMER=15
# web socket connection host
ENV NEXT_PUBLIC_WEBSOCKET_HOST="http://localhost:5000/apphub"
ENV NEXT_PUBLIC_GENERAL_JWK_PUBLIC_KEY=''
ENV NEXT_PUBLIC_GENERAL_JWK_PRIVATE_KEY=''

RUN npm run lint

RUN npm run test

RUN npm run build

# Expose the port Next.js is running on (default is 3000)
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]