// Figure out what set of credentials to return
if(process.env.NODE_ENV === 'production') {
  // In production
  module.exports = require('./prod');
} else {
  // In dev
  module.exports = require('./dev');
}
