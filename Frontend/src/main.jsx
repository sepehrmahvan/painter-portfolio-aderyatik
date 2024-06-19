import React from "react";
import ReactDOM from "react-dom/client";
import "./main.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import { MyProvider } from "./Context/Context";
import { Toolbar } from "./pages/Toolbar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Login } from "./pages/Login";
import { UpdatePassword } from "./pages/UpdatePassword";
import { LoginError } from "./pages/LoginError";

const token = localStorage.getItem("token");

ReactDOM.createRoot(document.getElementById("root")).render(
  <MyProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/toolbar" element={token ? <Toolbar/> : <LoginError/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="/update-password" element={<UpdatePassword/>}/>
      </Routes>
      <ToastContainer/>
    </BrowserRouter>
  </MyProvider>
);
