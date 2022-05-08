const cors = require('cors');
const settings = require('../config/settings');

const urlsAllowedToAccess =
  Object.entries(settings.urls || {}).map(([key, value]) => value) || [];

const configuration = {
  /* credentials: true, */
  origin: function (origin, callback) {
    if (!origin || urlsAllowedToAccess.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`${origin} not permitted by CORS policy.`));
    }
  },
};

const corsAccess = (req, res, next) => {
  return cors(configuration)(req, res, next);
};

module.exports = corsAccess;