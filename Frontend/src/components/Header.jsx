import React, { useContext } from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import { MyContext } from "../Context/Context";

export default function Header() {
  const { logoData } = useContext(MyContext);
  console.log( "sdfsdfsdfds");
  return (
    <header>
      <nav>
        <Link to={"/"}>HOME</Link>
        <Link to={"/works"}>WORKS</Link>
        <Link to={"/video-arts"}>VIDEO ARTS</Link>
        <a href="#">ABOUT</a>
        <a href="CONTACT">CONTACT</a>
      </nav>
      <div className="logo">
        <img src={`http://localhost:5000/${logoData}`} alt="" />
      </div>
    </header>
  );
}
