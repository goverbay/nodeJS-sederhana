class PelajaranSiswaHandler{
    constructor(pelajaranSiswaService, pelajaransService){
        this._pelajaranSiswaService = pelajaranSiswaService;
        this._pelajaransService = pelajaransService;

        this.postPelajaranSiswaHandler = this.postPelajaranSiswaHandler.bind(this);
        this.getPelajaranSiswaHandler = this.getPelajaranSiswaHandler.bind(this);
        this.deletePelajaranSiswaHandler = this.deletePelajaranSiswaHandler.bind(this);
    }

    async postPelajaranSiswaHandler(request, h){
        const {isSiswa: siswaId} = request.pre;

        const {pelajaranId} = request.payload;

        await this._pelajaransService.checkPelajaranById(pelajaranId);

        await this._pelajaranSiswaService.uniqueComposite(pelajaranId,siswaId);
        const pelajaranSiswaId = await this._pelajaranSiswaService.addPelajaranSiswa(pelajaranId,siswaId);

        return h.response({
            status: 'success',
            message: 'Berhasil menambahkan pelajaran',
            data: {
                pelajaranSiswaId,
            },
        }).code(201);
    }

    async getPelajaranSiswaHandler(request){
        const {isSiswa: siswaId} = request.pre;

        const pelajaransSiswas = await this._pelajaranSiswaService.getAllPelajaranSiswa(siswaId);

        return {
            status: 'success',
            data: {
                pelajaransSiswas,
            }
        }
    }

    async deletePelajaranSiswaHandler(request){
        const {isSiswa: siswaId} = request.pre;
        const {pelajaranId} = request.params
        
        await this._pelajaransService.checkPelajaranById(pelajaranId);
        await this._pelajaranSiswaService.deletePelajaranSiswa(pelajaranId,siswaId);
        
        return {
            status: 'success',
            message: 'Pelajaran berhasil dihapus',
        }
    }
}

module.exports = PelajaranSiswaHandler;