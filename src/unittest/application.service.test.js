const sinon = require("sinon");
const { expect } = require("chai");
const assert = require("assert");

const {
  createApplication,
  getAllApplication,
  getApplicationById,
  approveApplication,
  deleteApplicationById,
} = require("../services/application.service");
const Application = require("../models/application.model");
const Project = require("../models/project.model");
const {
  BadRequestError,
  AuthFailureError,
  NotFoundError,
} = require("../core/error.response");

describe("createApplication", () => {
  it("Create new application success", async () => {
    // Arrange
    const mssv = "123";
    const project_id = "456";

    // Stub the necessary methods
    const saveStub = sinon
      .stub(Application.prototype, "save")
      .resolves({ id: 1 });

    // Act
    const result = await createApplication({
      mssv,
      project_id,
    });

    // Assert
    expect(result.code).to.equal(201);
    expect(result.message_data).to.deep.equal({ id: 1 });

    // Restore the stubbed methods
    saveStub.restore();
  });

  it("Error when create application", async () => {
    // Arrange
    const mssv = "123";
    const project_id = "456";

    // Stub the necessary methods
    const saveStub = sinon.stub(Application.prototype, "save");
    saveStub.rejects(
      new BadRequestError("Error: Cannot create application at the moment")
    );

    // Act
    try {
      await createApplication({ mssv, project_id });
      assert.fail("Expected an error to be thrown");
    } catch (err) {
      assert.strictEqual(err instanceof BadRequestError, true);
      assert.strictEqual(
        err.message,
        "Error: Cannot create application at the moment"
      );
    }

    sinon.assert.calledOnce(Application.prototype.save);

    // Restore the stubbed methods
    saveStub.restore();
  });
});

describe("getApplicationById", () => {
  it("Get application by id success", async () => {
    // Arrange
    const apply_id = 1;

    // Stub the necessary methods
    const findOneStub = sinon.stub(Application, "findOne").resolves({ id: 1 });

    // Act
    const result = await getApplicationById(apply_id);

    // Assert
    expect(result.success).to.be.true;
    expect(result.data).to.deep.equal({ id: 1 });

    // Restore the stubbed methods
    findOneStub.restore();
  });

  it("Error find application by Id", async () => {
    // Arrange
    const apply_id = 1;

    // Stub the necessary methods
    const findOneStub = sinon
      .stub(Application, "findOne")
      .rejects(new Error("Database error"));

    // Act
    const result = await getApplicationById(apply_id);

    // Assert
    expect(result.success).to.be.false;
    expect(result.error).to.equal("An error occurred");

    // Restore the stubbed methods
    findOneStub.restore();
  });

  it("Error cant find application by id", async () => {
    // Arrange
    const apply_id = 1;

    // Stub the necessary methods
    const findOneStub = sinon.stub(Application, "findOne").resolves(null);

    // Act
    const result = await getApplicationById(apply_id);

    // Assert
    expect(result.success).to.be.false;
    expect(result.error).to.equal("Application not found");

    // Restore the stubbed methods
    findOneStub.restore();
  });
});

describe("getAllApplication", () => {
  it("Get all applications success", async () => {
    // Stub the necessary method
    const findAllStub = sinon
      .stub(Application, "findAll")
      .resolves([{ id: 1 }, { id: 2 }]);

    // Act
    const result = await getAllApplication();

    // Assert
    expect(result.success).to.be.true;
    expect(result.data).to.deep.equal([{ id: 1 }, { id: 2 }]);

    // Restore the stubbed method
    findAllStub.restore();
  });

  it("Error when find all application", async () => {
    // Stub the necessary method
    const findAllStub = sinon
      .stub(Application, "findAll")
      .rejects(new Error("Database error"));

    // Act
    const result = await getAllApplication();

    // Assert
    expect(result.success).to.be.false;
    expect(result.error).to.equal("An error occurred");

    // Restore the stubbed method
    findAllStub.restore();
  });
});

