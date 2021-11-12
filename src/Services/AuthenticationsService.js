const models = require("../models");

class AuthenticationsService{
    constructor(){
        this._models = models;
    }

    async addRefreshToken(token){
        await this._models.Authentication.create({
            token,
        });
    }

    async verifyRefreshToken(token){
        const findToken = await this._models.Authentication.findAll({
            where: {
                token: token
            },
        });

        if(!findToken[0]) throw new InvariantError('Token tidak dapat ditemukan, silahkan login kembali');
    }

    async deleteRefreshToken(token){
        await this.verifyRefreshToken(token);
        await this._models.Authentication.destroy({
            where: {
                token: token
            },
        });
    }
}

module.exports = AuthenticationsService;