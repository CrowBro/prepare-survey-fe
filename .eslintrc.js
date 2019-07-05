module.exports = {
    parser: "@typescript-eslint/parser",
    extends: ["plugin:@typescript-eslint/recommended", "react-app"],
    plugins: ["@typescript-eslint", "react", "react-hooks"],
    rules: {
        "@typescript-eslint/explicit-function-return-type": "off",
        "quotes": ["error", "double"],
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn"
    }
};