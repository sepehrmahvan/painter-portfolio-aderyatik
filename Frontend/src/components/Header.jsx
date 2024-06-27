import React, { useContext, useState } from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import { MyContext } from "../Context/Context";
import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";


export default function Header() {
  const { logoData } = useContext(MyContext);

  const [showMenu, setShowMenu] = useState("-100%");

  return (
    <header>
      <button onClick={() => setShowMenu("0")} className="menu-btn">
        <IoMenu />
      </button>
      <nav>
        <Link to={"/"}>HOME</Link>
        <Link to={"/works"}>WORKS</Link>
        <Link to={"/video-arts"}>VIDEO ARTS</Link>
        <a href="#about-me">ABOUT</a>
        <a href="#contact-me">CONTACT</a>
      </nav>
      <div className="logo">
        <img src={`https://api.aderyatik.com/api/${logoData}`} alt="" />
      </div>
      {/* menu */}
      <div style={{left: showMenu}} className="menu">
        <div className="menu-container">
          <Link to={"/"}>HOME</Link>
          <Link to={"/works"}>WORKS</Link>
          <Link to={"/video-arts"}>VIDEO ARTS</Link>
          <a href="#about-me">ABOUT</a>
          <a href="#contact-me">CONTACT</a>
          <span onClick={() => setShowMenu("-100%")} className="close-menu"><IoMdClose /></span>
        </div>
      </div>
    </header>
  );
}
