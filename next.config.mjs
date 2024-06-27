/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  sassOptions: {
    includePaths: ["./styles", "./app"],
    prependData: `@import "./styles/Fonts.sass"`,
  },
};

export default nextConfig;
