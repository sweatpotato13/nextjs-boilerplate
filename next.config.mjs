/** @type {import('next').NextConfig} */

const nextConfig = {
    cacheComponents: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "i.pravatar.cc",
            },
        ],
    },
};

export default nextConfig;
