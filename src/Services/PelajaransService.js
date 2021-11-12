const models = require("../models");
const {nanoid} = require('nanoid');
const InvariantError = require("../Exceptions/InvariantError");
const NotFoundError = require("../Exceptions/NotFoundError");
const AuthorizationError = require("../Exceptions/AuthorizationError");

class PelajaransService{
    constructor(){
        this._models = models;
    }

    async addPelajaran({nama,deskripsi}, guruId){
        try {
            const kode = `pljr-${nanoid(4)}`;

            const result = await this._models.Pelajaran.create({
                nama,
                kode,
                deskripsi,
                id_guru: guruId,
            });
    
            if(!result.id) throw new InvariantError('Gagal menambahkan pelajaran');
    
            return result.id
    
        } catch (error) {
            console.log(error)
            throw new Error('Somethings wrong in the server :(');
        }
    }

    async getAllPelajaran(guruId){
        try {
            const pelajarans = await this._models.Pelajaran.findAll({
                attributes: ['id','nama','kode'],
                where: {
                    id_guru: guruId,
                },
                include: [
                    {
                        model: this._models.Guru,
                        attributes: ['nama'],
                    },
                ],
            });
    
            return pelajarans;
    
        } catch (error) {
            console.log(error);
            throw new Error('Somethings goes wrong in the server :(');
        }
    }

    async getPelajaranById(pelajaranId){
        const pelajaran = await this._models.Pelajaran.findAll({
            where: {
                id: pelajaranId,
            },
            include: [
                {
                    model: this._models.Guru,
                    attributes: ['nama'],
                },
                {
                    model: this._models.Siswa,
                    attributes: ['nama'],
                    through: {
                        attributes: [],
                    },
                },
            ],
        });

        return pelajaran[0]
    }

    async checkPelajaranById(pelajaranId){
        const result = await this.getPelajaranById(pelajaranId);

        if(!result) throw new NotFoundError('Pelajaran tidak dapat ditemukan');
    }

    async editPelajaranById(pelajaranId, {nama,deskripsi}){
        try {
            const result = await this._models.Pelajaran.update({
                nama: nama,
                deskripsi: deskripsi,
            },{
                where: {
                    id: pelajaranId,
                }
            });
    
            if(!result) throw new InvariantError('Gagal memperbarui pelajaran');    
        } catch (error) {
            console.log(error);
            throw new Error('Something wrong with the server :(');
        }
    }

    async deletePelajaranById(pelajaranId){
        const result = await this._models.Pelajaran.destroy({
            where: {
                id: pelajaranId,
            },
        });

        if(!result) throw new InvariantError('Gagal menghapus pelajaran');
    }

    async verifyPelajaran(pelajaranId,guruId){
        const result = await this._models.Pelajaran.findAll({
            where: {
                id: pelajaranId,
            }
        });

        if(!result[0]) throw new NotFoundError('Tidak dapat menemukan pelajaran');
        if(result[0].id_guru !== guruId) throw new AuthorizationError('Tidak memiliki hak akses untuk pelajaran ini');
    }
}

module.exports = PelajaransService;