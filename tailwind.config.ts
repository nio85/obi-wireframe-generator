import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/renderer/index.html', './src/renderer/src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'obi-orange': '#FF6600',
        'obi-orange-dark': '#E55C00',
        'obi-orange-light': '#FF8533',
        'obi-gray-dark': '#333333',
        'obi-gray': '#666666',
        'obi-gray-light': '#F5F5F5',
        'obi-white': '#FFFFFF'
      },
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif'
        ]
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem'
      },
      width: {
        'canvas-desktop': '1440px',
        'canvas-mobile': '375px'
      },
      minWidth: {
        'canvas-mobile': '375px'
      },
      maxWidth: {
        'canvas-desktop': '1440px'
      },
      borderRadius: {
        obi: '4px'
      },
      zIndex: {
        'toolbar': '40',
        'panel': '30',
        'canvas': '10',
        'drag-overlay': '50',
        'modal': '60'
      }
    }
  },
  plugins: []
}

export default config
