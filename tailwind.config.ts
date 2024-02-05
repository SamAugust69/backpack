import type { Config } from 'tailwindcss';
const { colors } = require('tailwindcss/colors');

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				...colors,
				g: {
					100: '#615757',
					200: '#494040',
				},
				r: {
					100: '#C3464A',
					200: '#B8292D',
				},
				t: {
					100: '#C9B08E',
					200: '#BBA68A',
					300: '#C6A880',
				},
				b: {
					100: '#3A2C27',
				},
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
		},
	},
	plugins: [],
};
export default config;
