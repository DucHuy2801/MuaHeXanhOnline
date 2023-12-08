import axios from "axios";

export const getProfile = async (mssv) => {
  return await axios.get(`http://localhost/local:5000/v1/api/student/${mssv}`, {
    headers: {
      Authorization: `Bearer ...`,
    },
  });
};

export const updateProfile = async (data, mssv) => {
  return await axios({
    method: "put",
    data: data,
    url: `http://localhost:5000/api/updatestudent/${mssv}`,
  });
};

export const createAcc = async (data) => {
  return await axios({
    method: "post",
    data: data,
    url: `http://localhost:5000/v1/api/user/register`,
  });
};

export const loginPost = async (data) => {
  return await axios({
    method: "post",
    data: data,
    url: `http://localhost:5000/v1/api/user/login`,
  });
};

export const forgotPassword = async (data) => {
  return await axios({
    method: "post",
    data: data,
    url: `http://localhost:5000/v1/api/user/forgotpassword`,
  });
};

export const update = async (data) => {
  return await axios({
    method: "put",
    data: data,
    url: `...`,
    headers: {
      Authorization: `Bearer ...`,
    },
  });
};

export const deleted = async (data) => {
  return await axios({
    method: "delete",
    url: `...${data}`,
    headers: {
      Authorization: `Bearer ...`,
    },
  });
};

export const createProject = async (data) => {
  return await axios({
    method: "post",
    data: data,
    url: `http://localhost:5000/v1/api/project`,
  });
};

export const getAllProjects = async () => {
  return await axios.get(`http://localhost:5000/v1/api/project/all`, {
    headers: {
      Authorization: `Bearer ...`,
    },
  });
};

export const getOneProject = async (id) => {
  return await axios.get(`http://localhost:5000/v1/api/project/${id}`, {
    headers: {
      Authorization: `Bearer ...`,
    },
  });
};

export const getAllApplications = async () => {
  return await axios.get(`http://localhost:5000/v1/api/application/all`, {
    headers: {
      Authorization: `Bearer ...`,
    },
  });
};

export const getStudentById = async (id) => {
  return await axios.get(`http://localhost:5000/v1/api/student/${id}`, {
    headers: {
      Authorization: `Bearer ...`,
    },
  });
};

export const getActById = async (id) => {
  return await axios.get(`http://localhost:5000/v1/api/project/${id}`, {
    headers: {
      Authorization: `Bearer ...`,
    },
  });
};

export const approveApplication = async (id, data) => {
  return await axios({
    method: "patch",
    data: data,
    url: `http://localhost:5000/v1/api/application/${id}`,
  });
};

export const approveProject = async (id, data) => {
  return await axios({
    method: "patch",
    data: data,
    url: `http://localhost:5000/v1/api/project/verify/${id}`,
  });
};
