/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#101211',
        pine: '#27413c',
        mist: '#f0f1e9',
        volt: '#dcff5a',
        signal: '#bf3028',
        amber: '#b85f09',
      },
    },
  },
  plugins: [],
};
