import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Lets you use your GitHub profile picture as the avatar, e.g.
    // avatar: "https://avatars.githubusercontent.com/u/123456"
    remotePatterns: [{ protocol: "https", hostname: "avatars.githubusercontent.com" }],
  },
};

export default nextConfig;
