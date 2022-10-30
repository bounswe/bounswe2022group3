const removeImports = require('next-remove-imports')();
module.exports = removeImports({
  reactStrictMode: true,
  API_URL: "http://3.72.116.99:5000"
});