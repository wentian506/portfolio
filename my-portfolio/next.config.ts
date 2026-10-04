import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    // When this version of the site was built. The launch clock only uses it if it
    // can't find your first deploy (see src/lib/launch.ts).
    BUILT_AT: new Date().toISOString(),
  },
  images: {
    // Lets you use your GitHub profile picture as the avatar, e.g.
    // avatar: "https://avatars.githubusercontent.com/u/123456"
    remotePatterns: [{ protocol: "https", hostname: "avatars.githubusercontent.com" }],
  },
};

export default nextConfig;
