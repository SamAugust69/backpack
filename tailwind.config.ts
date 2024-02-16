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
					200: '#BA3C41',
					300: '#AC383C',
					400: '#9D3337',
					500: '#812A2D',
					600: '#722528',
					700: '#642023',
					800: '#561C1E',
					900: '#481719',
				},
				t: {
					100: '#C9B08E',
					200: '#C0A47D',
					300: '#B8996C',
					400: '#B18D5C',
					500: '#A5814F',
					600: '#947447',
					700: '#84673F',
					800: '#735A38',
					900: '#B8996C',

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
