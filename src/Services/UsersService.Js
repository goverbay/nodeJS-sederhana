const models = require('../Models/index');
const InvariantError = require('../Exceptions/InvariantError');
const NotFoundError = require('../Exceptions/NotFoundError');
const AuthenticationError = require('../Exceptions/AuthenticationError');
const AuthorizationError = require('../Exceptions/AuthorizationError');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const sendEmail = require('../utils/sendMail');

class UsersService{
    constructor(){
        this._userModel = models.User;
    }

    async addUser({email,password}){
        const hashedPassword = await bcrypt.hash(password,10);
        const token_email = crypto.randomBytes(32).toString("hex");
        const result = await this._userModel.create({
            email,
            password: hashedPassword,
            token_email,
        });

        if(!result.id) throw new InvariantError('Gagal menambahkan user');

        const msg = `<a href="http://${process.env.HOST}:${process.env.PORT}/users/email/verify/${result.id}/${token_email}">Verif Email</a>`;
        await sendEmail(email,'Email Verification',msg);

        return result.id
    }

    async validateUniqueEmail(email, owner = null){
        const findEmail = await this._userModel.findAll({
            where: {
                email: email,
            },
        });

        if(!owner){
            if(findEmail[0]) throw new InvariantError('Email sudah ada yang menggunakan');
        }else{
            if(findEmail[0].id !== owner) throw new InvariantError('Email tidak dapat digunakan');
        }
    }

    async verifyEmail(userId, token){
        const result = await this._userModel.findAll({
            where: {
                id: userId,
                token_email: token,
            }
        });

        if(!result[0]) throw new AuthenticationError('Verifikasi gagal dilakukan. Token tidak sesuai');

        await this._userModel.update({
            is_email_verified: 1,
        }, {
            where: {
                id: userId
            }
        });
    }

    async addLastLogin(userId){
        const result = await this._userModel.update({
            last_login: new Date().toISOString().slice(0, 19).replace('T', ' '),
        },{
            where: {
                id: userId,
            }
        });

        if(!result) throw NotFoundError('User tidak ditemukan');
    }

    async verifyUserCredential(email,password){
        const findUser = await this._userModel.findAll({
            where: {
                email: email,
            },
        });

        if(!findUser[0]) throw new AuthenticationError('Email yang dimasukkan salah');

        const {id, password: hashedPassword} = findUser[0];

        const match = await bcrypt.compare(password, hashedPassword);

        if(!match) throw new AuthenticationError('Password yang dimasukkan salah');

        return id;
    }

    async verifyUser(userId){
        const findUser = await this._userModel.findAll({
            where: {
                id: userId,
            },
        });

        if(!findUser[0]) throw new NotFoundError('User tidak ditemukan');
        if(!findUser[0].is_email_verified) throw new AuthorizationError('Silahkan verify email terlebih dahulu');
    }

    async isUserRegisterToAccount(userId){
        const findUserInGuru = await models.Guru.findAll({
            where: {
                account_id: userId,
            }
        });

        const findUserInSiswa = models.Siswa.findAll({
            where: {
                accound_id: userId,
            }
        });
        
        if(findUserInGuru[0]) throw new AuthenticationError('User telah terdaftar sebagai guru');
        if(findUserInSiswa[0]) throw new AuthenticationError('User telah terdaftar sebagai siswa');
    }

    async isGuru(userId){
        const findGuru = await models.Guru.findAll({
            where: {
                account_id: userId,
            },
        });

        if(!findGuru[0]) throw new AuthorizationError('Anda tidak memiliki hak akses');
        return findGuru[0].id;
    }

    async isSiswa(userId){
        const findSiswa = await models.Siswa.findAll({
            where: {
                account_id: userId
            }
        });

        if(!findSiswa[0]) throw new AuthorizationError('Anda tidak memiliki hak akses');
        return findSiswa[0].id;
    }
}

module.exports = UsersService;