import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginForm.css'

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [frontEnd, setFrontEnd] = useState([])



  let errorArr = []


  useEffect(() => {
    if (credential.length <= 0) errorArr.push('Please Provide a credential')
    if (password.length <= 0) errorArr.push('Please Provide a password')
    setFrontEnd(errorArr)
    // setErrors(errorArr)
  }, [password, credential])
  // console.log('outside handle submit==>',errorArr)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    await dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(frontEnd)
          setErrors(data.errors)
          // console.log(data)
        }
      });

  }
  // console.log('======>', errors)

  const userLogin = async (e) => {
    setCredential('Demo-lition')
    setPassword('password')
    await dispatch(sessionActions.login({ credential: 'Demo-lition', password: 'password' }))
  }

  return (
    <div className="boxContainer">
      <form className="LoginForm" onSubmit={handleSubmit}>
        <div>
          <div className="errors">
            {/* <ul> */}
            {errors.map((error, idx) => (
              <li key={idx}>{error}<br /></li>
            ))}
            {/* </ul> */}
          </div>

          <label className="Loginlabel">
            Username or Email
            <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              // required
              className="Logininput"
            />
          </label>

          <label className="Loginlabel">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              // required
              className="Logininput"
            />
          </label>

        </div>

        <div className="buttons">
          <button className="Loginbutton" type="submit"
          // disabled={errors.length ? true : false}
          >Log In</button>
          <button className="Loginbutton" onClick={userLogin}>demoUser</button>
        </div>

      </form>
    </div>
  );
}

export default LoginForm;
