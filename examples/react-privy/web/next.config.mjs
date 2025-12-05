import { config } from "dotenv";

config({
  path: "../../../_config/develop/.web.env",
});

/** @type {import('next').NextConfig} */
export default {
  output: "export",
  productionBrowserSourceMaps: true,
  images: {
    unoptimized: true,
  },
};
