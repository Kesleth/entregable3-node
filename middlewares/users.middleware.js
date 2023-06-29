const UsersModel = require('../models/users.model');
const errorApp = require('../util/errorApp');
const catchAsync = require('../util/catchAsync');
const RepairModel = require('../models/repairs.models');

exports.validUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await UsersModel.findOne({
    where: {
      id,
      status: 'available',
    },
    attributes: ['id', 'name', 'email', 'role'],
    include: {
      model: RepairModel,
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

exports.fetchRepairById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const repair = await RepairModel.findOne({
    where: {
      id,
    },
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: {
      model: UsersModel,
      attributes: ['name', 'email', 'role'],
    },
  });

  if (!repair) {
    return next(new errorApp('Repair not found', 404));
  }

  if (repair.status !== 'pending') {
    return next(
      new errorApp(
        `The repair has already been ${repair.status}. Modifying it is not allowed.`
      )
    );
  }

  req.repair = repair;
  next();
});
