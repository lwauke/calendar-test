module.exports = {
    env: {
      browser: true,
    },
    extends: [
      'plugin:vue/essential'
    ],
    plugins: [
      'vue'
    ],
    rules: {
      'generator-star-spacing': 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    },
    overrides: [
      {
        files: ['src/**/*.vue'],
        rules: {
          'vue/multi-word-component-names': 0,
        },
      },
    ],
  }