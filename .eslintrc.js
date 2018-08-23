module.exports = {
    "env": {
        "browser": false,
        "commonjs": true,
        "es6": true,
        "node":true,
    },
    "parser":"babel-eslint",
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2016
    },
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
            "always"
        ],
        "no-console":[
            "warn",{
                "allow":["warn","error","info"]
              }
            ]
        
    }
};