import React, { useState } from "react";
import { toast } from "react-toastify";
import "./UpdatePassword.scss";
import { Link } from "react-router-dom";

export const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const changePasswordHandler = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (
      oldPassword !== "" &&
      newPassword !== "" &&
      confirmPassword !== "" &&
      email !== ""
    ) {
      if (newPassword === confirmPassword) {
        try {
          const response = await fetch(
            "https://api.aderyatik.com/api/updatepassword",
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: token,
              },
              body: JSON.stringify({
                oldPassword,
                newPassword,
                confirmPassword,
                email,
              }),
            }
          );
          const result = response.json();
          console.log(result);
          toast.success("password has been changes succesfully")
        } catch (error) {
          toast.error(error);
        }
      } else{
        toast.error("your new password and confirm password are not match together")
      }
    } else{
        toast.error("you need to fill empty inputs")
    }
  };

  return (
    <div className="update-password-page">
      <form onSubmit={changePasswordHandler}>
        <h2>Change Password</h2>
        <p>old password</p>
        <input
          type="password"
          placeholder="old password"
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <p>new password</p>
        <input
          type="password"
          placeholder="new password"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <p>confirm new password</p>
        <input
          type="password"
          placeholder="repeat new password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <p>email</p>
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Link to={'/login'}>Login</Link>
        <br />
        <button type="submit">change password</button>
      </form>
    </div>
  );
};
