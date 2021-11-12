const SiswasHandler = require("./handler");
const routes = require("./routes");

module.exports = {
    name: 'siswas',
    version: '1.0.0',
    register: (server, {siswasService, usersService, validator}) => {
        const siswasHandler = new SiswasHandler(siswasService, usersService, validator);
        server.route(routes(siswasHandler));
    }
}