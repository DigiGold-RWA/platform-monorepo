/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ["sequelize"],
    },
    webpack: (config) => {
        config.resolve.fallback = {
            fs: false,
            path: false,
            stream: false,
            constants: false,
        };
        return config;
    },
};

module.exports = nextConfig;
