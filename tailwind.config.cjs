// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'hero-gradient':
          'linear-gradient(135deg, #0d6efd 0%, #3b82f6 45%, #7dd3fc 100%)',
      },
    },
  },
  plugins: [],
}
