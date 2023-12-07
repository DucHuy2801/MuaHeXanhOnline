import React from "react";
import { Box, Button } from "@mui/material";

export default function Activity({
  title,
  content,
  time,
  place,
  handleClickDetail,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        border: "1px solid #333",
        alignItems: "center",
        padding: "10px 20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Box sx={{ fontSize: "20px", fontWeight: 700 }}>{title}</Box>
        <Box sx={{ textAlign: "justify", lineHeight: 1.5, fontSize: "14px" }}>
          {content}
        </Box>
        <Box sx={{ fontSize: "12px", fontWeight: 700, color: "#9c27b0" }}>
          Thời gian: {time}
        </Box>
        <Box sx={{ fontSize: "12px", fontWeight: 700, color: "#9c27b0" }}>
          Địa điểm: {place}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          minWidth: 250,
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          size="medium"
          color="success"
          sx={{ textTransform: "none" }}
          onClick={handleClickDetail}
        >
          Xem chi tiết
        </Button>
        <Button
          variant="contained"
          size="medium"
          sx={{ textTransform: "none" }}
        >
          Đăng ký
        </Button>
      </Box>
    </Box>
  );
}
