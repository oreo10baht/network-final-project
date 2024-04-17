/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    backend: "https://network-final-project.vercel.app",
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
