const routes = (handler) => [
    {
        method: 'POST',
        path: '/users',
        handler: handler.postUserHandler,
    },
    {
        method: 'GET',
        path: '/users/email/verify/{userId}/{tokenEmail}',
        handler: handler.getVerifyUserEmailHandler,
    }
];

module.exports = routes;