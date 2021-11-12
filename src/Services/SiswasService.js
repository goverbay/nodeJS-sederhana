const InvariantError = require("../Exceptions/InvariantError");
const models = require("../Models");

class SiswasService{
    constructor(){
        this._models = models;
    }

    async addSiswa({nama, nis, jenis_kelamin, nomor_telepon}, account_id){
        try {
            const result = await this._models.Siswa.create({
                nama,
                nis,
                jenis_kelamin,
                nomor_telpon: nomor_telepon,
                account_id,
            });

            if(!result.id) throw new InvariantError('Siswa tidak dapat ditambahkan');

            return result.id;
        } catch (error) {
            console.log(error);
            throw new Error('Somethings went wrong with the server...');
        }
    }

    async getSiswa(siswaId){
        try {
            const result = this._models.Siswa.findAll({
                where: {
                    id: siswaId,
                },
                include: [
                    {
                        model: this._models.User,
                        attributes: ['email'],
                    },
                ],
            });

            return result;
        } catch (error) {
            console.log(error);
            throw new Error('something wrong in the server');
        }
    }

    async editSiswaById({nama, nis, jenis_kelamin, nomor_telepon}, siswaId){
        try {
            await this._models.Siswa.update({
                nama,
                nis,
                jenis_kelamin,
                nomor_telpon: nomor_telepon,
            }, {
                where: {
                    id: siswaId
                }
            })
        } catch (error) {
            throw new InvariantError('Gagal memperbarui akun siswa');
        }
    }

    async validateUniqueNis(nis, siswaId = null){
        const findSiswa = await this._models.Siswa.findAll({
            where: {
                nis: nis,
            },
        });

        if(!siswaId){
            if(findSiswa[0]) throw new InvariantError('NIS sudah ada yang menggunakan');
        }else{
            if(findSiswa[0].id !== siswaId) throw new InvariantError('NIS sudah ada yang menggunakan');
        }
    }
}

module.exports = SiswasService;