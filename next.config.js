module.exports = {
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
};
