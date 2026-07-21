/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Produce a fully static site in the `out/` folder (for Hostinger shared hosting).
  output: "export",

  // Emit `/tours/index.html` style paths so clean URLs work on Apache/LiteSpeed.
  trailingSlash: true,

  // Static hosting has no image optimizer, so serve images as-is.
  images: { unoptimized: true },
};

export default nextConfig;
