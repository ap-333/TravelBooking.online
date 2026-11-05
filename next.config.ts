import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Static HTML export: served by the C++ server in ./server (which also sets security headers).
  output: "export",
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
