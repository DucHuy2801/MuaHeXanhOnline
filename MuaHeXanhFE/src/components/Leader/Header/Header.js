import { Link } from "react-router-dom";
import "./style.scss";

const Header = () => {
    return (
        <div className="leader-header">
            <div className="leader-header__navigate">
                <Link to="/leader/home">trang chủ</Link>
                <Link to="/leader/manage-student">sinh viên</Link>
            </div>
            <div className="leader-header__logout">
                <Link to="/user/login">Đăng xuất</Link>
            </div>
        </div>
    );
};

export default Header;
