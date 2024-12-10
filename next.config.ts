import type { NextConfig } from "next";

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "d2j6dbq0eux0bg.cloudfront.net",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

module.exports = nextConfig;

export default nextConfig;
