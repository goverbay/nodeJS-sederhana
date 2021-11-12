const GurusHandler = require("./handler");
const routes = require("./routes");

module.exports = {
    name: 'gurus',
    version: '1.0.0',
    register: (server, {gurusService, usersService, validator}) => {
        const gurusHandler = new GurusHandler(gurusService, usersService, validator);
        server.route(routes(gurusHandler));
    }
}