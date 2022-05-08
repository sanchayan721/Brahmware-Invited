const bodyParser = (req, res, next) => {
  const contentType = req.headers["content-type"];

  if (contentType && contentType === "application/x-www-form-urlencoded") {
    return require("body-parser").urlencoded({ extended: true })(req, res, next);
  }

  return require("body-parser").json()(req, res, next);
};

module.exports = bodyParser;