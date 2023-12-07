import Header from "../../../components/Leader/Header/Header";
import { Button, Modal, Form, Input, Select, Spin, Table } from "antd";
import { createProject, getAllProjects } from "../../../api/index";
import "./style.scss";
import { useCallback, useEffect, useState } from "react";
import Message from "../../../components/Message";

const LeaderHomePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setIsLoading] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [isReload, setIsReload] = useState(false);
    const [form] = Form.useForm();
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        const formValues = form.getFieldsValue();
        setIsLoading(true);
        const response = await createProject(formValues);
        if (response?.status === 201) {
            setIsReload(!isReload);
            Message.sendSuccess("Hoạt động mới đã được tạo!");
        } else {
            Message.sendError("Tạo hoạt động thất bại");
        }
        setIsLoading(false);
        setIsModalOpen(false);
        form.resetFields();
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleGetAllProject = useCallback(async () => {
        const response = await getAllProjects();
        if (response?.status === 200) {
            setTableData(response?.data.metadata.data);
        }
    }, []);

    useEffect(() => {
        handleGetAllProject();
    }, [handleGetAllProject, isReload]);
    const options = [
        {
            value: "Đại học Bách Khoa TPHCM",
            label: "Đại học Bách Khoa TPHCM",
        },
        {
            value: "Đại học công nghệ thông tin",
            label: "Đại học công nghệ thông tin",
        },
    ];

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
            title: "Số lượng SV",
            dataIndex: "number_of_students",
            key: "number_of_students",
            align: "center",
        },
        {
            title: "Đã đăng ký",
            dataIndex: "current_number",
            key: "current_number",
            align: "center",
            render: (text) => (text !== null ? text : 0),
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            align: "center",
        },
    ];

    return (
        <Spin tip="Loading..." spinning={loading}>
            <Header />
            <div className="leader-home-content">
                <div className="leader-home-content__btn">
                    <Button type="primary" onClick={showModal}>
                        Thêm hoạt động
                    </Button>
                </div>
                <div className="leader-home-content__table">
                    <Table
                        dataSource={tableData}
                        columns={columns}
                        pagination={false}
                    />
                    ;
                </div>
            </div>
            <div className="add-project-modal">
                <Modal
                    title="Thêm hoạt động"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Form
                        form={form}
                        name="basic"
                        layout="vertical"
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Tiêu đề"
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập Tiêu đề",
                                },
                            ]}
                        >
                            <Input placeholder="Tiêu đề" />
                        </Form.Item>
                        <Form.Item
                            label="Địa điểm"
                            name="location"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập Địa điểm",
                                },
                            ]}
                        >
                            <Input placeholder="Địa điểm" />
                        </Form.Item>
                        <Form.Item
                            label="Trường"
                            name="school"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng chọn trường học",
                                },
                            ]}
                        >
                            <Select
                                style={{
                                    width: "100%",
                                }}
                                placeholder="Trường"
                                options={options}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Nội dung"
                            name="content"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Vui lòng nhập Nội dung của hoạt động",
                                },
                            ]}
                        >
                            <Input.TextArea rows={4} placeholder="Nội dung" />
                        </Form.Item>
                        <Form.Item
                            label="Số lượng SV"
                            name="number_of_students"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập Số lượng SV",
                                },
                            ]}
                        >
                            <Input placeholder="Số lượng sinh viên" />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </Spin>
    );
};

export default LeaderHomePage;
