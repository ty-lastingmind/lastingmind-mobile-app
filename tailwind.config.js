/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    fontSize: {
      h1: 'var(--h1)',
      h2: 'var(--h2)',
      h3: 'var(--h3)',
      h4: 'var(--h4)',
      h5: 'var(--h5)',
      h6: 'var(--h6)',
      'body-1': 'var(--body-1)',
      'body-2': 'var(--body-2)',
      'label-1': 'var(--label-1)',
      'label-2': 'var(--label-2)',
      'caption-1': 'var(--caption-1)',
      'caption-2': 'var(--caption-2)',
      'overline-1': 'var(--overline-1)',
      'overline-2': 'var(--overline-2)',
      'button-sm': 'var(--button-sm-text-size)',
      'button-md': 'var(--button-md-text-size)',
      'button-lg': 'var(--button-lg-text-size)',
    },
    colors: {
      'screen-bg-primary': 'var(--screen-bg-primary)',

      'button-primary-bg': 'var(--button-primary-bg)',
      'button-primary-text': 'var(--button-primary-text)',

      'button-secondary-bg': 'var(--button-secondary-bg)',
      'button-secondary-text': 'var(--button-secondary-text)',

      'button-outlined-bg': 'var(--button-outlined-bg)',
      'button-outlined-text': 'var(--button-outlined-text)',
      'button-outlined-border': 'var(--button-outlined-border)',

      'typography-primary': 'var(--typography-primary)',
      'typography-secondary': 'var(--typography-secondary)',
      'typography-tertiary': 'var(--typography-tertiary)',
    },
  },
  plugins: [],
}
