const indexRoutes = require('express').Router();

indexRoutes.use("/createmeeting", require('./createmeeting'));
indexRoutes.use('/joinmeeting', require('./joinmeeting'));

module.exports = indexRoutes;
