require('dotenv').config();

const Hapi = require('@hapi/hapi');
const models = require('./Models');
const sequelize = require('./Models/config');
const ClientError = require('./Exceptions/ClientError');
const Jwt = require('@hapi/jwt');

//User Plugin
const users = require('./api/Users');
const UsersService = require('./Services/UsersService');
const UsersValidator = require('./Validator/Users');

//Authentications Plugin
const authentications = require('./api/Authentications');
const AuthenticationsService = require('./Services/AuthenticationsService');
const AuthenticationsValidator = require('./Validator/Authentications');
const TokenManager = require('./Tokenize/TokenManager');

//Guru Plugin
const gurus = require('./api/Gurus');
const GuruService = require('./Services/GuruService');
const GuruValidator = require('./Validator/Gurus');

//Siswa Plugin
const siswas = require('./api/Siswas');
const SiswasService = require('./Services/SiswasService');
const SiswasValidator = require('./Validator/Siswas');

//Pelajaran Plugin
const pelajarans = require('./api/Pelajarans');
const PelajaransService = require('./Services/PelajaransService');
const PelajaransValidator = require('./Validator/Pelajarans');

//PelajaranSiswa Plugin
const pelajaransiswa = require('./api/PelajaranSiswas');
const PelajaranSiswaService = require('./Services/PelajaranSiswaService');

const init = async () => {
    const usersService = new UsersService();
    const authenticationsService = new AuthenticationsService();
    const gurusService = new GuruService();
    const pelajaransService = new PelajaransService();
    const siswasService = new SiswasService();
    const pelajaranSiswaService = new PelajaranSiswaService();

    await sequelize.sync();

    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    //registrasi plugin eksternal
    await server.register([
        {
            plugin: Jwt,
        },
    ]);

    //medefinisikan strategy autentikasi jwt
    server.auth.strategy('auth_middleware', 'jwt', {
        keys: process.env.ACCESS_TOKEN_KEY,
        verify: {
            aud: false,
            iss: false,
            sub: false,
            maxAgeSec: process.env.ACCESS_TOKEN_AGE,
        },
        validate: (artifacts) => ({
            isValid: true,
            credentials: {
                id: artifacts.decoded.payload.id,
            },
        }),
    });

    await server.register([
        {
            plugin: users,
            options: {
                service: usersService,
                validator: UsersValidator,
            },
        },
        {
            plugin: authentications,
            options: {
                usersService,
                authenticationsService,
                tokenManager: TokenManager,
                validator: AuthenticationsValidator,
            },
        },
        {
            plugin: gurus,
            options: {
                gurusService,
                usersService,
                validator: GuruValidator,
            }
        },
        {
            plugin: pelajarans,
            options: {
                pelajaransService,
                pelajaranSiswaService,
                validator: PelajaransValidator,
            },
        },
        {
            plugin: siswas,
            options: {
                siswasService,
                usersService,
                validator: SiswasValidator,
            }
        },
        {
            plugin: pelajaransiswa,
            options: {
                pelajaranSiswaService,
                pelajaransService,
            }
        }
    ]);

    server.ext('onPreResponse', (request, h) => {
        const {response} = request;

        if(response instanceof ClientError){
            const newResponse = h.response({
                status: 'fail',
                message: response.message,
            }).code(response.statusCode);
            return newResponse;
        }

        return response.continue || response;
    });

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
}

init();