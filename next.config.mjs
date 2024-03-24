/** @type {import('next').NextConfig} */
const nextConfig = {
    images : {
        remotePatterns: [
            // localhost 
            {
                hostname: 'localhost',
                
                protocol: 'http',
               
            }
        ]
    }
  
};

export default nextConfig;
