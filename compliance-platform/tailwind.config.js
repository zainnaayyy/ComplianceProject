/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        sm: '640px', // Small devices
        md: '768px', // Medium devices
        lg: '1024px', // Large devices
        xl: '1280px', // Extra large devices
        '2xl': '1400px', // Extra extra large devices
      },
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        dark: {
          'primary': 'rgb(0, 188, 212)', // Cyan 500
          'primary-50': 'rgb(224, 247, 250)',
          'primary-100': 'rgb(178, 235, 242)',
          'primary-200': 'rgb(128, 222, 234)',
          'primary-300': 'rgb(77, 208, 225)',
          'primary-400': 'rgb(38, 198, 218)',
          'primary-500': 'rgb(0, 188, 212)', // Main primary color
          'primary-600': 'rgb(0, 172, 193)',
          'primary-700': 'rgb(0, 151, 167)',
          'primary-800': 'rgb(0, 131, 143)',
          'primary-900': 'rgb(0, 110, 117)',
          'primary-950': 'rgb(0, 88, 94)',
          'muted-50': 'rgb(248, 250, 252)',
          'muted-100': 'rgb(241, 245, 249)',
          'muted-200': 'rgb(226, 232, 240)',
          'muted-300': 'rgb(203, 213, 225)',
          'muted-400': 'rgb(148, 163, 184)',
          'muted-500': 'rgb(100, 116, 139)',
          'muted-600': 'rgb(71, 85, 105)',
          'muted-700': 'rgb(51, 65, 85)',
          'muted-800': 'rgb(30, 41, 59)',
          'muted-900': 'rgb(15, 23, 42)',
          'muted-950': 'rgb(2, 6, 23)',
        },

        light: {
          'primary': 'rgb(0, 188, 212)',
          'primary-50': 'rgb(224, 247, 250)',
          'primary-100': 'rgb(178, 235, 242)',
          'primary-200': 'rgb(128, 222, 234)',
          'primary-300': 'rgb(77, 208, 225)',
          'primary-400': 'rgb(38, 198, 218)',
          'primary-500': 'rgb(0, 188, 212)',
          'primary-600': 'rgb(0, 172, 193)',
          'primary-700': 'rgb(0, 151, 167)',
          'primary-800': 'rgb(0, 131, 143)',
          'primary-900': 'rgb(0, 110, 117)',
          'primary-950': 'rgb(0, 88, 94)',
          'muted-50': 'rgb(255, 255, 255)',
          'muted-100': 'rgb(245, 245, 245)',
          'muted-200': 'rgb(232, 232, 232)',
          'muted-300': 'rgb(210, 210, 210)',
          'muted-400': 'rgb(180, 180, 180)',
          'muted-500': 'rgb(150, 150, 150)',
          'muted-600': 'rgb(120, 120, 120)',
          'muted-700': 'rgb(90, 90, 90)',
          'muted-800': 'rgb(60, 60, 60)',
          'muted-900': 'rgb(30, 30, 30)',
          'muted-950': 'rgb(10, 10, 10)',
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.nui-focus': {
          '@apply outline-transparent outline-offset-2 outline-dashed outline-1':
            {},
        },
        '.nui-focus:focus-within': {
          '@apply outline-[rgb(var(--color-muted-300)/1)]': {},
        },
      };

      addUtilities(newUtilities);
    },
    function ({ addVariant, e }) {
      // Define the last:border-e-none variant
      addVariant('last', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`last${separator}${className}`)}:last-child`;
        });
      });
    },
  ],
};
