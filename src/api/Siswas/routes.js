const verifyUserMiddleware = require('../../Middleware/isVerifyUser');
const isSiswaMiddleware = require('../../Middleware/isSiswa');

const routes = (handler) => [
    {
        method: 'POST',
        path: '/siswa',
        handler: handler.postSiswaHandler,
        options: {
            auth: 'auth_middleware',
            pre: [
                verifyUserMiddleware,
            ],
        },
    },
    {
        method: 'GET',
        path: '/siswa',
        handler: handler.getSiswaHandler,
        options: {
            auth: 'auth_middleware',
            pre: [
                verifyUserMiddleware,
                isSiswaMiddleware,
            ],
        },
    },
    {
        method: 'PUT',
        path: '/siswa',
        handler: handler.putSiswaHandler,
        options: {
            auth: 'auth_middleware',
            pre: [
                verifyUserMiddleware,
                isSiswaMiddleware,
            ],
        },
    },
];

module.exports = routes;