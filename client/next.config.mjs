/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    backend: "https://shark-app-nkfds.ondigitalocean.app",
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
