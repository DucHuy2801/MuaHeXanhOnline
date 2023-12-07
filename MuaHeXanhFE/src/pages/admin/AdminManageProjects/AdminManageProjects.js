import React, { useCallback, useEffect, useState } from "react";
import AdminHeader from "../../../components/AdminHeader/AdminHeader";
import { Table } from "antd";
import { getAllProjects } from "../../../api";

const AdminManageProjects = () => {
    const [dataRejected, setDataRejected] = useState([]);
    const [dataConfirmed, setDataConfirmed] = useState([]);
    const columns = [
        {
            title: "ID",
            dataIndex: "project_id",
            key: "project_id",
            align: "center",
        },
        {
            title: "Tiêu đề",
            dataIndex: "title",
            key: "title",
            align: "center",
        },
        {
            title: "Địa điểm",
            dataIndex: "location",
            key: "location",
            align: "center",
        },
        {
            title: "Trường",
            dataIndex: "school",
            key: "school",
            align: "center",
        },
        {
            title: "Nội dung",
            dataIndex: "content",
            key: "content",
            align: "center",
        },
    ];

    const handleGetConfirmed = useCallback(async () => {
        const response = await getAllProjects();
        if (response?.status === 200) {
            const filteredData = response?.data.metadata.data.filter(
                (item) => item.status === "Được xét duyệt"
            );
            setDataConfirmed(filteredData);
        }
    }, []);

    const handleGetRejected = useCallback(async () => {
        const response = await getAllProjects();
        if (response?.status === 200) {
            const filteredData = response?.data.metadata.data.filter(
                (item) => item.status === "Từ chối"
            );
            setDataRejected(filteredData);
        }
    }, []);

    useEffect(() => {
        handleGetConfirmed();
    }, [handleGetConfirmed]);

    useEffect(() => {
        handleGetRejected();
    }, [handleGetRejected]);

    return (
        <div>
            <AdminHeader />
            <div className="manage-projects">
                <h2 className="manage-projects__title">
                    Danh sách các hoạt động đã được duyệt
                </h2>
                <div className="manage-projects__table">
                    <Table
                        dataSource={dataConfirmed}
                        columns={columns}
                        pagination={false}
                    />
                </div>
            </div>
            <div className="manage-projects">
                <h2 className="manage-projects__title">
                    Danh sách các hoạt động đã từ chối
                </h2>
                <div className="manage-projects__table">
                    <Table
                        dataSource={dataRejected}
                        columns={columns}
                        pagination={false}
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminManageProjects;
