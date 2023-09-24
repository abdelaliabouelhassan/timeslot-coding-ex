module.exports = {
  plugins: {
    'postcss-import': {},
    tailwindcss: {},
    autoprefixer: {},
    'postcss-pxtorem': {
      propList: ['*', '!letter-spacing'],
    },
  },
}
