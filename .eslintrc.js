module.exports = {
  extends: "airbnb",
  parser: "babel-eslint",
  rules:{
    semi: ["error", "never"],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "no-underscore-dangle": [2, { "allow": ["_fields","_source","_id"] }],
    "jsx-quotes": [2, "prefer-single"],
    "arrow-parens": [0, "as-needed"],
    "jsx-a11y/label-has-for": [ 2, {
      "components": [ "label" ],
      "required": {
          "some": [ "nesting", "id" ]
      },
      "allowChildren": false,
  }],
  },
  env: {
    "es6": true,
    "jasmine": true,
    "jest": true,
    "browser": true,
  },
}

