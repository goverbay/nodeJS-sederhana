const verifyUserMiddleware = require('../../Middleware/isVerifyUser');
const isGuruMiddleware = require('../../Middleware/isGuru');

const routes = (handler) => [
    {
        method: 'POST',
        path: '/guru',
        handler: handler.postGuruHandler,
        options: {
            auth: 'auth_middleware',
            pre: [
                verifyUserMiddleware,
            ],
        },
    },
    {
        method: 'PUT',
        path: '/guru',
        handler: handler.putGuruHandler,
        options: {
            auth: 'auth_middleware',
            pre: [
                verifyUserMiddleware,
                isGuruMiddleware,
            ],
        },
    },
    {
        method: 'GET',
        path: '/guru',
        handler: handler.getGuruHandler,
        options: {
            auth: 'auth_middleware',
            pre: [
                verifyUserMiddleware,
                isGuruMiddleware,
            ],
        },
    },
];

module.exports = routes;