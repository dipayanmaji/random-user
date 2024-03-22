/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'randomuser.me',
                port: '',
                pathname: '/api/**'
            }
        ]
    }
};

export default nextConfig;
