// tipos de datos aprendido en el video de crud
const { DataTypes } = require('sequelize');
// importa el archivo de coneccion de la base de datos
const { db } = require('../database/config');

// contiene el modelo de la base de datos
const User = db.define('users', {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    //el ENUM  es como. OYE solamente aceptame esto que te voy a colocar😁
    type: DataTypes.ENUM('client', 'employee'),
    allowNull: false,
    defaultValue: 'client',
  },
  status: {
    type: DataTypes.ENUM('available', 'disabled'),
    allowNull: false,
    defaultValue: 'available',
  },
});

module.exports = User;
