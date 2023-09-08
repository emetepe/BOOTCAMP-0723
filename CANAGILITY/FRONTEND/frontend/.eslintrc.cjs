module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard',
    'plugin:react/recommended'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: [
        '.eslintrc.{js,cjs}'
      ],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
  }
}

module.exports = {
  "extends": ["airbnb", "prettier"],
  plugins: ['react', 'prettier'],
  rules: {
    "prettier/prettier": ["error"],
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }]
  },
};

rules: {
  'prettier/prettier': [
  'error',
     {
       singleQuote: true,
       trailingComma: 'none',
       arrowParens: 'avoid',
       semi: false
    }
  ],
  'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }]
}



