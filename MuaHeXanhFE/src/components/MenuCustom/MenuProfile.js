import * as React from "react";
import { useEffect, useState } from "react";
import { Button, MenuItem, Divider, Box, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import StyledMenu from "./StyledMenu";
import styles from "./MenuCustom.module.scss";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { ArrowDropDown, Person, LogoutOutlined } from "@mui/icons-material";
import { getProfile } from "../../api";

export default function CustomizedMenus() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    localStorage.removeItem("JWT");
    navigate("/user/login");
  };

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const loadUserProfile = async () => {
      const token = localStorage.getItem("JWT");
      if (token) {
        const json = jwtDecode(token);

        if (json.mssv) {
          const res = await getProfile(json.mssv);
          setEmail(res.data.data.gmail);
          setUsername(res.data.data.username);
        } else {
          toast.error("Phiên đăng nhập đã hết hạn");
          navigate("/user/login");
        }
      }
    };

    loadUserProfile();
  }, []);

  return (
    <div className={styles.menu_custom}>
      <Box>
        <Button
          id="demo-customized-button"
          aria-controls={open ? "demo-customized-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          variant="contained"
          disableElevation
          onClick={handleClick}
          startIcon={<Avatar sx={{ bgcolor: "green" }}></Avatar>}
          endIcon={<ArrowDropDown />}
          size="large"
          className={styles.button}
        >
          {username}
        </Button>
      </Box>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} disableRipple>
          {email}
        </MenuItem>

        <Divider sx={{ my: 0.5 }} />
        <Link to="/user/profile" class={styles.link}>
          <MenuItem onClick={handleClose} disableRipple>
            <Person />
            Tài khoản của tôi
          </MenuItem>
        </Link>

        <Link to="/user/login" class={styles.link}>
          <MenuItem onClick={handleLogout} disableRipple>
            <LogoutOutlined />
            Đăng xuất
          </MenuItem>
        </Link>
      </StyledMenu>
    </div>
  );
}
