/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    backend: "http://localhost:8080",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
