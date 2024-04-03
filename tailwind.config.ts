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
					'50': '#f5f4f1',
					'100': '#e5e2dc',
					'200': '#cec5ba',
					'300': '#b1a393',
					'400': '#9b8774',
					'500': '#8c7766',
					'600': '#786256',
					'700': '#5e4c45',
					'800': '#534440',
					'900': '#493c3a',
					'950': '#29201f',
				},

				r: {
					'50': '#fbf5f5',
					'100': '#f6eaea',
					'200': '#efd9d9',
					'300': '#e3bebe',
					'400': '#d29797',
					'500': '#bc6e6e',
					'600': '#a95959',
					'700': '#8d4848',
					'800': '#763e3e',
					'900': '#633939',
					'950': '#341b1b',
				},

				t: {
					'50': '#f9f6f3',
					'100': '#f1ece3',
					'200': '#e2d6c6',
					'300': '#cbb497',
					'400': '#bc9b7b',
					'500': '#ae8461',
					'600': '#a17355',
					'700': '#865d48',
					'800': '#6d4c3f',
					'900': '#594035',
					'950': '#2f201b',
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
