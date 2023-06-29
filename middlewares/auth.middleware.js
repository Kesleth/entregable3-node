const UsersModel = require('../models/users.model');
const catchAsync = require('../util/catchAsync');
const jwt = require('jsonwebtoken');
const ErrorApp = require('../util/errorApp');

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET_SEED, (err, decodedToken) => {
      if (err) {
        reject(new ErrorApp(`${err.message}`, 400));
      }
      resolve(decodedToken);
    });
  });
};

exports.authenticate = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  console.log(token);

  if (!token) {
    return next(new ErrorApp('you need to be login to this action', 403));
  }

  const decoded = await verifyToken(token);

  const user = await UsersModel.findOne({
    where: {
      id: decoded.id,
      status: 'available',
    },
  });

  if (!user) {
    return next(
      new errorApp('The owner of this token is no longer available', 401)
    );
  }

  req.sessionUser = user;
  next();
});

exports.ensureAccountOwner = catchAsync(async (req, res, next) => {
  const { sessionUser, user } = req;

  if (sessionUser.id !== user.id) {
    return next(new errorApp('You are not the owner of this account', 403));
  }

  next();
});

exports.restrictedAccess = (roles) => {
  return (req, res, next) => {
    const { sessionUser } = req;

    if (!roles.includes(sessionUser.role)) {
      return next(new errorApp('Unauthorized to perform this action', 403));
    }

    next();
  };
};
