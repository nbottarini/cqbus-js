module.exports = {
    testEnvironment: 'node',
    transform: {
        '^.+\\.(js|ts)$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'ts'],
    testRegex: '/test/(.*)\\.test\\.(ts|js)$',
};