describe("approveApplication", () => {
  it("Approve an application success", async () => {
    // Arrange
    const apply_id = 1;
    const status = true;

    // Stub the necessary methods
    const findOneStub = sinon
      .stub(Application, "findOne")
      .resolves({ apply_id: 1, project_id: 1 });
    const findOneProjectStub = sinon.stub(Project, "findOne").resolves({
      project_id: 1,
      current_number: 5,
      number_of_students: 10,
      save: sinon.fake(),
    });
    const updateStub = sinon.stub(Application, "update").resolves([1]);

    // Act
    const result = await approveApplication({
      apply_id,
      status,
    });

    // Assert
    expect(result.success).to.be.true;
    expect(result.message).to.equal("Approve application successfully!");

    // Restore the stubbed methods
    findOneStub.restore();
    findOneProjectStub.restore();
    updateStub.restore();
  });

  it("Not found application", async () => {
    // Arrange
    const apply_id = 1;
    const status = true;

    // Stub the necessary method
    const findOneStub = sinon.stub(Application, "findOne").resolves(null);

    // Assert
    try {
      await approveApplication({ apply_id, status });
    } catch (error) {
      assert(error instanceof NotFoundError);
      assert.strictEqual(error.message, "Not found Application");
    }

    // Restore the stubbed method
    findOneStub.restore();
  });

  it("Project full slot", async () => {
    // Arrange
    const apply_id = 1;
    const status = true;

    // Stub the necessary methods
    const findOneStub = sinon
      .stub(Application, "findOne")
      .resolves({ apply_id: 1, project_id: 1 });
    const findOneProjectStub = sinon
      .stub(Project, "findOne")
      .resolves({ project_id: 1, current_number: 10, number_of_students: 10 });

    // Assert
    try {
      await approveApplication({ apply_id, status });
    } catch (error) {
      assert(error instanceof BadRequestError);
      assert.strict(error.message, "Slot is full!");
    }

    // Restore the stubbed methods
    findOneStub.restore();
    findOneProjectStub.restore();
  });

  it("Error updating application", async () => {
    // Arrange
    const apply_id = 1;
    const status = true;

    // Stub the necessary methods
    const findOneStub = sinon
      .stub(Application, "findOne")
      .resolves({ apply_id: 1, project_id: 1 });
    const findOneProjectStub = sinon.stub(Project, "findOne").resolves({
      project_id: 1,
      current_number: 5,
      number_of_students: 10,
      save: sinon.fake(),
    });
    const updateStub = sinon
      .stub(Application, "update")
      .rejects(new Error("Database error"));

    // Act
    const result = await approveApplication({
      apply_id,
      status,
    });

    // Assert
    expect(result.success).to.be.false;
    expect(result.data).to.equal("An error occurred");

    // Restore the stubbed methods
    findOneStub.restore();
    findOneProjectStub.restore();
    updateStub.restore();
  });
});

describe("deleteApplicationById", () => {
  it("Delete an application by Id success", async () => {
    // Arrange
    const applicationId = 1;

    // Stub the necessary methods
    const findOneStub = sinon
      .stub(Application, "findOne")
      .resolves({ apply_id: 1, destroy: sinon.fake() });

    // Act
    const result = await deleteApplicationById(applicationId);

    // Assert
    expect(result.success).to.be.true;
    expect(result.message).to.equal("Application deleted successfully");

    // Restore the stubbed method
    findOneStub.restore();
  });

  it("Not found application when delete", async () => {
    // Arrange
    const applicationId = 1;

    // Stub the necessary method
    const findOneStub = sinon.stub(Application, "findOne").resolves(null);

    // Act
    const result = await deleteApplicationById(applicationId);

    // Assert
    expect(result.success).to.be.false;
    expect(result.error).to.equal("Application not found");

    // Restore the stubbed method
    findOneStub.restore();
  });

  it("Error when delete application", async () => {
    // Arrange
    const applicationId = 1;

    // Stub the necessary method
    const findOneStub = sinon.stub(Application, "findOne").resolves({
      apply_id: 1,
      destroy: sinon.fake.rejects(new Error("Database error")),
    });

    // Act
    const result = await deleteApplicationById(applicationId);

    // Assert
    expect(result.success).to.be.false;
    expect(result.error).to.equal("An error occured");

    // Restore the stubbed method
    findOneStub.restore();
  });
});
