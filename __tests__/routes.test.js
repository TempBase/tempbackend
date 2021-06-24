'use strict';

const { server } = require('../src/server.js');
const { db } = require('../src/auth/models/index.js');
const supertest = require('supertest');
const { expect } = require('@jest/globals');

const request = supertest(server);

beforeAll(async () => {
  // creates tables from models
  await db.sync();
});

afterAll(async () => {
  // remove all created data entities and delete the table.
  await db.drop();
});

let adminToken = '';

describe('Testing the server', () => {
  test('Testing a 201 for POST `/signup`', async () => {
    const response = await request.post('/signup').send({
      username: "usernameTest",
      password: "passwordTest"
    });
    expect(response.status).toEqual(201);
    expect(response.body.user.username).toEqual("usernameTest");
    expect(response.body.user.role).toEqual("user");
    expect(response.body.user.password).not.toEqual("passwordTest");
  });

  test('Testing a 201 for POST `/signup`', async () => {
    const response = await request.post('/signup').send({
      username: "user",
      password: "pass",
      role: "admin"
    });
    adminToken = response.body.user.token;
    expect(response.status).toEqual(201);
    expect(response.body.user.username).toEqual("user");
    expect(response.body.user.role).toEqual("admin");
    expect(response.body.user.password).not.toEqual("pass");
  });

  test('Testing a 200 for POST `/signin`', async () => {
    const response = await request.post('/signin').auth("usernameTest", "passwordTest");
    expect(response.status).toEqual(200);
    expect(response.body.user.username).toEqual("usernameTest");
    expect(response.body.user.password).not.toEqual("passwordTest");
  });

  // test('Testing a 200 for GET `/api/v2/users`', async () => {
  //   const response = await request.post('/api/v2/users').send({
  //     authentication: `${adminToken}`
  //   });
  //   console.log(response.body.user);
  // });
});