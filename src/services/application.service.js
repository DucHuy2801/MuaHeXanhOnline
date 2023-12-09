"use strict";

const { NotFoundError, BadRequestError } = require("../core/error.response");
const Application = require("../models/application.model");
const Project = require("../models/project.model");
const User = require("../models/user.model");

class ApplicationService {
  static createApplication = async ({ mssv, project_id }) => {
    const newApplication = new Application({
      mssv_student: mssv,
      project_id: project_id,
      status: null,
    });
    const savedApplication = await newApplication.save().catch((error) => {
      // console.log("Error", error);
      throw new BadRequestError(
        "Error: Cannot create application at the moment"
      );
    });
    console.log(`savedApplication`, savedApplication);
    if (savedApplication) {
      return {
        code: 201,
        message_data: savedApplication,
      };
    }
    return {
      code: 200,
      metadata: null,
    };
  };

  static getApplicationById = async (apply_id) => {
    try {
      const apply = await Application.findOne({ where: { apply_id } });

      if (apply) {
        return {
          success: true,
          data: apply,
        };
      } else {
        return {
          success: false,
          error: "Application not found",
        };
      }
    } catch (error) {
      console.error("Failed to retrieve application data: ", error);
      return {
        success: false,
        error: "An error occurred",
      };
    }
  };

  static getAllApplication = async () => {
    try {
      const applies = await Application.findAll();
      return {
        success: true,
        data: applies,
      };
    } catch (error) {
      console.error("Failed to retrieve applications data: ", error);
      return {
        success: false,
        error: "An error occurred",
      };
    }
  };

  static approveApplication = async ({ apply_id, status }) => {
    try {
      const foundApplication = await Application.findOne({
        where: { apply_id: apply_id },
      });
      if (!foundApplication) throw new NotFoundError("Not found Application");

      const project_id = foundApplication.project_id;
      const foundProject = await Project.findOne({
        where: { project_id: project_id },
      });
      if (foundProject.current_number == foundProject.number_of_students) {
        throw new BadRequestError("Slot is full!");
      }

      foundProject.current_number += 1;
      await foundProject.save();

      const [num, updatedRows] = await Application.update(
        { status: status },
        {
          where: { apply_id: apply_id },
        }
      );

      if (num === 1) {
        return {
          success: true,
          message: "Approve application successfully!",
        };
      } else {
        return {
          success: false,
          data: "Fail!",
        };
      }
    } catch (error) {
      console.error("Failed to retrieve applications data: ", error);
      return {
        success: false,
        data: "An error occurred",
      };
    }
  };

  static deleteApplicationById = async (applicationId) => {
    try {
      const application = await Application.findOne({
        where: { apply_id: applicationId },
      });
      if (!application) {
        return {
          success: false,
          error: "Application not found",
        };
      }
      await application.destroy();

      return {
        success: true,
        message: "Application deleted successfully",
      };
    } catch (error) {
      console.error("Failed to delete application: ", error);
      return {
        success: false,
        error: "An error occured",
      };
    }
  };
}

module.exports = ApplicationService;
