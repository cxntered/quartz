/** @type {import('next').NextConfig} */
const nextConfig = {
	...(process.env.SECRET ? {
		env: {
			SECRET: process.env.SECRET,
		}
	} : {})
}

module.exports = nextConfig
