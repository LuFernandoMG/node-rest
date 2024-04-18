// We create the middleware function
function logErrors (err, req, res, next) {
  // eslint-disable-next-line no-console
  console.error(err); // Show the error in the console
  next(err); // Call the next middleware
}

// eslint-disable-next-line no-unused-vars
function errorHandler (err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

function boomErrorHandler (err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {  
    next(err);
  }
}


module.exports = { logErrors, errorHandler, boomErrorHandler };