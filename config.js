// const merge = require('lodash/merge');

const isDev = process.env.NODE_ENV !== 'production'
const isJest = process.env.JEST_WORKER_ID !== undefined

if (typeof document !== 'undefined' && !isJest) {
  throw new Error('Do not import `config.js` from inside the client-side code.')
}

export const DB_NAME = 'test'
const PORT = 3000

const prodConfig = {
  siteName: 'Dreaming and Do Together',
  baseUrl: `http://localhost:${PORT}`,
  dev: isDev,

  port: process.env.PORT || 3000,
  jwtSecret: 'jwt',

  locale: {
    default: 'en',
    supported: ['en', 'en_US', 'uk_UA']
  },

  mongo: {
    uri: process.env.MONGO_URL || `mongodb://localhost:27017/${DB_NAME}`,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      poolSize: 10, // Maintain up to 10 socket connections
      bufferMaxEntries: 0
    }
  }
}

export default prodConfig
