class PelajaransHandler{
    constructor(pelajaransService,pelajaranSiswaService, validator){
        this._pelajaransService = pelajaransService;
        this._pelajaranSiswaService = pelajaranSiswaService;
        this._validator = validator;

        this.postPelajaranHandler = this.postPelajaranHandler.bind(this);
        this.getPelajaranHandler = this.getPelajaranHandler.bind(this);
        this.getPelajaranByIdHandler = this.getPelajaranByIdHandler.bind(this);
        this.putPelajaranByIdHandler = this.putPelajaranByIdHandler.bind(this);
        this.deletePelajaranByIdHandler = this.deletePelajaranByIdHandler.bind(this);
    }

    async postPelajaranHandler(request, h){
        this._validator.validatePelajaranPayload(request.payload);

        const {isGuru: guruId} = request.pre

        const pelajaranId = await this._pelajaransService.addPelajaran(request.payload,guruId);

        return h.response({
            status: 'success',
            message: 'Berhasil menambahkan pelajaran',
            data: {
                pelajaranId,
            }
        }).code(201);
    }

    async getPelajaranHandler(request){
        const {isGuru: guruId} = request.pre
        const pelajarans = await this._pelajaransService.getAllPelajaran(guruId);

        return {
            status: 'success',
            data: {
                pelajarans,
            },
        };
    }

    async getPelajaranByIdHandler(request){
        const {isGuru: guruId} = request.pre
        const {pelajaranId} = request.params;

        await this._pelajaransService.verifyPelajaran(pelajaranId, guruId);
        const pelajaran = await this._pelajaransService.getPelajaranById(pelajaranId);

        return {
            status: 'success',
            data: {
                pelajaran
            },
        };
    }

    async putPelajaranByIdHandler(request){
        this._validator.validatePelajaranPayload(request.payload);
        
        const {isGuru: guruId} = request.pre
        const {pelajaranId} = request.params;

        await this._pelajaransService.verifyPelajaran(pelajaranId,guruId);
        await this._pelajaransService.editPelajaranById(pelajaranId, request.payload);

        return {
            status: 'success',
            message: 'Pelajaran berhasil diperbarui',
        };
    }

    async deletePelajaranByIdHandler(request){
        const {isGuru: guruId} = request.pre
        const {pelajaranId} = request.params;

        await this._pelajaransService.verifyPelajaran(pelajaranId,guruId);
        await this._pelajaranSiswaService.deletePelajaranSiswaByIdPelajaran(pelajaranId);
        await this._pelajaransService.deletePelajaranById(pelajaranId);

        return {
            status: 'success',
            message: 'Pelajaran berhasil dihapus',
        }
    }
}

module.exports = PelajaransHandler;