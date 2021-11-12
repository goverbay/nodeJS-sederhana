const {
    postAuthenticationsSchema,
    putAuthenticationsSchema,
    deleteAuthenticationsSchema,
} = require('./shcema');
const InvariantError = require('../../Exceptions/InvariantError');

const AuthenticationsValidator = {
    postValidateAuthenticationPayload: (payload) => {
        const result = postAuthenticationsSchema.validate(payload);
        if(result.error) throw new InvariantError(result.error.message);
    },
    putValidateAuthenticationPayload: (payload) => {
        const result = putAuthenticationsSchema.validate(payload);
        if(result.error) throw new InvariantError(result.error.message);
    },
    deleteValidateAuthenticationPayload: (payload) => {
        const result = deleteAuthenticationsSchema.validate(payload);
        if(result.error) throw new InvariantError(result.error.message);
    }
}

module.exports = AuthenticationsValidator;