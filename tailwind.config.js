const plugin = require("tailwindcss");
const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			fdfp: {
  				main: 'var(--fdfp-main-color)',
  				'main-light': 'var(--fdfp-main-color-light)',
  				second: 'var(--fdfp-second-color)',
  				white: 'var(--fdfp-white-color)',
  				lighter: 'var(--fdfp-bg-color-lighter)',
  				bg: 'var(--fdfp-bg-color)',
  				'bg-white': 'var(--fdfp-bg-white)',
  				'bg-card': 'var(--fdfp-bg-card)',
  				'bg-thead': 'var(--fdfp-bg-thead)',
  				'bg-pagination': 'var(--fdfp-bg-pagination)',
  				bgsecond: 'var(--fdfp-bg-color-second)',
  				text: 'var(--fdfb-text-color)',
  				textsecond: 'var(--fdfb-text-second-color)',
  				light: 'var(--fdfp-light-color)'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		screens: {
  			tablet: '820px'
  		},
  		fontFamily: {
  			manrope: ["Manrope", ...fontFamily.sans],
  			monospace: ["Major Mono Display", ...fontFamily.mono],
  			serif: ["var(--ff-serif)", ...fontFamily.serif],
  			'space-grotesk': 'var(--font-space-grotesk)',
  			'clash-display': 'var(--font-clash-display)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("not-last-child", "&:not(:last-child)");
    }),
    require("tailwindcss-animate"),
  ],
};
