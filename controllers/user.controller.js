const catchAsync = require('../util/catchAsync');
const ErrorApp = require('../util/errorApp');
const { generateJWT } = require('../util/JWT');
const UsersModel = require('./../models/users.model');
const bcrypt = require('bcryptjs');

exports.findByUsers = catchAsync(async (req, res, next) => {
  const users = await UsersModel.findAll({
    where: {
      status: 'available',
    },
    attributes: {
      exclude: ['status', 'password'],
    },
  });
  return res.json({
    status: 'success',
    results: users.length,
    users,
  });
});

exports.createByUser = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const findUser = await UsersModel.findOne({
    where: {
      email,
    },
  });
  if (findUser) {
    return res.status(409).json({
      message: `the user ${email} already exist`,
      status: 'error',
    });
  }
  //Salting y hashing de contraseñas
  const salt = await bcrypt.genSalt(14);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await UsersModel.create({
    name: name.toLowerCase(),
    email: email.toLowerCase(),
    password: hashedPassword,
    role,
  });
  const token = await generateJWT(user.id);
  return res.status(201).json({
    message: 'User created successfully👍',
    status: 'success',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  });
});

//findAUser busca y devuelve un usuario junto con un mensaje de éxito.👌
exports.findAUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  return res.status(200).json({
    status: 'success',
    massage: 'User identified👌',
    user,
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { name, email } = req.body;

  // if (!name || !email) {
  //   return res.status(400).json({
  //     status: 'error',
  //     message: 'Name and email are required fields.',
  //   });
  // }

  // if (!email.includes('@') || !email.includes('.', email.indexOf('@'))) {
  //   return res.status(400).json({
  //     status: 'error',
  //     message: 'Invalid email format.',
  //   });
  // }

  const UserOne = await user.update({ name, email });

  return res.status(200).json({
    status: 'success',
    message: `Update successful for user with email ${email} 🎉`,
    UserOne,
  });
});

exports.deleteAUser = catchAsync(async (req, res, netx) => {
  const { user } = req;
  await user.update({ status: 'disabled' });
  return res.status(200).json({
    status: 'success',
    message: `${user.name} has been successfully deleted💣`,
  });
});

exports.loginAUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await UsersModel.findOne({
    where: {
      status: 'available',
      email,
    },
  });

  if (!user) return next(new ErrorApp('user does not exits', 404));

  if (!(await bcrypt.compare(password, user.password))) {
    return next(new ErrorApp('Invalid password', 401));
  }

  const token = await generateJWT(user.id);

  return res.status(200).json({
    status: 'success',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      repairs: user.repairs,
    },
  });
});
