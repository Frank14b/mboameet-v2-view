export const configs = {
  PUBLIC_FILES_LINK: process.env.NEXT_PUBLIC_API_PUBLIC_FILES_LINK,
  RESEND_OTP_TIME: process.env.NEXT_PUBLIC_API_PUBLIC_RESEND_OTP_TIMER,
  APP_ENV_MODE: process.env.NEXT_PUBLIC_APP_ENV,
  ENCRYPTION_PASSWORD: process.env.ENCRYPT_PASSWORD,
  WEBSOCKET_HOST: process.env.NEXT_PUBLIC_WEBSOCKET_HOST,

  server: {
    APP_ENV_MODE: process.env.APP_ENV,
    LIVE_API: process.env.LIVE_API,
    DEV_API: process.env.DEV_API,
    API_VERSION: process.env.API_VERSION,
  },
};
