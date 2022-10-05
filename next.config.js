const moduleExports = {
  // your existing module.exports
  async redirects() {
    return [
      {
        source: "/",
        destination: "/alle/sykehus",
        permanent: true,
      },
      {
        source: "/alle",
        destination: "/alle/sykehus",
        permanent: true,
      },
    ];
  },
  basePath: "/kvalitetsregistre",
  trailingSlash: true,
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = moduleExports;
