const InvariantError = require('../../Exceptions/InvariantError');
const {UsersPayloadSchema} = require('./schema');

const UsersValidator = {
    validateUsersPayload: (payload) => {
        const result = UsersPayloadSchema.validate(payload);
        if(result.error) throw new InvariantError(result.error.message);
    },
};

module.exports = UsersValidator;