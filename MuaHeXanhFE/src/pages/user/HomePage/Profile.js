import React, { useState, useEffect } from "react";
import MainLayout from "../../../layouts/Mainlayout/Mainlayout";
import Input from "../../../components/Input/Input";
import { Box, Button } from "@mui/material";
import Dropdown from "../../../components/Dropdown/Dropdown";
import { getProfile, updateProfile } from "../../../api";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Child = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const loadUserProfile = async () => {
      const token = localStorage.getItem("JWT");
      if (token) {
        const json = jwtDecode(token);

        if (json.mssv) {
          const res = await getProfile(json.mssv);
          setData(res.data.data);
        } else {
          toast.error("Phiên đăng nhập đã hết hạn");
          navigate("/user/login");
        }
      }
    };

    loadUserProfile();
  }, []);

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleUpdateProfile = async () => {
    setIsEdit(false);
    // const res = await updateProfile(data);
    // if (res) {
    //   toast.success("Cập nhật thông tin thành công");
    // }
    alert("Coming soon");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
      }}
    >
      {isEdit === true ? (
        <>
          <Box sx={{ display: "flex", gap: "20px" }}>
            <Input
              label="Họ và tên"
              name="fullname"
              value={data.fullname}
              onChange={handleChangeInput}
            />
            <Input
              label="Username"
              name="username"
              value={data.username}
              onChange={handleChangeInput}
            />
          </Box>

          <Box sx={{ display: "flex", gap: "20px" }}>
            <Input
              label="Mã số sinh viên"
              name="mssv"
              value={data.mssv}
              onChange={handleChangeInput}
            />
            <Input
              label="Email"
              disabled={true}
              name="gmail"
              value={data.gmail}
              onChange={handleChangeInput}
            />
          </Box>
          <Box sx={{ display: "flex", gap: "20px" }}>
            <Dropdown
              label="Trường Đại học"
              listItem={[
                { id: 1, name: "Đại học Bách Khoa TPHCM" },
                { id: 2, name: "Đại học Công nghệ thông tin" },
                { id: 3, name: "Đại học Khoa học Tự nhiên" },
              ]}
              name="school"
              value={data.school}
              onChange={handleChangeInput}
            />
            <Input
              label="Password"
              type="password"
              onChange={handleChangeInput}
            />
          </Box>
        </>
      ) : (
        <>
          {" "}
          <Box sx={{ display: "flex", gap: "20px" }}>
            <Input
              label="Họ và tên"
              name="fullname"
              value={data.fullname}
              disabled={true}
            />
            <Input
              label="Username"
              name="username"
              value={data.username}
              disabled={true}
            />
          </Box>
          <Box sx={{ display: "flex", gap: "20px" }}>
            <Input
              label="Mã số sinh viên"
              name="mssv"
              value={data.mssv}
              disabled={true}
            />
            <Input
              label="Email"
              disabled={true}
              name="gmail"
              value={data.gmail}
            />
          </Box>
          <Box sx={{ display: "flex", gap: "20px" }}>
            <Dropdown
              label="Trường Đại học"
              listItem={[
                { id: 1, name: "Đại học Bách Khoa TPHCM" },
                { id: 2, name: "Đại học Công nghệ thông tin" },
                { id: 3, name: "Đại học Khoa học Tự nhiên" },
              ]}
              name="school"
              value={data.school}
              disabled={true}
            />
            <Input label="Password" type="password" disabled={true} />
          </Box>
        </>
      )}

      <Box sx={{ display: "flex", gap: "20px" }}>
        <Box sx={{ minWidth: "300px" }}></Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "20px",
            minWidth: "300px",
          }}
        >
          {isEdit === false ? (
            <>
              <Button
                variant="contained"
                size="medium"
                color="primary"
                sx={{ textTransform: "none" }}
                onClick={() => setIsEdit(true)}
              >
                Chỉnh sửa
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                size="medium"
                color="error"
                sx={{ textTransform: "none" }}
                onClick={() => setIsEdit(false)}
              >
                Hủy
              </Button>
              <Button
                variant="contained"
                size="medium"
                color="primary"
                sx={{ textTransform: "none" }}
                onClick={handleUpdateProfile}
              >
                Cập nhật
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default function Profile() {
  return (
    <div>
      <MainLayout title="Tài khoản của tôi" content={<Child />} />
    </div>
  );
}
