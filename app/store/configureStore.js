/**
 * Created by flyjennyetn on 2016-10-26.
 */
if (process.env.NODE_ENV != 'production' && process.env.NODE_ENV != 'dev') {
  module.exports = require('./configureStore.dev')
} else {
  module.exports = require('./configureStore.prod')
}