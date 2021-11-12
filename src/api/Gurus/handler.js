class GurusHandler{
    constructor(gurusService, usersService, validator){
        this._gurusService = gurusService;
        this._usersService = usersService;
        this._validator = validator;

        this.postGuruHandler = this.postGuruHandler.bind(this);
        this.putGuruHandler = this.putGuruHandler.bind(this);
        this.getGuruHandler = this.getGuruHandler.bind(this);
    }

    async postGuruHandler(request, h){
        this._validator.validateGuruPayload(request.payload);

        const {id: userId} = request.auth.credentials;
        const {nip} = request.payload;

        await this._usersService.isUserRegisterToAccount(userId);
        await this._gurusService.validateUniqueNip(nip);

        const guruId = await this._gurusService.addGuru(request.payload, userId);

        return h.response({
            status: 'success',
            message: 'User guru berhasil dibuat',
            data: {
                guruId,
            },
        });
    }

    async getGuruHandler(request){
        const {isGuru: guruId} = request.pre;

        const profile = await this._gurusService.getGuru(guruId);

        return {
            status: 'success',
            data: {
                profile,
            },
        };
    }

    async putGuruHandler(request){
        this._validator.validateGuruPayload(request.payload);

        const {isGuru: guruId} = request.pre;
        const {nip} = request.payload;

        await this._gurusService.validateUniqueNip(nip, guruId);
        await this._gurusService.editGuru(request.payload, guruId);
    
        return {
            status: 'success',
            message: 'Guru berhasil diperbarui',
        }
    }
}

module.exports = GurusHandler;