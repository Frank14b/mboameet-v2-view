/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "docs.material-tailwind.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "demos.creative-tim.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "material-taillwind-pro-ct-tailwind-team.vercel.app",
        pathname: "/**",
        port: ""
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        pathname: "/**",
        port: ""
      },
      {
        protocol: "https",
        hostname: "material-tailwind.com",
        pathname: "/**",
        port: ""
      },
      {
        protocol: "https",
        hostname: "mboameet.azurewebsites.net",
        pathname: "/**",
        port: ""
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "mboameet-v2-api",
        pathname: "/**",
        port: "5000"
      }
    ],
  },
};

export default nextConfig;
