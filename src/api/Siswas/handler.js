class SiswasHandler{
    constructor(siswasService, usersService, validator){
        this._siswasService = siswasService;
        this._usersService = usersService;
        this._validator = validator;

        this.postSiswaHandler = this.postSiswaHandler.bind(this);
        this.getSiswaHandler = this.getSiswaHandler.bind(this);
        this.putSiswaHandler = this.putSiswaHandler.bind(this);
    }

    async postSiswaHandler(request, h){
        this._validator.validateSiswasPayload(request.payload);

        const {id: userId} = request.auth.credentials;
        const {nis} = request.payload;

        await this._usersService.isUserRegisterToAccount(userId);
        await this._siswasService.validateUniqueNis(nis);

        const siswaId = await this._siswasService.addSiswa(request.payload, userId);

        return h.response({
            status: 'success',
            message: 'User siswa berhasil dibuat',
            data: {
                siswaId,
            },
        });
    }

    async getSiswaHandler(request){
        const {isSiswa: siswaId} = request.pre

        const profile = await this._siswasService.getSiswa(siswaId);

        return {
            status: 'success',
            data: {
                profile,
            }
        }
    }

    async putSiswaHandler(request){
        this._validator.validateSiswasPayload(request.payload);

        const {isSiswa: siswaId} = request.pre;
        const {nis} = request.payload;

        await this._siswasService.validateUniqueNis(nis,siswaId);
        await this._siswasService.editSiswaById(request.payload, siswaId);

        return {
            status: 'success',
            message: 'Data siswa berhasil diperbarui',
        }
    }
}

module.exports = SiswasHandler;