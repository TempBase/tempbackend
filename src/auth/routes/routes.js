'use strict';

const express = require('express');
const authRouter = express.Router();

const { users, responses } = require('../models/index.js');
const basicAuth = require('../middleware/basic.js');
const bearerAuth = require('../middleware/bearer.js');
const permissions = require('../middleware/acl.js');

authRouter.post('/signup', async (req, res, next) => {
  try {
    console.log(req.body);
    let userRecord = await users.create(req.body);
    const output = {
      isAuthenticated: true,
      user: userRecord,
      token: userRecord.token
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message)
  }
});

authRouter.post('/signin', basicAuth, (req, res, next) => {
  try {
    const user = {
      isAuthenticated: true,
      user: req.user,
      token: req.user.token
    };
    console.log(user);
    res.status(200).json(user);
  } catch (e) {
    next('Error on sign-in');
  }
});

// authRouter.get('/users', bearerAuth, permissions('delete'), async (req, res, next) => {
//   try {
//     // console.log('HELLO');
//     const userRecords = await users.model.findAll({});
//     const list = userRecords.map(user => user.username);
//     res.status(200).json(list);
//   } catch {
//     next('Error on user list request');
//   }
// });

authRouter.post('/response', bearerAuth, permissions('read'), async (req, res, next) => {
  try {
    // console.log(req.body);
    const userResponse = await responses.model.create(req.body);
    res.status(200).json(userResponse);
  } catch {
    next('Error on user list request');
  }
});

authRouter.get('/response', bearerAuth, permissions('read'), async (req, res, next) => {
  try {
    let id = req.body.userId;
    console.log(id);
    const userResponse = await responses.model.findOne({ where: { userId: id } });
    res.status(200).json(userResponse);
  } catch {
    next('Error on user list request');
  }
});

authRouter.get('/secret', bearerAuth, async (req, res, next) => {
  try {
    res.status(200).send('Welcome to the secret area')
  } catch {
    next('Error on secret route');
  }
});

module.exports = authRouter;
