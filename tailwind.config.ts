import type { Config } from 'tailwindcss'
// added this ts_config file to allow me to do the ts styles and color management like god and avoid code redundancy 
// this is efficient especially when wanting to stage chnages system wide ( ie . when chaning color in one part of the code it will be detected system wide : id dynamic styling)

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Custom color palette
        'custom-green': '#34d567',
        'brand': {
          primary: '#34d567',
          secondary: '#2bc55a',
          dark: '#229147',
          light: '#5de082',
        },
        'chess_game_colors' : {
          'chess_aesthetic_bg_brown' : '#262522',
          'chess_navs' : '#302e2b',
          'chess_cards' : '#3C3B39',
          'chess_edge_color' : '#F59E0B',  // Changed from 'bg-orange-500' to hex value
        },

        // Semantic color names
        'success': '#34d567',
        'accent': '#34d567',
        // Override default primary color
        'primary': '#34d567',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      // You can add more theme extensions here as needed
    },
  },
  plugins: [],
  // Enable dark mode (uncomment if needed)
  // darkMode: 'class',
}

export default config
