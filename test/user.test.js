const request = require('express')
const supertest = require('supertest')
const app = require('../app')

//--- user sign up test
test('User registration/signup', async () => {
  const data = {
    provider: 'local',
    providerId: null,
    name: 'deva saikia',
    email: 'devasaikia123@gmail.com',
    password: '123456',
  }
  await request(app).post('/users/register').send(data).expect(201)
})
