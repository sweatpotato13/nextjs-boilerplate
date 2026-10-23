/** @type {import('next').NextConfig} */

const nextConfig = {
    cacheComponents: true,
    // Preserve existing prefetch behavior during the security upgrade.
    partialPrefetching: false,
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
