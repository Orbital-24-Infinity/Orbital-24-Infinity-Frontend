/** @type {import('next').NextConfig} */

const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  sassOptions: {
    includePaths: ["./styles", "./app"],
    prependData: `@import "Fonts.sass"`
  },
};

export default nextConfig;
