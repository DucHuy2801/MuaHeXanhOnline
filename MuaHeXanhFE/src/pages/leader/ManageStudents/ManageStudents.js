import React, { useCallback, useEffect, useState } from "react";
import Header from "../../../components/Leader/Header/Header";
import {
    getAllApplications,
    getStudentById,
    getActById,
    approveApplication,
} from "../../../api/index";
import { Table, Button, Modal } from "antd";
import Message from "../../../components/Message";
import "./style.scss";

const ManageStudents = () => {
    const [tableData, setTableData] = useState([]);
    const [dataApproved, setDataApproved] = useState([]);
    const [dataRejected, setDataRejected] = useState([]);
    const [studentData, setStudentData] = useState([]);
    const [modalStudent, setModalStudent] = useState(false);
    const [actData, setActData] = useState([]);
    const [modalAct, setModalAct] = useState(false);
    const [isRerender, setIsRerender] = useState(false);
    
    const viewStudent = async (data) => {
        setModalStudent(true);
        const { mssv_student } = data;
        const response = await getStudentById(mssv_student);
        if (response?.status === 200) {
            setStudentData(response?.data.data);
        }
    };

    const viewActivity = async (data) => {
        setModalAct(true);
        const { apply_id } = data;
        const response = await getActById(apply_id);
        if (response?.status === 200) {
            setActData(response?.data.data);
        }
    };

    const handleCloseModalStudent = () => {
        setModalStudent(false);
    };

    const handleCloseModalAct = () => {
        setModalAct(false);
    };
    const columns = [
        {
            title: "ID của Hoạt động",
            dataIndex: "apply_id",
            key: "apply_id",
            align: "center",
        },
        {
            title: "SV đăng ký",
            dataIndex: "mssv_student",
            key: "mssv_student",
            align: "center",
        },
        {
            title: "Chi tiết",
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
                    <Button type="default" onClick={() => viewActivity(record)}>
                        Xem Hoạt động
                    </Button>
                    <Button type="default" onClick={() => viewStudent(record)}>
                        Xem SV
                    </Button>
                </div>
            ),
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
                        onClick={() => handleApprove(record)}
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

    const columns2 = [
        {
            title: "ID của Hoạt động",
            dataIndex: "apply_id",
            key: "apply_id",
            align: "center",
        },
        {
            title: "SV đăng ký",
            dataIndex: "mssv_student",
            key: "mssv_student",
            align: "center",
        },
        {
            title: "Chi tiết",
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
                    <Button type="default" onClick={() => viewActivity(record)}>
                        Xem Hoạt động
                    </Button>
                    <Button type="default" onClick={() => viewStudent(record)}>
                        Xem SV
                    </Button>
                </div>
            ),
        },
    ];

    const handleApprove = async (data) => {
        const { apply_id } = data;
        const response = await approveApplication(apply_id, {
            status: true,
        });
        if (response?.status === 200) {
            setIsRerender(!isRerender);
            Message.sendSuccess("Xác nhận thành công");
        } else {
            Message.sendError("Xác nhận không thành công");
        }
    };

    const handleReject = async (data) => {
        const { apply_id } = data;
        const response = await approveApplication(apply_id, {
            status: false,
        });
        if (response?.status === 200) {
            setIsRerender(!isRerender);
            Message.sendSuccess("Đã từ chối");
        } else {
            Message.sendError("Từ chối không thành công");
        }
    };

    const handleGetAllApplication = useCallback(async () => {
        const response = await getAllApplications();
        if (response?.status === 200) {
            const filteredData = response?.data.metadata.data.filter(
                (item) => item.status === null
            );
            setTableData(filteredData);
        }
    }, []);

    const getDataApproved = useCallback(async () => {
        const response = await getAllApplications();
        if (response?.status === 200) {
            const filteredData = response?.data.metadata.data.filter(
                (item) => item.status === true
            );
            setDataApproved(filteredData);
        }
    }, []);

    const getDataRejected = useCallback(async () => {
        const response = await getAllApplications();
        if (response?.status === 200) {
            const filteredData = response?.data.metadata.data.filter(
                (item) => item.status === false
            );
            setDataRejected(filteredData);
        }
    }, []);

    useEffect(() => {
        handleGetAllApplication();
    }, [handleGetAllApplication, isRerender]);

    useEffect(() => {
        getDataApproved();
    }, [getDataApproved, isRerender]);

    useEffect(() => {
        getDataRejected();
    }, [getDataRejected, isRerender]);

    return (
        <div className="manage-student">
            <Header />
            <h2 className="manage-student__title">
                Danh sách sinh viên đã đăng ký
            </h2>
            <div className="manage-student__table">
                <Table
                    dataSource={tableData}
                    columns={columns}
                    pagination={false}
                />
            </div>
            <h2 className="manage-student__title">
                Danh sách đã được xác nhận
            </h2>
            <div className="manage-student__table">
                <Table
                    dataSource={dataApproved}
                    columns={columns2}
                    pagination={false}
                />
            </div>
            <h2 className="manage-student__title">Danh sách đã bị từ chối</h2>
            <div className="manage-student__table">
                <Table
                    dataSource={dataRejected}
                    columns={columns2}
                    pagination={false}
                />
            </div>
            <div className="manage-student__student-info">
                <Modal
                    title="Thông tin sinh viên"
                    open={modalStudent}
                    onCancel={handleCloseModalStudent}
                    footer={false}
                >
                    {studentData && (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "14px",
                                fontSize: "16px",
                            }}
                        >
                            <div>
                                <span
                                    style={{
                                        display: "inline-block",
                                        width: "80px",
                                        fontWeight: "600",
                                    }}
                                >
                                    Email:
                                </span>
                                <span>{studentData?.gmail}</span>
                            </div>
                            <div>
                                <span
                                    style={{
                                        display: "inline-block",
                                        width: "80px",
                                        fontWeight: "600",
                                    }}
                                >
                                    MSSV:
                                </span>
                                <span>{studentData?.school}</span>
                            </div>
                            <div>
                                <span
                                    style={{
                                        display: "inline-block",
                                        width: "80px",
                                        fontWeight: "600",
                                    }}
                                >
                                    Trường:
                                </span>
                                <span>{studentData?.mssv}</span>
                            </div>
                        </div>
                    )}
                </Modal>
            </div>
            <div className="manage-student__act-info">
                <Modal
                    title="Thông tin hoạt động"
                    open={modalAct}
                    onCancel={handleCloseModalAct}
                    footer={false}
                >
                    {actData && (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "14px",
                                fontSize: "16px",
                            }}
                        >
                            <div>
                                <span
                                    style={{
                                        display: "inline-block",
                                        width: "120px",
                                        fontWeight: "600",
                                    }}
                                >
                                    Tiêu đề:
                                </span>
                                <span>{actData?.title}</span>
                            </div>
                            <div>
                                <span
                                    style={{
                                        display: "inline-block",
                                        width: "120px",
                                        fontWeight: "600",
                                    }}
                                >
                                    Địa điểm:
                                </span>
                                <span>{actData?.location}</span>
                            </div>
                            <div>
                                <span
                                    style={{
                                        display: "inline-block",
                                        width: "120px",
                                        fontWeight: "600",
                                    }}
                                >
                                    Trường:
                                </span>
                                <span>{actData?.school}</span>
                            </div>
                            <div>
                                <span
                                    style={{
                                        display: "inline-block",
                                        width: "120px",
                                        fontWeight: "600",
                                    }}
                                >
                                    Số lượng SV:
                                </span>
                                <span>{actData?.number_of_students}</span>
                            </div>
                            <div>
                                <span
                                    style={{
                                        display: "inline-block",
                                        width: "120px",
                                        fontWeight: "600",
                                    }}
                                >
                                    Đã đăng ký:
                                </span>
                                <span>{actData?.current_number}</span>
                            </div>
                        </div>
                    )}
                </Modal>
            </div>
        </div>
    );
};

export default ManageStudents;
