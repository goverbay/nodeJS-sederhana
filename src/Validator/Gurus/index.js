const InvariantError = require('../../Exceptions/InvariantError');
const {GuruPayloadSchema} = require('./schema');

const GuruValidator = {
    validateGuruPayload: (payload) => {
        const result = GuruPayloadSchema.validate(payload);
        if(result.error) throw new InvariantError(result.error.message);
    }
}

module.exports = GuruValidator;