const PelajaranPayloadSchema = require('./schema');
const InvariantError = require('../../Exceptions/InvariantError');

const PelajaranValidator = {
    validatePelajaranPayload: (payload) => {
        const result = PelajaranPayloadSchema.validate(payload);
        if(result.error) throw new InvariantError(result.error.message);
    }
}

module.exports = PelajaranValidator;