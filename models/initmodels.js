const usersModel = require('../models/users.model');
const repairsModel = require('../models/repairs.models');

const initModelUserAndRepair = () => {
  usersModel.hasMany(repairsModel, { foreignKey: 'userId' });
  repairsModel.belongsTo(usersModel, { foreignKey: 'userId' });
};

module.exports = initModelUserAndRepair;
