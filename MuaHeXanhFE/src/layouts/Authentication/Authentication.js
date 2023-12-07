import React from "react";
import { Box } from "@mui/material";
import Bg from "../../assets/images/bg.jpg";
import styles from "./Authentication.module.scss";

export default function AuthenticationLayout({ children }) {
  return (
    <Box className={styles.container}>
      <Box className={styles.content}>
        <Box className={styles.children}>{children}</Box>
      </Box>
      <Box className={styles.imagebg}>
        <img src={Bg} alt="" />
      </Box>
    </Box>
  );
}
