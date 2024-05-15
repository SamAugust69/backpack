const { colors } = require('tailwindcss/colors');

const config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			colors: {
				...colors,

				r: {
					50: '#fbf5f5',
					100: '#f6eaea',
					200: '#efd9d9',
					300: '#e3bebe',
					400: '#d29797',
					500: '#bc6e6e',
					600: '#a95959',
					700: '#8d4848',
					800: '#763e3e',
					900: '#633939',
					950: '#341b1b',
				},
			},
		},
	},
	plugins: [],
};
export default config;
