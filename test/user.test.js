const { text, request } = require('express')
const supertest =  require('supertest')
const app =  require('../app')


//--- user sign up test
test('User registration/signup',async()=>{
    await request(app).post('/register').send({
        provider: 'local',
        providerId: null,
        name : 'deva saikia',
        email :  'devasaikia123@gmail.com',
        password :'123456',
    }).expect(201)
})