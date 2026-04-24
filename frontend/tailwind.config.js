/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#f0f7f4',
        primary: '#1D9E75',
        darkGreen: '#0F6E56',
        lightGreen: '#5DCAA5',
        cardBorder: '#ddeee6',
        pageBorder: '#e0f0e8',
        textPrimary: '#1a3d30',
        textSecondary: '#4a7a68',
        textMuted: '#9bbfb0',
        amberWarning: '#EF9F27',
        amberDark: '#BA7517',
        redAlert: '#E24B4A',
        successGreen: '#3B6D11'
      }
    },
  },
  plugins: [],
}
