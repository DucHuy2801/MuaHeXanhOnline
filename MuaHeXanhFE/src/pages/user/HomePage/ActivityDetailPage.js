import React from "react";
import MainLayout from "../../../layouts/Mainlayout/Mainlayout";
import DetailActivity from "../../../layouts/ActivityDetail/ActivityDetail";

export default function ActivityDetailPage() {
  return (
    <div>
      <MainLayout content={<DetailActivity />} />
    </div>
  );
}
