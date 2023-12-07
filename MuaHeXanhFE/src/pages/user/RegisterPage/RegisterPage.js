import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import {
  VisibilityOffOutlined,
  RemoveRedEyeOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./style.scss";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AuthenticationLayout from "../../../layouts/Authentication/Authentication";
import { createAcc } from "../../../api";

const Child = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [isHiddenPassword, setIsHiddenPassword] = useState({
    first: true,
    second: true,
  });

  const handleRegister = async (data) => {
    try {
      const res = await createAcc(data);
      if (res) {
        toast.success("Đăng ký tài khoản thành công");
        navigate("/user/login");
      } else {
        toast.error("Đăng ký tài khoản không thành công");
      }
    } catch (err) {
      if (err.response.data.code === 403) {
        toast.error("Username đã tồn tại");
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
      <Box sx={{ fontSize: "26px", fontWeight: 700 }}>Đăng ký</Box>

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
        <input
          placeholder="Email"
          {...register("gmail", {
            required: true,
            pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
          })}
          className="input"
        />
        {errors?.gmail?.type === "required" && (
          <p className="error">This field is required</p>
        )}
        {errors?.gmail?.type === "pattern" && (
          <p className="error">Invalid email</p>
        )}
      </Box>
      <Box className="input_component">
        <input
          placeholder="Mã số sinh viên"
          {...register("mssv", {
            required: true,
          })}
          className="input"
        />
        {errors?.mssv?.type === "required" && (
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

      <Box className="input_component">
        <Box className="input_eye">
          <input
            placeholder="Xác nhận mật khẩu"
            {...register("confirm", {
              required: true,
              validate: (val) => {
                if (watch("password") !== val) {
                  return "Your passwords do no match";
                }
              },
            })}
            type={isHiddenPassword.second ? "password" : "text"}
            className="input"
          />
          {isHiddenPassword.second ? (
            <RemoveRedEyeOutlined
              className="eye_icon"
              onClick={() =>
                setIsHiddenPassword((prevState) => ({
                  ...prevState,
                  second: false,
                }))
              }
            />
          ) : (
            <VisibilityOffOutlined
              className="eye_icon"
              onClick={() =>
                setIsHiddenPassword((prevState) => ({
                  ...prevState,
                  second: true,
                }))
              }
            />
          )}
        </Box>

        {errors?.confirm?.type === "required" && (
          <p className="error">This field is required</p>
        )}

        {errors?.confirm?.type === "validate" && (
          <p className="error">{errors.confirm.message}</p>
        )}
      </Box>

      <Box className="input_component">
        <select {...register("school", { required: true })} className="select">
          <option value="" hidden>
            --- Chọn trường đại học ---
          </option>
          <option value="Đại học Bách Khoa TPHCM">
            Đại học Bách Khoa TPHCM
          </option>
          <option value="Đại học Công nghệ thông tin">
            Đại học Công nghệ thông tin
          </option>
          <option value="Đại học Khoa học Tự nhiên">
            Đại học Khoa học Tự nhiên
          </option>
        </select>
        {errors?.school?.type === "required" && (
          <p className="error">This field is required</p>
        )}
      </Box>

      <Box>
        <Button
          variant="contained"
          style={{ width: "100%", backgroundColor: "#21A56E" }}
          onClick={handleSubmit(handleRegister)}
        >
          Đăng ký
        </Button>
      </Box>
      <Box sx={{ fontSize: "14px", fontFamily: "Arial" }} className="to-login">
        Đã có tài khoản?
        <Link to="/user/login">
          <span style={{ color: "blue" }}>Đăng nhập</span>{" "}
        </Link>
      </Box>
    </Box>
  );
};

export default function RegisterPage() {
  return <AuthenticationLayout children={<Child />} />;
}
