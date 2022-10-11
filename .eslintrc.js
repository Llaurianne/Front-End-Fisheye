module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        "no-unused-vars": "off"
    },
    "globals": {
        "main": "readonly",
        "mainHeader": "readonly",
        "manageContactForm": "readonly",
        "manageLightbox": "readonly",
        "mediaDOMArray": "readonly",
        "mediaFactory": "readonly",
        "module": "readonly",
        "photographerFactory": "readonly",
        "photographerDatas": "readonly"
    }
}
