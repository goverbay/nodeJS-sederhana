class AuthenticationsHandler{
    constructor(authenticationsService, usersService, tokenManager, validator){
        this._authenticationsService = authenticationsService;
        this._usersService = usersService;
        this._tokenManager = tokenManager;
        this._validator = validator;

        this.postAuthenticationHandler = this.postAuthenticationHandler.bind(this);
        this.putAuthenticationHandler = this.putAuthenticationHandler.bind(this);
        this.deleteAuthenticationHandler = this.deleteAuthenticationHandler.bind(this);
    }

    async postAuthenticationHandler(request, h){
        this._validator.postValidateAuthenticationPayload(request.payload);
        
        const {email,password} = request.payload;

        const id = await this._usersService.verifyUserCredential(email, password);

        const accessToken = this._tokenManager.generateAccessToken({id});
        const refreshToken = this._tokenManager.generateRefreshToken({id});

        await this._authenticationsService.addRefreshToken(refreshToken);
        await this._usersService.addLastLogin(id);

        return h.response({
            status: 'success',
            message: 'Authentication berhasil ditambahkan',
            data: {
                accessToken,
                refreshToken,
            }
        }).code(201);
    }

    async putAuthenticationHandler(request){
        this._validator.putValidateAuthenticationPayload(request.payload);
        
        const {refreshToken} = request.payload;

        await this._authenticationsService.verifyRefreshToken(refreshToken);
        const {id} = this._tokenManager.verifyRefreshToken(refreshToken);
        
        const accessToken = this._tokenManager.generateAccessToken(id);

        return {
            status: 'success',
            message: 'Acess Token berhasil diperbarui',
            data: {
                accessToken,
            },
        };
    }

    async deleteAuthenticationHandler(request){
        this._validator.deleteValidateAuthenticationPayload(request.payload);
        
        const {refreshToken} = request.payload;

        await this._authenticationsService.deleteRefreshToken(refreshToken);

        return {
            status: 'success',
            message: 'Refresh token berhasil dihapus',
        }
    }
}

module.exports = AuthenticationsHandler;