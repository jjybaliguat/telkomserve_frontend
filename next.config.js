module.exports = {
  reactStrictMode: true,
  env: {
    nodeEnv: 'production',
    DEV_APP_API: 'http://localhost:5000/api/v1',
    // PRODUCTION_APP_API: 'https://rdnaks-api.onrender.com/api/v1',
    PRODUCTION_APP_API: 'https://api.telkomserve.rdnaksnds.com/api/v1',
    DEV_APP_URL: 'http://localhost:3000',
    APP_URL: 'https://rdnaksnds.com',
    GOOGLE_API: 'AIzaSyC6LsjcErgaKvmmIJcWfIJyBkf3SxFivNc',
    FIREBASE_KEY: 'AIzaSyAlpm5gI_JMslV21zBehToOw5G7iUGinjU',
    AUTH_DOMAIN: 'telkomserve.firebaseapp.com',
    PROJECT_ID: 'telkomserve',
    STORAGE_BUCKET: 'telkomserve.appspot.com',
    MESSAGING_SENDER_ID: '314067617691',
    APP_ID: '1:314067617691:web:812d7c450cb4cbb24cc33e',
    MESUREMENT_ID: 'G-CBW9P8QT9P',
  },
  experimental: {
    newNextLinkBehavior: false,
  },
};
