const UsersService = require('../Services/UsersService.js');

const isGuru = async (request, h) => {
    const usersService = new UsersService();

    const {id: userId} = request.auth.credentials;

    const guruId = await usersService.isGuru(userId);

    return guruId;
}

const isGuruMiddleware = {
    method: isGuru,
    assign: "isGuru",
};

module.exports = isGuruMiddleware;