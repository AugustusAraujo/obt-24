module.exports = {
    include: ['src/**'],
    exclude: ['dist/**'],
    transforms: ['typescript', "imports"],
    target: 'es6',
    module: 'commonjs',
    enableLegacyTypeScriptModuleInterop: true,
};
