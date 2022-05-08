const requestMethods = require('./requestMethods');
const bodyParser = require('./bodyParser');
const corsAccess = require('./cors');

const middlewares = (app) => {
    app.use(requestMethods);
    app.use(corsAccess);
    app.use(bodyParser);
};

module.exports = middlewares;