/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'culture.seoul.go.kr',
          pathname: '/**', // 모든 경로를 허용
        },
      ],
    },
  };
  
  export default nextConfig; // export default 사용