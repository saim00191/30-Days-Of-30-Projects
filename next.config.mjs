/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.weatherapi.com', 'avatars.githubusercontent.com' , 'm.media-amazon.com'], // Allow images from both domains
  },
};

export default nextConfig;
