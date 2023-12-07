const { BadRequestError} = require("../core/error.response")
const assert = require('assert');
const bcrypt = require('bcrypt');
const sinon = require('sinon');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const { register,login } = require('../services/access.service'); // Thay đường dẫn đến module của bạn
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
  
    it('Register a new user', async () => 
    {
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
    it('Handle existing username', async () => {
      findOneStub.resolves({
        username: 'existinguser',
      });
    
      try {
        await register({
          username: 'existinguser',
          password: 'password123',
          gmail: 'existinguser@gmail.com',
          mssv: '789012',
          school: 'Existing University',
        });
        // Nếu không có lỗi được ném, thì fail test case
        assert.fail('Expected an error to be thrown');
      } catch (error) {
        assert.strictEqual(error.message, 'Username already exists');
        assert.strictEqual(error instanceof BadRequestError, true);
      }
    });
    it('Handle password weak', async () => {
      findOneStub.resolves(null);
      try {
        await register({
          username: 'existinguser',
          password: 'pass',
          gmail: 'existinguser@gmail.com',
          mssv: '',
          school: 'Existing University',
        });
        // Nếu không có lỗi được ném, thì fail test case
        assert.fail('Expected an error to be thrown');
      } catch (error) {
        assert.strictEqual(error.message, "Password is weak");
        assert.strictEqual(error instanceof BadRequestError, true);
      }
    });
    it('Handle MSSV is empty', async () => {
      findOneStub.resolves(null);
      bcryptHashStub.resolves('hashedpassword');
      try {
        await register({
          username: 'existinguser',
          password: 'password123',
          gmail: 'existinguser@gmail.com',
          mssv: '',
          school: 'Existing University',
        });
        // Nếu không có lỗi được ném, thì fail test case
        assert.fail('Expected an error to be thrown');
      } catch (error) {
        assert.strictEqual(error.message, "MSSV isn't empty");
        assert.strictEqual(error instanceof BadRequestError, true);
      }
    });
    it('Handle University is empty', async () => {
      findOneStub.resolves(null);
      bcryptHashStub.resolves('hashedpassword');
      try {
        await register({
          username: 'existinguser',
          password: 'password123',
          gmail: 'existinguser@gmail.com',
          mssv: '2013314',
          school: '',
        });
        // Nếu không có lỗi được ném, thì fail test case
        assert.fail('Expected an error to be thrown');
      } catch (error) {
        assert.strictEqual(error.message, "University isn't empty");
        assert.strictEqual(error instanceof BadRequestError, true);
      }
    });
  });
  describe('Login Function', () => {
    it('Return a token when login successfully', async () => {
      const sampleUser = {
        id: 1,
        username: 'teststudent',
        password: bcrypt.hashSync('testpassword', 10),
        type_user: 'student',
        mssv: '12345',
      };
  
      sinon.stub(User, 'findOne').resolves(sampleUser);
      sinon.stub(bcrypt, 'compareSync').returns(true);
      sinon.stub(jwt, 'sign').returns('mockedToken');
  
      const result = await login({ username: 'teststudent', password: 'testpassword' });
  
      assert.deepStrictEqual(result, { code: 200, token: 'mockedToken' });
  
      sinon.restore();
    });
  
    it('should throw BadRequestError for a non-existing username', async () => {
      sinon.stub(User, 'findOne').resolves(null);
  
      try {
        await login({ username: 'nonexistentuser', password: 'testpassword' });
      } catch (error) {
        assert(error instanceof BadRequestError);
        assert.strictEqual(error.message, "Username doesn't exist!");
      }
  
      sinon.restore();
    });
  
    it('should throw BadRequestError for an invalid password', async () => {
      const sampleUser = {
        id: 1,
        username: 'teststudent',
        password: bcrypt.hashSync('testpassword', 10),
        type_user: 'student',
        mssv: '12345',
      };
  
      sinon.stub(User, 'findOne').resolves(sampleUser);
      sinon.stub(bcrypt, 'compareSync').returns(false);
  
      try {
        await login({ username: 'teststudent', password: 'invalidpassword' });
      } catch (error) {
        assert(error instanceof BadRequestError);
        assert.strictEqual(error.message, 'Password is wrong!');
      }
      sinon.restore();
    });
  });