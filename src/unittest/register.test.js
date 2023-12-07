// register.test.js
const assert = require('assert');
const bcrypt = require('bcrypt');
const sinon = require('sinon');
const User = require('../models/user.model'); // Thay đường dẫn đến module/models của bạn

const { register } = require('../services/access.service'); // Thay đường dẫn đến module của bạn
describe('User Registration', () => {
    let findOneStub;
    let bcryptHashStub;
    let saveStub;
  
    before(() => {
      // Create stubs for necessary functions
      findOneStub = sinon.stub(User, 'findOne');
      bcryptHashStub = sinon.stub(bcrypt, 'hash');
      saveStub = sinon.stub(User.prototype, 'save');
    });
  
    after(() => {
      // Restore the original functions after tests
      findOneStub.restore();
      bcryptHashStub.restore();
      saveStub.restore();
    });
  
    it('should register a new user', async () => {
      // Stub the necessary functions to simulate successful registration
      findOneStub.resolves(null); // Simulate no existing user with the same username
      bcryptHashStub.resolves('hashedpassword'); // Simulate successful password hashing
      saveStub.resolves({ username: 'testuser', password: 'hashedpassword', type_user: 'student' }); // Simulate successful user save
  
      // Call the register function with test data
      const result = await register({
        username: 'testuser',
        password: 'password123',
        gmail: 'testuser@gmail.com',
        mssv: '123456',
        school: 'Test University',
      });
  
      // Assert the result
      assert.deepStrictEqual(result, {
        code: 201,
        metadata: {
          user_info: {
            username: 'testuser',
            password: 'hashedpassword',
            type_user: 'student',
          },
        },
      });
    });
  });
