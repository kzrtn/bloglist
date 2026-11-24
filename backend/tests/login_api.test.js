const { describe, test, beforeEach, after } = require('node:test')

const { createSampleBlogs } = require('./test_helper.js')
const app = require('../app.js')
const mongoose = require('mongoose')
const supertest = require('supertest')

const api = supertest(app)

beforeEach(async () => {
  await createSampleBlogs()
})

describe('user logging in with', () => {
  test('valid credentials receives status 200', async () => {
    const testUser = {
      username: 'root',
      password: 'admin@12333',
    }

    await api
      .post('/api/login')
      .send(testUser)
      .expect(200)
  })

  test('invalid credentials receives status 401', async () => {
    const testUser = {
      username: 'root',
      password: 'admin@12',
    }

    await api
      .post('/api/login')
      .send(testUser)
      .expect(401)
  })
})


after(async () => {
  await mongoose.connection.close()
})