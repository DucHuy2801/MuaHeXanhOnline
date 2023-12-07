import React from "react";
import { Link } from "react-router-dom";

const AdminHeader = () => {
    return (
        <div className="leader-header">
            <div className="leader-header__navigate">
                <Link to="/admin/home">trang chủ</Link>
                <Link to="/admin/manage-project">Hoạt động</Link>
            </div>
            <div className="leader-header__logout">
                <Link to="/user/login">Đăng xuất</Link>
            </div>
        </div>
    );
};

export default AdminHeader;
