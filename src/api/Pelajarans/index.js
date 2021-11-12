const PelajaransHandler = require("./handler");
const routes = require("./routes");

module.exports = {
    name: 'pelajarans',
    version: '1.0.0',
    register: (server, {pelajaransService, pelajaranSiswaService, validator}) => {
        const pelajaransHandler = new PelajaransHandler(pelajaransService, pelajaranSiswaService, validator);
        server.route(routes(pelajaransHandler));
    }
}