/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    colors: {
      'screen-bg-primary': 'var(--screen-bg-primary)',

      'button-primary-bg': 'var(--button-primary-bg)',
      'button-primary-text': 'var(--button-primary-text)',
    },
  },
  plugins: [],
}
