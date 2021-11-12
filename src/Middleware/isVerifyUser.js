const UsersService = require('../Services/UsersService.js');

const verifyUser = async (request, h) => {
    const usersService = new UsersService();

    const {id: userId} = request.auth.credentials

    await usersService.verifyUser(userId);

    return h.continue
}

const verifyUserMiddleware = {
    method: verifyUser,
    assign: "verifyUser",
};

module.exports = verifyUserMiddleware;