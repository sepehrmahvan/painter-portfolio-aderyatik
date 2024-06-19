import React from "react";
import "./LoginError.scss";
import { MdOutlineErrorOutline } from "react-icons/md";

export const LoginError = () => {
  return (
    <div className="login-error-page">
      <span className="error-icon">
        <MdOutlineErrorOutline />
      </span>
      <span>you need to login to see this page</span>
    </div>
  );
};
