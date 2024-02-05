const withPWA = require('next-pwa')({
	dest: 'public',
	register: true,
	dynamicStartUrl: false,
});

/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = withPWA(nextConfig);
