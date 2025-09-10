/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
      },
    },
    lineHeight: {
      'badge-md': 'var(--badge-md-text-size)',
    },
    minHeight: {
      sm: 'var(--height-sm)',
      md: 'var(--height-md)',
    },
    fontSize: {
      h1: 'var(--h1)',
      h2: 'var(--h2)',
      h3: 'var(--h3)',
      h4: 'var(--h4)',
      h5: 'var(--h5)',
      h6: 'var(--h6)',
      'body-lg': 'var(--body-lg)',
      'body-1': 'var(--body-1)',
      'body-2': 'var(--body-2)',
      'label-1': 'var(--label-1)',
      'label-2': 'var(--label-2)',
      'caption-1': 'var(--caption-1)',
      'caption-2': 'var(--caption-2)',
      'overline-1': 'var(--overline-1)',
      'overline-2': 'var(--overline-2)',
      logo: 'var(--logo)',

      'button-sm': 'var(--button-sm-text-size)',
      'button-md': 'var(--button-md-text-size)',
      'button-lg': 'var(--button-lg-text-size)',

      'badge-sm': 'var(--badge-sm-text-size)',
      'badge-md': 'var(--badge-md-text-size)',
      'badge-lg': 'var(--badge-lg-text-size)',

      'icon-xs': 'var(--icon-xs-size)',
      'icon-sm': 'var(--icon-sm-size)',
      'icon-md': 'var(--icon-md-size)',
      'icon-lg': 'var(--icon-lg-size)',
      'icon-xl': 'var(--icon-xl-size)',
      'icon-2xl': 'var(--icon-2xl-size)',
      'icon-3xl': 'var(--icon-3xl-size)',
      'icon-4xl': 'var(--icon-4xl-size)',

      'input-text-size': 'var(--input-text-size)',
    },
    colors: {
      accent: 'var(--accent)',
      red: 'var(--red)',
      'red-alpha-20': 'var(--red-alpha-20)',
      'label-primary': 'var(--label-primary)',
      'label-secondary': 'var(--label-secondary)',
      'label-accent': 'var(--label-accent)',
      'fill-accent': 'var(--fill-accent)',
      'bg-vibrant-primary': 'var(--bg-vibrant-primary)',
      'bg-vibrant-accent': 'var(--bg-vibrant-accent)',
      'bg-primary': 'var(--bg-primary)',
      'bg-secondary': 'var(--bg-secondary)',
      'bg-tertiary': 'var(--bg-tertiary)',
      miscellaneous: 'var(--miscellaneous)',
      'miscellaneous-topic-stroke': 'var(--miscellaneous-topic-stroke)',
      'miscellaneous-component': 'var(--miscellaneous-component)',

      'screen-bg-primary': 'var(--screen-bg-primary)',

      'button-primary-bg': 'var(--button-primary-bg)',
      'button-primary-text': 'var(--button-primary-text)',
      'button-primary-border': 'var(--button-primary-border)',

      'button-secondary-bg': 'var(--button-secondary-bg)',
      'button-secondary-text': 'var(--button-secondary-text)',

      'button-outlined-bg': 'var(--button-outlined-bg)',
      'button-outlined-text': 'var(--button-outlined-text)',
      'button-outlined-border': 'var(--button-outlined-border)',

      'button-outlined-secondary-bg': 'var(--button-outlined-secondary-bg)',
      'button-outlined-secondary-text': 'var(--button-outlined-secondary-text)',
      'button-outlined-secondary-border': 'var(--button-outlined-secondary-border)',

      'badge-primary-bg': 'var(--badge-primary-bg)',
      'badge-primary-text': 'var(--badge-primary-text)',
      'badge-primary-border': 'var(--badge-primary-border)',

      'badge-secondary-bg': 'var(--badge-secondary-bg)',
      'badge-secondary-text': 'var(--badge-secondary-text)',

      'badge-outlined-bg': 'var(--badge-outlined-bg)',
      'badge-outlined-text': 'var(--badge-outlined-text)',
      'badge-outlined-border': 'var(--badge-outlined-border)',

      'button-white-bg': 'var(--button-white-bg)',

      'button-black-bg': 'var(--button-black-bg)',
      'button-email-bg': 'var(--button-email-bg)',

      'icon-accent': 'var(--icon-accent)',
      'icon-white': 'var(--icon-white)',
      'icon-primary': 'var(--icon-primary)',
      'icon-secondary': 'var(--icon-secondary)',
      'icon-tertiary': 'var(--icon-tertiary)',
      'icon-logo': 'var(--icon-logo)',
      'icon-miscellaneous': 'var(--icon-miscellaneous)',
      'icon-brand': 'var(--icon-brand)',
      'icon-red': 'var(--icon-red)',
      'icon-green': 'var(--icon-green)',
      'icon-blue': 'var(--icon-blue)',
      'icon-error': 'var(--icon-error)',

      'typography-primary': 'var(--typography-primary)',
      'typography-secondary': 'var(--typography-secondary)',
      'typography-tertiary': 'var(--typography-tertiary)',
      'typography-accent': 'var(--typography-accent)',
      'typography-red': 'var(--typography-red)',
      'typography-white': 'var(--typography-white)',
      'typography-black': 'var(--typography-black)',

      'separator-bg': 'var(--separator-bg)',

      'input-border--focus': 'var(--input-border--focus)',
      'input-border--error': 'var(--input-border--error)',
      'input-primary-border': 'var(--input-primary-border)',
      'input-secondary-border': 'var(--input-secondary-border)',
      'input-text': 'var(--input-text)',
      'input-label': 'var(--input-label)',
      'input-placeholder': 'var(--input-placeholder)',
      'input-placeholder--error': 'var(--input-placeholder--error)',
    },
  },
  plugins: [],
}
