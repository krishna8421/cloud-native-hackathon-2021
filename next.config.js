/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    JWT_SECRET: process.env.JWT_SECRET,
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,
    MONGODB_URI: process.env.MONGODB_URI,
    STREAM_CHAT_KEY: process.env.STREAM_CHAT_KEY,
    STREAM_CHAT_SECRET: process.env.STREAM_CHAT_SECRET,
  },
};
