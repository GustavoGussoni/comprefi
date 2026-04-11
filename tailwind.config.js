/** @type {import('tailwindcss').Config} */
module.exports = {
darkMode: ["class"],
content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
theme: {
extend: {
	borderRadius: {
		lg: 'var(--radius)',
		md: 'calc(var(--radius) - 2px)',
		sm: 'calc(var(--radius) - 4px)'
	},
	colors: {
		sidebar: {
			DEFAULT: 'hsl(var(--sidebar-background))',
			foreground: 'hsl(var(--sidebar-foreground))',
			primary: 'hsl(var(--sidebar-primary))',
			'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
			accent: 'hsl(var(--sidebar-accent))',
			'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
			border: 'hsl(var(--sidebar-border))',
			ring: 'hsl(var(--sidebar-ring))'
		},
		funnel: {
			primary: "#ff6100",
			success: "#34C759",
			error: "#FF3B30",
			warning: "#FFCC00",
			background: "#000000",
			surface: "#1C1C1E",
			"surface-light": "#2C2C2E",
			"text-primary": "#FFFFFF",
			"text-secondary": "#8A8A8E",
			"text-on-primary": "#FFFFFF",
		},
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
plugins: [require("tailwindcss-animate")],
}

