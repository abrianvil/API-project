import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginForm.css'

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
        // console.log(res)
      }
    );
  };

  const userLogin=async(e)=>{
    await dispatch(sessionActions.login({credential:'Demo-lition',password:'password'}))
  }

  return (
    <form className="LoginForm" onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <label className="Loginlabel">
        Username or Email
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
          className="Logininput"
        />
      </label>
      <label className="Loginlabel">
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="Logininput"
        />
      </label>
      <button className="Loginbutton" type="submit">Log In</button>
      <button  className="Loginbutton" onClick={userLogin}>demoUser</button>
    </form>
  );
}

export default LoginForm;
