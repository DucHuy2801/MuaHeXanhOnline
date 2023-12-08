const assert = require('assert');
const sinon = require('sinon');
const ProjectService = require('../services/project.service');
const { BadRequestError, NotFoundError } = require("../core/error.response");

describe('ProjectService', () => {
  let findOneStub;
  let findAllStub;
  let updateStub;
  let saveStub;
  let destroyStub;

  before(() => {
    findOneStub = sinon.stub(ProjectService, 'getProjectById');
    findAllStub = sinon.stub(ProjectService, 'getAllProjects');
    updateStub = sinon.stub(ProjectService, 'updateProject');
    saveStub = sinon.stub(ProjectService, 'postProject');
    destroyStub = sinon.stub(ProjectService, 'deleteProjectById');
  });

  after(() => {
    findOneStub.restore();
    findAllStub.restore();
    updateStub.restore();
    saveStub.restore();
    destroyStub.restore();
  });

  it('should post a new project', async () => {
    saveStub.resolves({ code: 201, message_data: {} });

    const result = await ProjectService.postProject({
      title: 'Test Project',
      location: 'Test Location',
      school: 'Test School',
      content: 'Test Content',
      number_of_students: 5,
    });

    assert.deepStrictEqual(result, { code: 201, message_data: {} });
  });

  it('should get a project by id', async () => {
    findOneStub.resolves({ success: true, data: {} });

    const result = await ProjectService.getProjectById('test-project-id');

    assert.deepStrictEqual(result, { success: true, data: {} });
  });

  it('should handle not found project by id', async () => {
    findOneStub.resolves({ success: false, error: 'Project not found' });

    const result = await ProjectService.getProjectById('non-existent-project-id');

    assert.deepStrictEqual(result, { success: false, error: 'Project not found' });
  });

  it('should get all projects', async () => {
    findAllStub.resolves({ success: true, data: [{}, {}] });
  
    const result = await ProjectService.getAllProjects();
  
    assert.deepStrictEqual(result, { success: true, data: [{}, {}] });
  });
  
  it('should update project by id', async () => {
    updateStub.resolves({ success: true, message: 'Updating status project successfully!' });
  
    const result = await ProjectService.updateProject({
      project_id: 'test-project-id',
      data_project: { title: 'Updated Project' },
    });
  
    assert.deepStrictEqual(result, { success: true, message: 'Updating status project successfully!' });
  });
  
  it('should handle not found project for updating', async () => {
    updateStub.throws(new BadRequestError('Not found project for updating!'));
  
    try {
      await ProjectService.updateProject({
        project_id: 'non-existent-project-id',
        data_project: { title: 'Updated Project' },
      });
      assert.fail('Expected an error to be thrown');
    } catch (error) {
      assert.strictEqual(error.message, 'Not found project for updating!');
      assert.strictEqual(error instanceof BadRequestError, true);
    }
  });
  
  it('should delete project by id', async () => {
    destroyStub.resolves({ success: true, message: 'Project deleted successfully' });
  
    const result = await ProjectService.deleteProjectById('test-project-id');
  
    assert.deepStrictEqual(result, { success: true, message: 'Project deleted successfully' });
  });
  
  it('should handle not found project for deletion', async () => {
    destroyStub.resolves({ success: false, error: 'Project not found' });
  
    const result = await ProjectService.deleteProjectById('non-existent-project-id');
  
    assert.deepStrictEqual(result, { success: false, error: 'Project not found' });
  });
  
  // Add more test cases for other methods in ProjectService
});
