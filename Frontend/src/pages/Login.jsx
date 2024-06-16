import React, { useState } from 'react'
import "./Login.scss"

export const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const loginHanlder = (e) => {
        e.preventDefault();
    }
  return (
    <div className='login-page'>
        <form onSubmit={loginHanlder} className='login-form'>
            <h2>Login</h2>
            <p>username:</p>
            <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder='username' />
            <p>password:</p>
            <input onChange={(e) => setPassword(e.target.password)} type="password" placeholder='password' />
            <br />
            <button type='submit'>Login</button>
        </form>
    </div>
  )
}
