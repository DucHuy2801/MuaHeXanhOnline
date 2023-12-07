import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { getOneProject } from "../../api";
import TimeVN from "../../untils/timeVN";

export default function DetailActivity() {
  const id = new URLSearchParams(window.location.search).get("id");
  const [project, setProject] = useState({});

  const loadProject = async () => {
    const res = await getOneProject(id);
    setProject(res.data.data);
  };

  useEffect(() => {
    loadProject();
  }, []);

  const navigate = useNavigate();

  const handelBack = () => {
    navigate(-1);
  };

  return (
    <Box>
      <Box>
        <Box>
          <Button
            variant="outlined"
            color="error"
            size="small"
            sx={{ textTransform: "none" }}
            startIcon={<ArrowBack />}
            onClick={handelBack}
          >
            Quay lại
          </Button>
        </Box>
        <Box></Box>
      </Box>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 15,
          fontSize: 14,
          paddingTop: 30,
        }}
      >
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            marginTop: "20px",
          }}
        >
          <tbody>
            <tr>
              <td style={headerCellStyle}>Hoạt động:</td>
              <td style={cellStyle}>{`#${project.project_id}`}</td>
            </tr>
            <tr>
              <td style={headerCellStyle}>Tên hoạt động:</td>
              <td style={cellStyle}>{project.title}</td>
            </tr>
            <tr>
              <td style={headerCellStyle}>Số sinh viên đã đăng ký:</td>
              <td style={cellStyle}>{project.current_number}</td>
            </tr>
            <tr>
              <td style={headerCellStyle}>Tổng số sinh viên tối đa:</td>
              <td style={cellStyle}>{project.number_of_students}</td>
            </tr>
            <tr>
              <td style={headerCellStyle}>Nội dung:</td>
              <td style={cellStyle}>{project.content}</td>
            </tr>
            <tr>
              <td style={headerCellStyle}>Địa điểm:</td>
              <td style={cellStyle}>{project.location}</td>
            </tr>
            <tr>
              <td style={headerCellStyle}>Thời gian tạo:</td>
              <td style={cellStyle}>{TimeVN(project.createdAt)}</td>
            </tr>
            <tr>
              <td style={headerCellStyle}>Cập nhật gần nhất:</td>
              <td style={cellStyle}>{TimeVN(project.updatedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Box>
  );
}

const headerCellStyle = {
  fontWeight: "bold",
  backgroundColor: "#f2f2f2",
  padding: "15px 8px",
  border: "1px solid #ddd",
  width: "200px",
};

const cellStyle = {
  padding: "15px 10px",
  border: "1px solid #ddd",
  fontSize: 13,
  lineHeight: 1.5,
  textAlign: "justify",
};
