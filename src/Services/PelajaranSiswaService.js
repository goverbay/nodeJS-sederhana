const AuthorizationError = require("../Exceptions/AuthorizationError");
const ClientError = require("../Exceptions/ClientError");
const InvariantError = require("../Exceptions/InvariantError");
const NotFoundError = require("../Exceptions/NotFoundError");
const models = require("../Models");

class PelajaranSiswaService{
    constructor(){
        this._models = models;
    }

    async addPelajaranSiswa(pelajaranId, siswaId){
        try {
            const tanggal_ambil = new Date().toISOString().slice(0, 19).replace('T', ' ');
            const result = await this._models.PelajaranSiswa.create({
                id_pelajaran: pelajaranId,
                id_siswa: siswaId,
                tanggal_ambil,
            });

            if(!result) throw new InvariantError('Gagal mendaftar ke pelajaran');
            return result.id;
        } catch (error) {
            console.log(error);
            throw new InvariantError('Gagal mendaftarkan ke pelajaran');
        }
    }

    async deletePelajaranSiswa(pelajaranId, siswaId){
        try {
            const result = await this._models.PelajaranSiswa.destroy({
                where: {
                    id_pelajaran: pelajaranId,
                    id_siswa: siswaId
                },
            });

            console.log(result);
            if(!result) throw new InvariantError('Gagal menghapus pelajaran');
        } catch (error) {
            console.log(error);
            throw new InvariantError('Gagal menghapus pelajaran');
        }
    }

    async deletePelajaranSiswaByIdPelajaran(pelajaranId){
        try {
            await this._models.PelajaranSiswa.destroy({
                where: {
                    id_pelajaran: pelajaranId,
                }
            });
        } catch (error) {
            throw error
        }
    }

    async uniqueComposite(pelajaranId, siswaId){
        try {
            const findPelajaranSiswa = await this._models.PelajaranSiswa.findAll({
                where: {
                    id_pelajaran: pelajaranId,
                    id_siswa: siswaId,
                }
            });

            if(findPelajaranSiswa[0]) throw new InvariantError('Data sudah pernah didaftarkan');
        } catch (error) {
        }
    }

    async getAllPelajaranSiswa(siswaId){
        try {
            const result = await this._models.Pelajaran.findAll({
                include: [
                    {
                        model: this._models.Guru,
                        attributes: ['nama'],
                    },
                    {
                        model: this._models.Siswa,
                        attributes: ['id'],
                        through: {
                            attributes: ['tanggal_ambil'],
                        },
                        where: {
                            id: siswaId
                        },
                    },
                ],
            });

            return result;
        } catch (error) {
            console.log(error);
            throw new Error('Something wrong i can feel it');
        }
    }
}

module.exports = PelajaranSiswaService;