const Joi = require('joi');

const PelajaranPayloadSchema = Joi.object({
    nama: Joi.string().required(),
    deskripsi: Joi.string().required(),
});

module.exports = PelajaranPayloadSchema;