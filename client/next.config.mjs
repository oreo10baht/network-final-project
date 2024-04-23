/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    backend: "http://54.173.121.129:8080",
    // socket: "wss://shark-app-nkfds.ondigitalocean.app",
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
