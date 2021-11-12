const routes = require("./routes");
const PelajaranSiswaHandler = require('./handler');

module.exports = {
    name: 'pelajaransiswa',
    version: '1.0.0',
    register: (server, {pelajaranSiswaService, pelajaransService}) => {
        const pelajaranSiswaHandler = new PelajaranSiswaHandler(pelajaranSiswaService, pelajaransService);
        server.route(routes(pelajaranSiswaHandler));
    }
}