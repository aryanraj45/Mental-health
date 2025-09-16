/** @type {import('tailwindcss').Config} */
module.exports = {
  // ... your existing config
  theme: {
    extend: {
      // ... your existing extend settings
      colors: {
        'neon-primary': 'hsl(var(--primary))',
      },
      dropShadow: {
        'glow-primary': '0 0 12px hsla(var(--primary), 0.6)',
        'glow-primary-sm': '0 0 6px hsla(var(--primary), 0.5)',
      },
      keyframes: {
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.15)' },
        },
      },
      animation: {
        heartbeat: 'heartbeat 1.5s ease-in-out infinite',
      },
    },
  },
  // ... your existing plugins
}