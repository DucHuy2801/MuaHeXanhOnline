import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import AuthenticationLayout from "../../../layouts/Authentication/Authentication";
import { Link } from "react-router-dom";
import "./style.scss";
import { loginPost } from "../../../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  RemoveRedEyeOutlined,
  VisibilityOffOutlined,
} from "@mui/icons-material";

const Child = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isHiddenPassword, setIsHiddenPassword] = useState({
    first: true,
  });

  const handleLogin = async (data) => {
    try {
      const res = await loginPost(data);
      if (res) {
        toast.success("Đăng nhập thành công");
        localStorage.setItem("JWT", res.data.metadata.token);
        navigate("/user/home");
      }
    } catch (err) {
      if (err.response.data.code === 403) {
        toast.error("Username không tồn tại");
      } else {
        toast.error("Thông tin đăng nhập không chính xác");
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: "350px",
      }}
    >
      <Box sx={{ fontSize: "26px", fontWeight: 700 }}>Đăng nhập</Box>
      <Box className="input_component">
        <input
          placeholder="Tên đăng nhập"
          {...register("username", {
            required: true,
          })}
          className="input"
        />
        {errors?.username?.type === "required" && (
          <p className="error">This field is required</p>
        )}
      </Box>

      <Box className="input_component">
        <Box className="input_eye">
          <input
            placeholder="Mật khẩu"
            {...register("password", {
              required: true,
              pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            })}
            type={isHiddenPassword.first ? "password" : "text"}
            className="input"
          />
          {isHiddenPassword.first ? (
            <RemoveRedEyeOutlined
              className="eye_icon"
              onClick={() =>
                setIsHiddenPassword((prevState) => ({
                  ...prevState,
                  first: false,
                }))
              }
            />
          ) : (
            <VisibilityOffOutlined
              className="eye_icon"
              onClick={() =>
                setIsHiddenPassword((prevState) => ({
                  ...prevState,
                  first: true,
                }))
              }
            />
          )}
        </Box>
        {errors?.password?.type === "required" && (
          <p className="error">This field is required</p>
        )}
        {errors?.password?.type === "pattern" && (
          <p className="error">
            Password must be at least eight characters, at least one letter and
            one number
          </p>
        )}
      </Box>
      <Box
        sx={{ fontSize: "14px", fontFamily: "Arial", color: "blue" }}
        className="to-forgot-password"
      >
        <Link to="/user/forgot">
          <span style={{ color: "blue" }}>Quên mật khẩu ?</span>
        </Link>
      </Box>

      <Box>
        <Button
          variant="contained"
          style={{ width: "100%", backgroundColor: "#21A56E" }}
          onClick={handleSubmit(handleLogin)}
        >
          Đăng nhập
        </Button>
      </Box>
      <Box
        sx={{ fontSize: "14px", fontFamily: "Arial" }}
        className="to-register"
      >
        Chưa có tài khoản?
        <Link to="/user/register">
          <span style={{ color: "blue" }}>Đăng ký</span>{" "}
        </Link>
      </Box>
    </Box>
  );
};

export default function LoginPage() {
  return <AuthenticationLayout children={<Child />} />;
}
