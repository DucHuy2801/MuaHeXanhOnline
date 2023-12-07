import React, { useCallback, useEffect, useState } from "react";
import AdminHeader from "../../../components/AdminHeader/AdminHeader";
import { Table, Button } from "antd";
import { approveProject, getAllProjects } from "../../../api/index";
import "./style.scss";
import Message from "../../../components/Message";

const AdminHomePage = () => {
    const [tableData, setTableData] = useState([]);
    const [isReload, setIsReload] = useState(false);

    const hanldeApprove = async (data) => {
        const { project_id } = data;
        const response = await approveProject(project_id, {
            status: "Được xét duyệt",
        });
        if (response?.status === 200) {
            setIsReload(!isReload);
            Message.sendSuccess("Xác nhận thành công");
        } else {
            Message.sendError("Xác nhận không thành công");
        }
    };

    const handleReject = async (data) => {
        const { project_id } = data;
        const response = await approveProject(project_id, {
            status: "Từ chối",
        });
        if (response?.status === 200) {
            setIsReload(!isReload);
            Message.sendSuccess("Đã từ chối");
        } else {
            Message.sendError("Từ chối không thành công");
        }
    };
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
        {
            title: "",
            key: "action",
            align: "center",
            render: (text, record, index) => (
                <div
                    style={{
                        display: "flex",
                        gap: "20px",
                        justifyContent: "center",
                    }}
                >
                    <Button
                        type="primary"
                        onClick={() => hanldeApprove(record)}
                    >
                        Xác nhận
                    </Button>
                    <Button
                        danger
                        type="primary"
                        onClick={() => handleReject(record)}
                    >
                        Từ chối
                    </Button>
                </div>
            ),
        },
    ];

    const handleGetAllProjects = useCallback(async () => {
        const response = await getAllProjects();
        if (response?.status === 200) {
            const filteredData = response?.data.metadata.data.filter(
                (item) => item.status === "Chờ xét duyệt"
            );
            setTableData(filteredData);
        }
    }, []);

    useEffect(() => {
        handleGetAllProjects();
    }, [handleGetAllProjects, isReload]);
    return (
        <div>
            <AdminHeader />
            <div className="manage-projects">
                <h2 className="manage-projects__title">
                    Danh sách các hoạt động mới
                </h2>
                <div className="manage-projects__table">
                    <Table
                        dataSource={tableData}
                        columns={columns}
                        pagination={false}
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminHomePage;
