/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  // Preview-only: allow the Base44 sandbox preview origin for HMR/dev assets.
  // Gated on BASE44_PREVIEW_MODE === "1"; absent or any other value preserves
  // the original behavior (no extra origins).
  ...(process.env.BASE44_PREVIEW_MODE === '1' && process.env.BASE44_PUBLIC_HOST_SUFFIX
    ? { allowedDevOrigins: [`3000-${process.env.BASE44_PUBLIC_HOST_SUFFIX}`] }
    : {}),
};

export default nextConfig;
