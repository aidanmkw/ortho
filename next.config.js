/** @type {import('next').NextConfig} */
// Static export for GitHub Pages.
// The repo is hosted at aidanmkw/ortho, so the project URL is
// https://aidanmkw.github.io/ortho/  → basePath/assetPrefix = "/ortho".
// Override with NEXT_PUBLIC_BASE_PATH when serving from a different root.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/ortho";

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

module.exports = nextConfig;
