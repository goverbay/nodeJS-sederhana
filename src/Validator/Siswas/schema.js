const Joi = require('joi');

const SiswasPayloadSchema = Joi.object({
    nama: Joi.string().required(),
    nis: Joi.string().pattern(/^\d+$/).required(),
    jenis_kelamin: Joi.string().valid('Laki-Laki', 'Perempuan').required(),
    nomor_telepon: Joi.string().pattern(/^\d+$/).required(),
});

module.exports = {
    SiswasPayloadSchema,
};