const boom = require('@hapi/boom');

function validatorHandler(schema, property) {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req[property], { abortEarly: false });
      next();
    } catch (error) {
      next(boom.badRequest(error));
    }
  };
}

module.exports = validatorHandler;
