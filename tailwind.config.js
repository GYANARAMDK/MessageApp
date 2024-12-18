/** @type {import('tailwindcss').Config} */
import { plugin as shadcnPlugin } from '@shadcn/ui'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      zIndex: {
        '51': '51',
        'max': '9999',
      },
    },
  },
  plugins: [shadcnPlugin()],
}