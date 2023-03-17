/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	/* 	async redirects() {
		return [
			{
				source: "/old-blog/:path*",
				destination: "/new-sexy-blog/:path*",
				permanent: false,
			},
		];
	}, */
	async rewrites() {
		return [
			{
				source: "/api/lists",
				destination: `https://books-api.nomadcoders.workers.dev/lists`,
			},
			{
				source: "/api/lists/:id",
				destination: `https://books-api.nomadcoders.workers.dev/list?name=:id`,
			},
		];
	},
};

module.exports = nextConfig;
