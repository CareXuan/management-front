module.exports = {
  mode: 'jit',
  darkMode: 'media',
  purge: {
    content: ['src/**/*.{vue,js,ts,jsx,tsx}']
  },
  theme: {
    color: { primary: '#3B82F6' },
    extend: {
      boxShadow: { debug: '0 0 0 1px red' }
    }
  },
  variants: {},
  plugins: []
}
