const express = require('express');
const userController = require('./../controllers/user.controller');
const userMiddleware = require('../middlewares/users.middleware');
const validationMiddleware = require('../middlewares/validationMiddleware');

const router = express.Router();

router
  .route('/')
  .get(userController.findByUsers)
  .post(validationMiddleware.createUserValidation, userController.createByUser);

router
  .route('/login')
  .post(validationMiddleware.loginUserValidation, userController.loginAUser);

router
  .route('/:id')
  .get(userMiddleware.validUser, userController.findAUser)
  .patch(userMiddleware.validUser, userController.updateAUser)
  .delete(userMiddleware.validUser, userController.deleteAUser);
module.exports = router;
