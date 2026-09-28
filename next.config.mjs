const repo = "Pooja_Kiran_Portfolio_Website";
const isProduction = process.env.NODE_ENV === "production";

/** @type {import("next").NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isProduction ? `/${repo}` : "",
  assetPrefix: isProduction ? `/${repo}` : "",
  images: { unoptimized: true }
};

export default nextConfig;
