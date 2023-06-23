const JWT = require('jsonwebtoken');

exports.generateJWT = (id) => {
  //codigo asiync y token
  return new Promise((response, reject) => {
    const payload = { id };
    JWT.sign(
      payload,
      process.env.JWT_SECRET_SEED,
      {
        expiresIn: process.env.JWT_EXPIRED,
      },
      function (err, token) {
        //retornador de errores
        if (err) {
          reject(err);
        }
        response(token);
      }
    );
  });
};
