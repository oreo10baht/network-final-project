/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // backend: "https://shark-app-nkfds.ondigitalocean.app",
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
