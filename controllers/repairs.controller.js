const RepairsModel = require('../models/repairs.models');
const catchAsync = require('../util/catchAsync');
const UsersModel = require('../models/users.model');

exports.findByRepairs = catchAsync(async (req, res, next) => {
  const repairs = await RepairsModel.findAll({
    where: {
      status: 'pending',
    },
    attributes: { exclude: ['createAt', 'updateAt'] },
    include: {
      model: UsersModel,
      attributes: ['name', 'email', 'role'],
    },
  });
  return res.status(200).json({
    message: 'All repairs have been found👌',
    status: 'success',
    Result: repairs.length,
    repairs,
  });
});

exports.createByRepairs = catchAsync(async (req, res, next) => {
  const { activeUser } = req;
  const { date, motorsNumber, description } = req.body;
  const repair = await RepairsModel.create({
    date,
    motorsNumber,
    description,
    userid: activeUser.id,
  });

  return res.status(200).json({
    message: 'A repair has been created for the user with',
    status: 'success',
    repair: {
      id: repair.id,
      status: 'success',
      date: repair.date,
      motorsNumber: repair.motorsNumber,
      description: repair.description,
      userid: repair.userid,
    },
  });
});

exports.findARepairs = catchAsync(async (req, res, next) => {
  const { repair } = req;

  return res.status(200).json({
    status: 'success',
    message: `Found repair with id ${repair.id}😁`,
    repair,
  });
});

exports.updateARepairs = catchAsync(async (req, res, netx) => {
  const { repair } = req;
  await repair.update({
    status: 'complete',
  });
  return res.status(200).json({
    status: 'success',
    message: `Updated status of repair id: ${repair.id}to completed😁👌.`,
  });
});

exports.deleteARepairs = catchAsync(async (req, res, next) => {
  const { repair } = req;
  repair.update({
    status: 'terminated',
  });
  return res.status(200).json({
    status: 'success',
    message: `The repair record with id: ${repair.id} has been deleted👌`,
  });
});
