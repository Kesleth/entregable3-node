const usersModel = require('../models/users.model');
const repairsModel = require('../models/repairs.models');

const initModelUserAndRepair = () => {
  usersModel.hasMany(repairsModel, { foreignKey: 'userid' });
  repairsModel.belongsTo(usersModel, { foreignKey: 'userid' });
};

module.exports = initModelUserAndRepair;
