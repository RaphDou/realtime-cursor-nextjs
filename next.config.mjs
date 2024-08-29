/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: (config, { isServer }) => {
      // Ajout du support pour les WebSockets
      config.externals = [...config.externals, 'bufferutil', 'utf-8-validate'];
      
      return config;
    },
  };
  
  export default nextConfig;