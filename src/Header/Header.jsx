import React, { useState } from "react";
import styles from "./Header.module.scss";

import darkModeImg from "../assets/Group 3 (6).png";
import lightModeImg from "../assets/Group 3 (7).png";

const Header = ({setIsLight , isLight}) => {


  const lightMode = () => {
    setIsLight((prev) => (prev = !isLight));
  };

  return (
    <div className={isLight ? `${styles.main_true}` : `${styles.main_false}`}>
      <header className={styles.header}>
        <div className={styles.title}>
          <h1 className={styles.title_H1}>Where in the world?</h1>
        </div>
        <div className={styles.darkLightMode}   onClick={lightMode}>
          <img
            className={styles.darkimg}
            src={isLight?lightModeImg:darkModeImg}
            alt="dark mode"
          />
          <p className={styles.darkMode}>Dark Mode</p>
        </div>
      </header>
      <div className={styles.underline}></div>
    </div>
  );
};

export default Header;
