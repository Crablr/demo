import { config } from "dotenv";

config({
  path: "../../_config/develop/.web.env",
});

/** @type {import('next').NextConfig} */
export default {
  output: "export",
  productionBrowserSourceMaps: true,
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    // See https://github.com/WalletConnect/walletconnect-monorepo/issues/1908
    config.externals.push("pino-pretty");

    config.resolve.alias = {
      ...config.resolve.alias,
      "bigint-buffer": "bigint-buffer/dist/browser.js",
    };

    return config;
  },
};
