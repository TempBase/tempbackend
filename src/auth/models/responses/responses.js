'usestrict';

const responseModel = (sequelize, DataTypes) => sequelize.define('Response', {
  responseQ: { type: DataTypes.STRING, require: true },
  userId: { type: DataTypes.STRING, require: true }
});

module.exports = responseModel;
