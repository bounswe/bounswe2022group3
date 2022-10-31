const removeImports = require('next-remove-imports')();
module.exports = removeImports({
  output: "standalone",
  reactStrictMode: true,
  API_URL: "http://3.72.116.99:5000",
  eslint: {
    ignoreDuringBuilds: true,
  },
});
