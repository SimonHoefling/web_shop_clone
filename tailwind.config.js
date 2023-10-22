/** @type {import('tailwindcss').Config} */
/*eslint-env node*/
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      height: {
        '112': '28rem', // Custom class h-112
        '118': '29.5rem', // Custom class h-118
        '128': '32rem', // Custom class h-128
        '144': '36rem', // Custom class h-144
      },
    },
  },
  plugins: [],
};
