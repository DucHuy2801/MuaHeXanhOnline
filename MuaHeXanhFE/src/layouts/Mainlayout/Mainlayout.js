import React, { useState } from "react";
import styles from "./Mainlayout.module.scss";
import {
  Menu,
  NotificationsNoneOutlined,
  Add,
  AssessmentOutlined,
  AddCommentOutlined,
  SettingsOutlined,
  Dashboard,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import MenuProfile from "../../components//MenuCustom/MenuProfile";


export default function Mainlayout({ title, content }) {
  const listNavbar = [
    {
      id: 1,
      icon: <Dashboard />,
      title: "Tất cả hoạt động",
      active: "home",
    },
    {
      id: 2,
      icon: <AssessmentOutlined />,
      title: "Hoạt động đã đăng ký",
      active: "success",
    },
    { id: 3, icon: <AddCommentOutlined />, title: "Hoạt động đang chờ", active: "pending" },
    { id: 3, icon: <AddCommentOutlined />, title: "Tài khoản của tôi", active: "profile" },
  ];

  return (
    <div className={styles.mainlayout}>
      <div
        className={styles.header}
      >
        <div className={styles.header_left}>
          <div className={styles.menu}>
            <Menu />
          </div>
          
        </div>
        <div className={styles.header_right}>
          <div>
            <NotificationsNoneOutlined />
          </div>

          <MenuProfile />
        </div>
      </div>
        <div className={styles.container}>
          <div className={`${styles.navbar}`}>
            <div className={styles.logo}>
              <div>Logo</div>
            </div>
            <div className={styles.navbarTop}>
              {listNavbar.map((item) => {
                return (
                  <NavLink
                    key={item.id}
                    to={`/user/${item.active}`}
                    className={`${styles.item} ${
                      window.location.pathname.endsWith(item.active)
                        ? styles.itemActive
                        : ""
                    }`}
                  >
                    <div>{item.icon}</div>
                    <div>{item.title}</div>
                  </NavLink>
                );
              })}
            </div>
            <div className={styles.navbarBottom}>
              <div className={styles.setting}>
                <div>
                  <SettingsOutlined />
                </div>
                <div>Cài đặt</div>
              </div>
            </div>
          </div>

          <div className={styles.title_content}>
            <div className={styles.title}>{title}</div>
            <div className={styles.content}>{content}</div>
          </div>
        </div>
      
    </div>
  );
}
