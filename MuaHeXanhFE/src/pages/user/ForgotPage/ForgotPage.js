import React from "react";
import AuthenticationLayout from "../../../layouts/Authentication/Authentication";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { forgotPassword } from "../../../api";

const Child = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleForgot = async (data) => {
    try {
      const res = await forgotPassword(data);
      if (res.status === 200) {
        toast.success("Vui lòng kiểm tra Email");
      }
    } catch (err) {
      console.log("error:", err);
      if (err.response.data.status === "Fail") {
        toast.error("Email không tồn tại trên hệ thống");
      }
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Box sx={{ fontSize: "16px", fontWeight: "bold" }}>Lấy lại mật khẩu</Box>
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
      <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <Button
          variant="contained"
          color="error"
          style={{ textTransform: "none" }}
          onClick={() => navigate("/user/login")}
        >
          Hủy
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: "#21A56E", textTransform: "none" }}
          onClick={handleSubmit(handleForgot)}
        >
          Lấy lại mật khẩu
        </Button>
      </Box>
    </Box>
  );
};
export default function ForgotPage() {
  return <AuthenticationLayout children={<Child />} />;
}
