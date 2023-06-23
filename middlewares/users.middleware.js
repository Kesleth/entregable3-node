const UsersModel = require('../models/users.model');
const errorApp = require('../util/errorApp');
const catchAsync = require('../util/catchAsync');

exports.validUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await UsersModel.findOne({
    where: {
      id,
      status: 'available',
    },
  });
  if (!user) {
    return next(
      new errorApp(`User with id:${id} was not found :pensativo:`, 404)
    );
  }
  req.user = user;
  next();
});
