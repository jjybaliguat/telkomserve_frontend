module.exports = {
  reactStrictMode: true,
  env: {
    nodeEnv: 'development',
    DEV_APP_API: 'http://localhost:5000/api/v1',
    PRODUCTION_APP_API: 'https://rdnaks-api.onrender.com/api/v1',
    DEV_APP_URL: 'http://localhost:3000',
    APP_URL: 'https://rdnaksict.vercel.app',
    GOOGLE_API: 'AIzaSyC6LsjcErgaKvmmIJcWfIJyBkf3SxFivNc'
  },
  experimental: {
    newNextLinkBehavior: false,
  },
};
