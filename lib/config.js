module.exports = {
  PORT: process.env.PORT || 8080,
  REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379/0',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/seedalpha',
};
