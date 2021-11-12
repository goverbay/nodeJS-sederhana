const UsersService = require('../Services/UsersService');

const isSiswa = async (request) => {
    const usersService = new UsersService();

    const {id: userId} = request.auth.credentials;

    const siswaId = await usersService.isSiswa(userId);

    return siswaId;
}

const isSiswaMiddleware = {
    method: isSiswa,
    assign: "isSiswa",
};

module.exports = isSiswaMiddleware;