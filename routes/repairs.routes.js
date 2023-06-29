const express = require('express');
const repairsController = require('../controllers/repairs.controller');
const {
  findByRepairs,
  createByRepairs,
  findARepairs,
  updateARepairs,
  deleteARepairs,
} = repairsController;

const validationMiddleware = require('../middlewares/validationMiddleware');
const userMiddleware = require('../middlewares/users.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();

router.use(authMiddleware.authenticate);

router
  .route('/')
  .post(validationMiddleware.reparisValidations, createByRepairs);

router.route(authMiddleware.restrictedAccess);

router.route('/').get(findByRepairs);
router
  .use('/id:', userMiddleware.fetchRepairById)
  .route('/:id')
  .get(findARepairs)
  .patch(updateARepairs)
  .delete(deleteARepairs);
module.exports = router;
