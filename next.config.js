// next.config.js
const withTM = require('next-transpile-modules')(['ol']); // pass the modules you would like to see transpiled

module.exports = withTM({
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
});

// module.exports = {
//   images: {
//     domains: ['firebasestorage.googleapis.com'],
//   },
// };
