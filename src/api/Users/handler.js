class UsersHandler{
    constructor(service, validator){
        this._service = service;
        this._validator = validator;

        this.postUserHandler = this.postUserHandler.bind(this);
        this.getVerifyUserEmailHandler = this.getVerifyUserEmailHandler.bind(this);
    }

    async postUserHandler(request, h){
        this._validator.validateUsersPayload(request.payload);

        const {email} = request.payload;

        await this._service.validateUniqueEmail(email);
        const userId = await this._service.addUser(request.payload);

        return h.response({
            status: 'success',
            message: 'User berhasil ditambahkan',
            data: {
                userId,
            },
        }).code(201);
    }

    async getVerifyUserEmailHandler(request){
        const {userId, tokenEmail} = request.params;

        await this._service.verifyEmail(userId, tokenEmail);

        return {
            status: 'success',
            message: 'Email berhasil di verifikasi',
        }
    }
}

module.exports = UsersHandler;