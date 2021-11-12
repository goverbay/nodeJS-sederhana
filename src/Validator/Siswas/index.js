const InvariantError = require('../../Exceptions/InvariantError');
const {SiswasPayloadSchema} = require('./schema');

const SiswasValidator = {
    validateSiswasPayload: (payload) => {
        const result = SiswasPayloadSchema.validate(payload);
        if(result.error) throw new InvariantError(result.error.message);
    }
}

module.exports = SiswasValidator;