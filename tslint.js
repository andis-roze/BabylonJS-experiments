module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "extends": ["tslint:latest", "tslint-eslint-rules"],
    "rules": {
        "indent": [
            "error",
            4
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ],

        "arrow-parens": false,
        "array-type": false,
        "ban": [
            true,
            ["_", "forEach"],
            ["_", "each"],
            ["Array", "apply"],
        ],
        "interface-name": [true, "never-prefix"],
        "interface-over-type-literal": false,
        "import-spacing": false,
        "ban-types": false,
        "linebreak-style": [true, "LF"],
        "max-classes-per-file": [true, 3],
        "no-angle-bracket-type-assertion": true,
        "no-default-export": { severity: "warning" },
        "no-inferrable-types": true,
        "no-invalid-this": [
            true,
            "check-function-in-method",
        ],
        "no-null-keyword": false,
        "no-object-literal-type-assertion": false,
        "no-require-imports": false,
        "no-string-literal": false,
        "no-switch-case-fall-through": true,
        // "no-use-before-declare": true,
        "no-var-requires": false,
        "object-literal-key-quotes": false,
        "object-literal-sort-keys": false,
        "ordered-imports": false,
        "prefer-for-of": true,
        "prefer-conditional-expression": false,
        "space-in-parens": [true, "never"],
        "triple-equals": [
            true,
            "allow-null-check",
            "allow-undefined-check",
        ],
        "variable-name": [
            true,
            "check-format",
            "allow-leading-underscore",
            "ban-keywords",
            "allow-pascal-case",
        ],
        "no-constant-condition": true,
        "no-control-regex": true,
        "no-duplicate-case": true,
        "no-empty-character-class": true,
        "no-empty-interface": false,
        "no-ex-assign": true,
        "no-extra-boolean-cast": true,
        "no-extra-semi": false,
        "no-inner-declarations": [
            true,
            "both",
        ],
        "no-invalid-regexp": true,
        "no-irregular-whitespace": true,
        "no-regex-spaces": true,
        "no-sparse-arrays": true,
        "no-unexpected-multiline": true,
        "space-before-function-paren": false,
        "valid-typeof": true,
        "array-bracket-spacing": [
            true,
            "never",
        ],
        "block-spacing": [
            true,
            "always",
        ],
        "brace-style": [
            true,
            "1tbs",
            {
                "allowSingleLine": true,
            },
        ],
        "object-curly-spacing": [
            true,
            "always",
        ],
        semicolon: [true, "always", "ignore-bound-class-methods"],
        "max-line-length": false,
        "trailing-comma": false,
        "object-literal-shorthand": false,
    },
};
