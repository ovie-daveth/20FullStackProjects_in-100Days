const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      "fs": false,
      "stream": require.resolve("stream-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "zlib": require.resolve("browserify-zlib"),
      "path": require.resolve("path-browserify"),
      "querystring": require.resolve("querystring-es3")
    }
  },
};
