/**
 * Created by flyjennyetn on 2016-10-26.
 */
if (process.env.NODE_ENV) {
  module.exports = require('./configureStore.prod')
} else {
  module.exports = require('./configureStore.dev')
}