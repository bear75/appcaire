import { fileURLToPath } from "node:url";
import createJiti from "jiti";

const jiti = createJiti(fileURLToPath(import.meta.url));

// Load environment variables
jiti("./src/lib/Env");

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  poweredByHeader: false,
  eslint: {
    dirs: ["."],
  },
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["images.clerk.dev", "img.clerk.com"],
  },
};

export default config;
