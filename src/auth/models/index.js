'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const userModel = require('./users/users.js');
const Collection = require('./data-collection.js');
const responseModel = require('./responses/responses.js');

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory:';

const sequelize = new Sequelize(DATABASE_URL);

// Creates an instance of the userModel associated with sequelize
const users = userModel(sequelize, DataTypes);
const responses = responseModel(sequelize, DataTypes);

// Collection for models
const usersCollection = new Collection('users', users);
const responsesCollection = new Collection('responses', responses);

usersCollection.createAssociation('hasOne', responsesCollection.model, { foreignKey: 'responsesId', sourceKey: 'id' });
responsesCollection.createAssociation('belongsTo', usersCollection.model, { foreignKey: 'usersId', targetKey: 'id' });

module.exports = {
  db: sequelize,
  users: usersCollection,
  responses: responsesCollection
}
