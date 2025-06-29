module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'react-app',
    'airbnb',
    'plugin:react/recommended',
    'plugin:prettier/recommended', 
  ],
  plugins: ['react', 'react-hooks', 'prettier'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.jsx'] }],
    'prettier/prettier': ['error'],
    'react/react-in-jsx-scope': 'off', 
  },
}
