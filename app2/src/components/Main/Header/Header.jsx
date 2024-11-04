import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import { useAuth } from "../../../contexts/AuthContext";

const Header = ({ setSideMenu, sideMenu }) => {
  const { currentUser } = useAuth();
  const [greetings, setGreetings] = useState("Hello");

  const today = new Date();
  const currentTime = today.getHours();

  const handleClick = () => {
    setSideMenu(!sideMenu);
  };

  useEffect(() => {
    if (currentTime >= 0 && currentTime < 5) {
      setGreetings("Good night");
    } else if (currentTime >= 5 && currentTime < 12) {
      setGreetings("Good morning");
    } else if (currentTime >= 12 && currentTime < 16) {
      setGreetings("Good afternoon");
    } else {
      setGreetings("Good evening");
    }
  }, [currentTime]);

  return (
    <header className={styles.header}>
      {/* <div className="mt-2 mb-10 ml-4 flex items-center gap-1">
        <img className="w-6 h-6" src="/favicon2.ico" ></img>
        <h1 className="text-white text-2xl font-bold" >
          
          <a href="/">Productivity Hub</a>
        </h1>
      </div> */}
      <a href="http://localhost:3000/" style={{textDecoration: "none",  color: "#3f4765", fontWeight: "600",fontSize: "28px", marginRight: "auto" , marginLeft: "30px"}}>Productivity Hub</a>

      <button
        className={`${styles.menuToggle} ${sideMenu ? styles.isActive : null}`}
        onClick={handleClick}
      >
        Menu
      </button>
      <h1 style={{marginRight: "auto"}}>
        {" "}
        {`${greetings}${
          currentUser.displayName !== null
            ? `, ${currentUser.displayName}`
            : ", welcome to this app"
        }!`}
      </h1>
    </header>
  );
};

export default Header;
