import React, { useEffect, useState } from "react";
import MainLayout from "../../../layouts/Mainlayout/Mainlayout";
import Activity from "../../../components/Activity/Activity";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TimeVN from "../../../untils/timeVN";
import { getAllProjects } from "../../../api";

const Child = () => {
  const navigate = useNavigate();

  const [listProject, setListProject] = useState([]);

  useEffect(() => {
    const loadListProject = async () => {
      const res = await getAllProjects();
      setListProject(res.data.metadata.data);
    };

    loadListProject();
  }, []);
  const handleClickDetail = (id) => {
    navigate(`/user/home/detail?id=${id}`);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      {listProject &&
        listProject?.map((index) => (
          <Activity
            title={index.title}
            content={index.content}
            time={TimeVN(index.createdAt)}
            place={index.location}
            handleClickDetail={() => handleClickDetail(index.project_id)}
          />
        ))}
    </Box>
  );
};

export default function HomePage() {
  return (
    <div>
      <MainLayout title="Tất cả các hoạt động" content={<Child />} />
    </div>
  );
}
