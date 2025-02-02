module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    overrides: [
        {
            files: ['*.ts', '*.tsx'], // Your TypeScript files extension
            extends: [
                // 'plugin:@typescript-eslint/recommended',
                // 'plugin:@typescript-eslint/recommended-requiring-type-checking',
            ],

            parserOptions: {
                project: ['./tsconfig.json'], // Specify it only for TypeScript files
            },
            rules: {
                camelcase: 'warn'
            },
        },
    ],
}
