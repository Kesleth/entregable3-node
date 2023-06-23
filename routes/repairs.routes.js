const express = require('express');
const repairsController = require('../controllers/repairs.controller');
const router = express.Router();

router
  .route('/')
  .get(repairsController.findByRepairs)
  .post(repairsController.createByRepairs);

router
  .route('/:id')
  .get(repairsController.findARepairs)
  .patch(repairsController.updateARepairs)
  .delete(repairsController.deleteARepairs);
module.exports = router;
