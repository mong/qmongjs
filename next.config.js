const moduleExports = {
  basePath: "/kvalitetsregistre",
  trailingSlash: true,
  images: {
    loader: "custom",
  },
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = moduleExports;
