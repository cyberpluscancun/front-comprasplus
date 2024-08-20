/** @type {import('tailwindcss').Config} */
import form from '@tailwindcss/forms'

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontSize: {
      'sm': '0.875rem', // 14px
      'base': '1rem', // 16px
      'lg': '1.125rem', // 18px
      'xl': '1.25rem', // 20px
      'xxl': '2.25rem', // 20px
      // Añade más tamaños si es necesario
      'default': '1rem' // Tamaño por defecto
    },
    colors: {
      'primary': '#007aff',
      'purple': '#d8e4ff',
      'accent': '#d8e4ff',
      'card': '#ebedef',
      'background': '#f7f9fc',
      'gray-dark': '#273444',
      'gray': '#9c9ca0',
      'gray-light': '#d3dce6',
      'text-color-primary': '#0f1c26',
      'text-color-secondary': '#49454f',
      'text-white': '#e8e8e8'
    },
    extend: {
      fontSize: {
        'default': '1rem' // Define el tamaño por defecto aquí
      }
    },
    fontFamily: {
      sans: ['Arian', 'sans-serif']
    }
  },
  plugins: [
    form
  ]
}
