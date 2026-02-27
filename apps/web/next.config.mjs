/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    transpilePackages: ['@timestake/shared', '@timestake/base-adapter', '@timestake/stacks-adapter'],
};

export default nextConfig;
