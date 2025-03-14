module.exports = {
  mode: 'jit',
  content: [
    './src/**/**/*.{js,ts,jsx,tsx,html,mdx}',
    './src/**/*.{js,ts,jsx,tsx,html,mdx}'
  ],
  darkMode: 'class',
  theme: {
    screens: {
      lg: { max: '1440px' },
      md: { max: '1050px' },
      sm: { max: '550px' }
    },
    extend: {}
  },
  plugins: [require('@tailwindcss/forms')]
};
