module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        "object-curly-spacing": [
            "error", 
            "always",
            { 
                "arraysInObjects": false,
                "objectsInObjects": false 
            }
        ],
        "array-bracket-spacing": [
            "error", 
            "always",
            { 
                "objectsInArrays": false, 
                "arraysInArrays": false 
            }
        ],
        "computed-property-spacing": [
            "error", 
            "always"
        ],
    }
};