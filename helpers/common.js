const Joi = require("joi");

module.exports = {
  async validate(object, schema) {
    return new Promise((resolve, reject) => {
      Joi.validate(object, schema, function(err, value) {
        if (err) {
          return reject({
            status: false,
            responseCode: 422,
            message: "validationError",
            error: err
          });
        }
        return resolve(value);
      });
    });
  }
};
