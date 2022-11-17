const removeImports = require('next-remove-imports')();
module.exports = removeImports({
  output: "standalone",
  reactStrictMode: true,
  API_URL: "https://api.bucademy.tk",
  eslint: {
    ignoreDuringBuilds: true,
  },
});
