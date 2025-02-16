/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
    output: 'export',
    assetPrefix: isProd ? '/HTML5-Canvas-Simulations/' : '',
    basePath: isProd ? '/HTML5-Canvas-Simulations' : '',
};

export default nextConfig;
