module.exports = {
  reactStrictMode: true,
  env: {
    nodeEnv: 'production',
    DEV_APP_API: 'http://localhost:5000/api/v1',
    // PRODUCTION_APP_API: 'https://rdnaks-api.onrender.com/api/v1',
    PRODUCTION_APP_API: 'http://212.1.213.208/api/v1',
    DEV_APP_URL: 'http://localhost:3000',
    APP_URL: 'https://rdnaksict.vercel.app',
    GOOGLE_API: 'AIzaSyC6LsjcErgaKvmmIJcWfIJyBkf3SxFivNc',
    FIREBASE_KEY: 'AIzaSyDystoxemuJuTzy-ewqPjfYuKRyFK2i8So',
    AUTH_DOMAIN: 'rdnaks-website.firebaseapp.com',
    PROJECT_ID: 'rdnaks-website',
    STORAGE_BUCKET: 'rdnaks-website.appspot.com',
    MESSAGING_SENDER_ID: '409384853492',
    APP_ID: '1:409384853492:web:ddd455cbe9e51dd09de3a1',
    MESUREMENT_ID: 'G-PZT2QP4BMP',
  },
  experimental: {
    newNextLinkBehavior: false,
  },
};
