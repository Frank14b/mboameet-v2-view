/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  viewport: 'none', // or 'none' to completely disable
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
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
      }
    ],
  },
};

export default nextConfig;
