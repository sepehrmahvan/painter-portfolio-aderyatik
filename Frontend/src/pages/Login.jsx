import React, { useState } from "react";
import "./Login.scss";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(null);

  const navigate = useNavigate();

  const loginHanlder = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email:username, password:password }),
      });
      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.message || "Failed to login");
      }
      const result = await response.json();
      localStorage.setItem('token', result.token);
      navigate('/toolbar');
      toast.success(result.message);
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error(error.message)
    }
  };
  return (
    <div className="login-page">
      <form onSubmit={loginHanlder} className="login-form">
        <h2>Login</h2>
        <p>username:</p>
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="username"
        />
        <p>password:</p>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          value={password}
          placeholder="password"
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
