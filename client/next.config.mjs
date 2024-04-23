/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    backend: "http://25.22.5.35:8080",
    // socket: "wss://shark-app-nkfds.ondigitalocean.app",
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
