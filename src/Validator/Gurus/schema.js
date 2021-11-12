const Joi = require('joi');

const GuruPayloadSchema = Joi.object({
    nama: Joi.string().required(),
    nip: Joi.string().pattern(/^\d+$/).required(),
    jenis_kelamin: Joi.string().valid('Laki-Laki', 'Perempuan').required(),
    nomor_telepon: Joi.string().pattern(/^\d+$/).required(),
});

module.exports = {
    GuruPayloadSchema,
};