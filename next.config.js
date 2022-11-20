const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // appDir: true, next13 yarn berry 오류가 해결될 때 까지 보류
    compiler: {
      styledComponents: true,
    },
  },
};

module.exports = nextConfig;
