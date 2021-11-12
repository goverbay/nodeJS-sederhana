const isGuruMiddleware = require('../../Middleware/isGuru');

const routes = (handler) => [
    {
        method: 'POST',
        path: '/guru/pelajaran',
        handler: handler.postPelajaranHandler,
        options: {
            auth: 'auth_middleware',
            pre: [isGuruMiddleware],
        },
    },
    {
        method: 'GET',
        path: '/guru/pelajaran',
        handler: handler.getPelajaranHandler,
        options: {
            auth: 'auth_middleware',
            pre: [isGuruMiddleware],
        },
    },
    {
        method: 'GET',
        path: '/guru/pelajaran/{pelajaranId}',
        handler: handler.getPelajaranByIdHandler,
        options: {
            auth: 'auth_middleware',
            pre: [isGuruMiddleware],
        },
    },
    {
        method: 'PUT',
        path: '/guru/pelajaran/{pelajaranId}',
        handler: handler.putPelajaranByIdHandler,
        options: {
            auth: 'auth_middleware',
            pre: [isGuruMiddleware],
        },
    },
    {
        method: 'DELETE',
        path: '/guru/pelajaran/{pelajaranId}',
        handler: handler.deletePelajaranByIdHandler,
        options: {
            auth: 'auth_middleware',
            pre: [isGuruMiddleware],
        },
    },
];

module.exports = routes;