// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const demoUserLogin = () => {
    const demoUserCredentials = {
      credential: "Demo-lition",
      password: "password"
    };
    dispatch(sessionActions.login(demoUserCredentials))
      .then(() => {
        closeModal();
        alert("Demo user logged in 😎");
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <div id='LogInForm'>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
      {errors.credential && <p className="error">{errors.credential}</p>}
        <label>
          <input
            type="text"
            value={credential}
            onChange={(e) => {
              setCredential(e.target.value);
              setIsUsernameValid(e.target.value.length >= 4);
            }}
            placeholder="Enter username or email"
          />
        </label>
        <label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setIsPasswordValid(e.target.value.length >= 6);
            }}
            placeholder="Enter password"
          />
        </label>
        {/* {errors.credential && <p className="error">{errors.credential}</p>} */}
        <button
          id='submitbutton'
          type="submit"
          disabled={!isUsernameValid || !isPasswordValid}
          className={`submitButton ${!isUsernameValid || !isPasswordValid ? 'disabled' : ''}`}
          >Log In
        </button>
        <span className="demoUserLink" onClick={demoUserLogin}>Demo User</span>
      </form>
    </div>
  );
}

export default LoginFormModal;
