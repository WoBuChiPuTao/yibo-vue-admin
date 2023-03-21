/* eslint-disable no-useless-computed-key */
/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}', './public/*.html'],
  theme: {
    extend: {}
  },
  plugins: [plugin(createEnterTransition())]
}

function createEnterTransition(childrenNum = 5) {
  const createCss = (axisName, index) => {
    const axis = axisName.toUpperCase()
    return {
      [`.enter-${axisName}:nth-child(${index})`]: {
        transform: `translate${axis}(60px)`
      },
      [`.i-enter-${axisName}:nth-child(${index})`]: {
        transform: `translate${axis}(-60px)`
      },
      [`.enter-${axisName}:nth-child(${index}),.i-enter-${axisName}:nth-child(${index})`]: {
        opacity: 0,
        animation: `enter-${axisName}-animation 0.4s ease-in-out 0.3s`,
        'animation-fill-mode': 'forwards',
        'animation-delay': `${(index * 1) / 10}s`
      }
    }
  }

  function handler({ addBase }) {
    const addCss = {}
    for (let i = 1; i < childrenNum + 1; i++) {
      Object.assign(addCss, { ...createCss('x', i), ...createCss('y', i) })
    }
    addBase({
      ...addCss,
      ['@keyframes enter-x-animation']: {
        to: {
          opacity: '1',
          transform: 'translateX(0)'
        }
      },
      ['@keyframes enter-y-animation']: {
        to: {
          opacity: '1',
          transform: 'translateY(0)'
        }
      }
    })
  }

  return handler
}
