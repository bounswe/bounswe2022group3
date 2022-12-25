const removeImports = require('next-remove-imports')();
module.exports = removeImports({
  output: "standalone",
  reactStrictMode: true,
  API_URL: "https://api.bucademy.tk",
  eslint: {
    ignoreDuringBuilds: true,
  },
  google_maps_api_key: "AIzaSyDOQSDLIB16cdUtIYZWxrjkxTnOYUd9n0c"
});
