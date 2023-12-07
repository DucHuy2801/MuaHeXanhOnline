const assert = require('assert');
const sinon = require('sinon');
const User= require('../models/user.model'); 
const { getStudentByMSSV,getAllStudents,updateInfoStudent}=require('../services/user.service');

// describe('GetStudentByMSSV Function', () => {
//   it('Return success and data of student', async () => {
//     const sampleStudent = {
//       mssv: '12345'
//     };

//     sinon.stub(User, 'findOne').resolves(sampleStudent);

//     const result = await getStudentByMSSV('12345');

//     assert.deepStrictEqual(result, {
//       success: true,
//       data: sampleStudent,
//     });

//     sinon.restore();
//   });

//   it('Return false and an error message for a non-existing student', async () => {
//     sinon.stub(User, 'findOne').resolves(null);

//     const result = await getStudentByMSSV('nonexistentmssv');

//     assert.deepStrictEqual(result, {
//       success: false,
//       error: 'Student not found!',
//     });

//     sinon.restore();
//   });

//   it('Return false and an error message for an error during retrieval', async () => {
//     const errorMessage = 'An error occurred during retrieval';
//     sinon.stub(User, 'findOne').rejects(new Error(errorMessage));

//     const result = await getStudentByMSSV('someMSSV');

//     assert.deepStrictEqual(result, {
//       success: false,
//       error: 'An error occurred',
//     });

//     sinon.restore();
//   });
// });
// describe('GetAllStudents Function', () => {
//     it('Return success and data of students', async () => {
//       const sampleStudent = {
//         type_user: 'student'
//       };
//       sinon.stub(User, 'findAll').resolves(sampleStudent);
  
//       const result = await getAllStudents();
  
//       assert.deepStrictEqual(result, {
//         success: true,
//         data: sampleStudent,
//       });
  
//       sinon.restore();
//     });
//     it('Return false and an error message for an error during retrieval', async () => {
//     const errorMessage = 'An error occurred during retrieval';
//     sinon.stub(User, 'findOne').rejects(new Error(errorMessage));

//     const result = await getAllStudents();

//     assert.deepStrictEqual(result, {
//       success: false,
//       error: 'An error occurred',
//     });

//     sinon.restore();
//   });
    
//   });
describe('updateInfoStudent Function', () => {
    it('Update student info successfully', async () => {
      const sampleStudent = {
            mssv: 2013314
        };
        const data_student =  { 
            username: "giahuy1092002",
            password: "123456",
            fullname: "Nguyen Duc Huy",
            gmail: "huy.nguyen28012002@hcmut.edu.vn",
            type_user: 'student',
            mssv: 2013314,
            school: "Dai hoc Bach Khoa HCM" 
        }
      sinon.stub(User, 'findOne').resolves(sampleStudent);
      sinon.stub(User, 'update').resolves([1]);
    //   sinon.stub(User, 'findOne').resolves({ ...sampleStudent, ...data_student });
  
      const result = await updateInfoStudent({ mssv: '12345', data_student});
  
      assert.deepStrictEqual(result, {
        success: true,
        message: "Updating info student successfully!",
      });
  
      sinon.restore();
    });
    it('Update student info successfully', async () => {
        const sampleStudent = {
              mssv: 2013314
          };
          const data_student =  { 
              username: "giahuy1092002",
              password: "123456",
              fullname: "Nguyen Duc Huy",
              gmail: "huy.nguyen28012002@hcmut.edu.vn",
              type_user: 'student',
              mssv: 2013314,
              school: "Dai hoc Bach Khoa HCM" 
          }
        sinon.stub(User, 'findOne').resolves(sampleStudent);
        sinon.stub(User, 'update').resolves([0]);
    
        const result = await updateInfoStudent({ mssv: '12345', data_student});
    
        assert.deepStrictEqual(result, {
          success: false,
          message: "Updating student's info failed!",
        });
    
        sinon.restore();
      });
  
    it('should handle not finding the student during update', async () => {
      sinon.stub(User, 'findOne').resolves(null);
      const data_student =  { 
        username: "giahuy1092002",
        password: "123456",
        fullname: "Nguyen Duc Huy",
        gmail: "huy.nguyen28012002@hcmut.edu.vn",
        type_user: 'student',
        mssv: 2013314,
        school: "Dai hoc Bach Khoa HCM" 
    }
      try {
        await updateInfoStudent({ mssv: 'nonexistentmssv', data_student });
      } catch (error) {
        assert(error instanceof BadRequestError);
        assert.strictEqual(error.message, 'Not found student!');
      }
  
      sinon.restore();
    });
  
    it('should handle errors during the update process', async () => {
      sinon.stub(User, 'findOne').throws(new Error('Some error during retrieval'));
      const data_student =  { 
        username: "giahuy1092002",
        password: "123456",
        fullname: "Nguyen Duc Huy",
        gmail: "huy.nguyen28012002@hcmut.edu.vn",
        type_user: 'student',
        mssv: 2013314,
        school: "Dai hoc Bach Khoa HCM" 
    }
      try {
        await updateInfoStudent({ mssv: 'someMSSV', data_student });
      } catch (error) {
        assert.strictEqual(error instanceof Error, true);
        assert.strictEqual(error.message, 'Some error during retrieval');
      }
  
      sinon.restore();
    });
  });