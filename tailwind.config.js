/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    colors: {
      white: 'rgb(var(--color-white) / <alpha-value>)',
      black: 'rgb(var(--color-black) / <alpha-value>)',
      dark: 'rgb(var(--color-dark) / <alpha-value>)',
      transparent: 'transparent',
      current: 'currentColor',

      // Loop through each color category to generate the shades (50, 100, 200, ..., 950)
      ...['green', 'blue', 'orange', 'red', 'gray'].reduce((acc, category) => {
        const shades = Array.from({ length: 10 }, (_, i) => (i + 1) * 100); // Generates [100, 200, ..., 900]

        // For each category, add the shades dynamically
        acc[category] = shades.reduce((shadeAcc, shade) => {
          shadeAcc[shade] = `rgb(var(--color-${category}-${shade}) / <alpha-value>)`;
          return shadeAcc;
        }, {});

        // Add the 950 shade manually for each category
        acc[category][950] = `rgb(var(--color-${category}-950) / <alpha-value>)`;

        return acc;
      }, {}),
    },
    extend: {
      borderRadius: {
        none: '0px',
        xs: '0.125rem', // 2px
        sm: '0.25rem', // 4px
        DEFAULT: '0.5rem', // 8px
        lg: '0.75rem', // 12px
        xl: '1rem', // 16px
        '2xl': '1.25rem', // 20px
        '3xl': '2rem', // 32px
        full: '9999px',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'], // Add Poppins as the default sans-serif font
      },
      fontSize: {
        xxs: '0.625rem', // 10px
        xs: '0.75rem', // 12px
        sm: '0.875rem', // 14px
        base: '1rem', // 16px
        lg: '1.125rem', // 18px
        xl: '1.25rem', // 20px
        '2xl': '1.5rem', // 24px
        '3xl': '2rem', // 32px
        '4xl': '2.5rem', // 40px
        '5xl': '3rem', // 48px
        '6xl': '3.75rem', // 60px
        '7xl': '4.5rem', // 72px
        '8xl': '5.625rem', // 90px
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0em',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
      },
      lineHeight: {
        none: '1',
        tight: '100%',
        normal: '125%',
        loose: '150%',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    plugin(function ({ addBase, theme }) {
      // Helper function to compute letterSpacing as percentage of fontSize
      const computeLetterSpacing = (fontSize, percentage) => {
        const sizeInPx = parseFloat(fontSize) * 16;
        return `${(sizeInPx * (percentage / 100)) / 16}rem`;
      };
      addBase({
        html: {
          color: 'rgb(var(--color-black) / <alpha-value>)',
        },
        'h1, .h1': {
          fontSize: theme('fontSize.3xl'),
          lineHeight: theme('lineHeight.tight'),
          letterSpacing: computeLetterSpacing(theme('fontSize.3xl'), -2),
          fontWeight: theme('fontWeight.semibold'),
          [`@screen md`]: {
            fontSize: theme('fontSize.4xl'),
            letterSpacing: computeLetterSpacing(theme('fontSize.4xl'), -3),
          },
          [`@screen lg`]: {
            fontSize: theme('fontSize.6xl'),
            letterSpacing: computeLetterSpacing(theme('fontSize.6xl'), -3),
          },
        },
        'h2, .h2': {
          fontSize: theme('fontSize.2xl'),
          lineHeight: theme('lineHeight.tight'),
          letterSpacing: computeLetterSpacing(theme('fontSize.2xl'), -1),
          fontWeight: theme('fontWeight.semibold'),
          [`@screen md`]: {
            fontSize: theme('fontSize.3xl'),
            letterSpacing: computeLetterSpacing(theme('fontSize.3xl'), -2),
          },
          [`@screen lg`]: {
            fontSize: theme('fontSize.4xl'),
            letterSpacing: computeLetterSpacing(theme('fontSize.4xl'), -2),
          },
        },
        'h3, .h3': {
          fontSize: theme('fontSize.xl'),
          lineHeight: theme('lineHeight.tight'),
          fontWeight: theme('fontWeight.semibold'),
          [`@screen md`]: {
            fontSize: theme('fontSize.2xl'),
            letterSpacing: computeLetterSpacing(theme('fontSize.2xl'), -1),
          },
          [`@screen lg`]: {
            fontSize: theme('fontSize.3xl'),
            letterSpacing: computeLetterSpacing(theme('fontSize.3xl'), -2),
          },
        },
        'h4, .h4': {
          fontSize: theme('fontSize.lg'),
          lineHeight: theme('lineHeight.tight'),
          letterSpacing: computeLetterSpacing(theme('fontSize.lg'), -1),
          fontWeight: theme('fontWeight.semibold'),
          [`@screen md`]: {
            fontSize: theme('fontSize.xl'),
          },
          [`@screen lg`]: {
            fontSize: theme('fontSize.2xl'),
          },
        },
        'h5, .h5': {
          fontSize: theme('fontSize.base'),
          lineHeight: theme('lineHeight.tight'),
          fontWeight: theme('fontWeight.semibold'),
          [`@screen md`]: {
            fontSize: theme('fontSize.lg'),
          },
          [`@screen lg`]: {
            fontSize: theme('fontSize.xl'),
          },
        },
        // p: {
        //   fontSize: theme('fontSize.lg'),
        //   lineHeight: theme('lineHeight.tight'),
        // },
        a: {
          fontSize: theme('fontSize.lg'),
          textDecoration: 'underline',
          [`&:hover`]: {
            textDecoration: 'none',
          },
        },
      });
    }),
  ],
};
