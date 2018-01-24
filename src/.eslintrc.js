module.exports = {
    extends: "airbnb",
    parser: "babel-eslint",
    rules:{
      semi: ["error", "never"],
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
      "no-underscore-dangle": [2, { "allow": ["_fields"] }],
      "jsx-quotes": [2, "prefer-single"],
    },
    env: {
      "es6": true,
      "jasmine": true,
      "jest": true,
    },
  }
  
  