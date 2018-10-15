module.exports = {
    "settings": {
        "react": {
          "createClass": "createReactClass",
          "pragma": "React",
          "version": "15.0",
          "flowVersion": "0.53"
        },
        "propWrapperFunctions": [ "forbidExtraProps" ]
    },
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    "extends": [
      "eslint:recommended",
      "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "space-before-function-paren": "off",
        "react/prop-types": "off",
        "no-console": 0
    }
};
