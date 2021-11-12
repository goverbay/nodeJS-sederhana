const isSiswaMiddleware = require('../../Middleware/isSiswa');

const routes = (handler) => [
    {
        method: 'POST',
        path: '/siswa/pelajaran',
        handler: handler.postPelajaranSiswaHandler,
        options: {
            auth: 'auth_middleware',
            pre: [isSiswaMiddleware],
        },
    },
    {
        method: 'GET',
        path: '/siswa/pelajaran',
        handler: handler.getPelajaranSiswaHandler,
        options: {
            auth: 'auth_middleware',
            pre: [isSiswaMiddleware],
        },
    },
    {
        method: 'DELETE',
        path: '/siswa/pelajaran/{pelajaranId}',
        handler: handler.deletePelajaranSiswaHandler,
        options: {
            auth: 'auth_middleware',
            pre: [isSiswaMiddleware],
        },
    },

];

module.exports = routes;