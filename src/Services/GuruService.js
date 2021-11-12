const models = require("../models");
const InvariantError = require('../Exceptions/InvariantError');

class GuruService{
    constructor(){
        this._models = models;
    }

    async addGuru({nama, nip, jenis_kelamin, nomor_telepon}, account_id){
        try {
            const result = await this._models.Guru.create({
                nama,
                nip,
                jenis_kelamin,
                nomor_telpon: nomor_telepon,
                account_id,
            });
    
            if(!result.id) throw new InvariantError('Guru tidak dapat ditambahkan');
    
            return result.id;
    
        } catch (error) {
            console.log(error)
            throw new Error('Somethings wrong with the server...');
        }
    }

    async getGuru(guruId){
        try {
            const result = await this._models.Guru.findAll({
                where: {
                    id: guruId
                },
                include: {
                    model: this._models.User,
                    attributes: ['email'],
                },
            });
            return result
        }catch (error) {
            throw new Error('Something wrong in the server...');
        }
    }

    async editGuru({nama, nip, jenis_kelamin, nomor_telepon}, guruId){
        try {
            await this._models.Guru.update({
                nama,
                nip,
                jenis_kelamin,
                nomor_telpon: nomor_telepon,
            }, {
                where: {
                    id: guruId
                }
            })
        } catch (error) {
            throw new InvariantError('Gagal memperbarui akun guru');
        }
    }

    async validateUniqueNip(nip, guruId = null){
        const findGuru = await this._models.Guru.findAll({
            where: {
                nip: nip
            }
        });

        if(!guruId){
            if(findGuru[0]) throw new InvariantError('NIP sudah ada yang menggunakan');
        }else{
            if(findGuru[0]){
                if(findGuru[0].id !== guruId) throw new InvariantError('NIP sudah ada yang menggunakan');
            }
        }
    }
}

module.exports = GuruService;