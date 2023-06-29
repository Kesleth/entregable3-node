const express = require('express');
const userController = require('./../controllers/user.controller');
const {
  findByUsers,
  createByUser,
  loginAUser,
  findAUser,
  updateUser,
  deleteAUser,
} = userController;

const userMiddleware = require('../middlewares/users.middleware');
const validationMiddleware = require('../middlewares/validationMiddleware');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();

router
  .route('/')
  .get(findByUsers)
  .post(validationMiddleware.userValidation, createByUser);

router.route('/login').post(validationMiddleware.validLogin, loginAUser);

router
  .route('/:id')
  .get(userMiddleware.validUser, findAUser)
  .patch(
    validationMiddleware.validUpdate,
    authMiddleware.authenticate,
    userMiddleware.validUser,
    authMiddleware.ensureAccountOwner,
    updateUser
  )
  .delete(
    authMiddleware.authenticate,
    userMiddleware.validUser,
    authMiddleware.ensureAccountOwner,
    deleteAUser
  );
module.exports = router;
