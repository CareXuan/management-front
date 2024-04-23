module.exports = {
  mode: 'jit',
  darkMode: 'media',
  purge: {
    content: ['src/**/*.{vue,js,ts,jsx,tsx}', 'node_modules/@iamgx/el-layout/**/*.{vue,js,ts,jsx,tsx}']
  },
  theme: {
    color: { primary: '#3B82F6' },
    extend: {
      width: { aside: '63px' },
      height: { aside: '63px' },
      colors: { primary: '#1F2124' },
      boxShadow: { debug: '0 0 0 1px red' }
    }
  },
  variants: {},
  plugins: []
}
