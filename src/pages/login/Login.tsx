import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./Login.css";
import { setDoctor, setPatient, setPublic } from "../../state/user/userSlice";
import CheckLogin from "../../utils/CheckLogin";
import { setLogged } from "../../state/logged/logSlice";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isDoctor, setIsDoctor] = useState(false);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      let type = 0;
      let email = username;
      if (isDoctor) {
        type = 1;
      }
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, type }),
      });

      if (response.ok) {
        localStorage.setItem("token", "123");
        if (type === 1) {
          dispatch(setDoctor());
        } else {
          dispatch(setPatient());
        }
        dispatch(setLogged());
        navigate("/");
      } else {
        // Handle failed login
        console.log("Login failed");
      }
    } catch (error) {
      // Handle error
      console.error("An error occurred:", error);
    }
  };

  function handleRadioButton() {
    setIsDoctor(!isDoctor);
  }

  useEffect(() => {
    const checkTokenValidity = async () => {
      const data = await CheckLogin();
      if (data.valid) {
        if (data.type === 1) {
          dispatch(setDoctor());
        } else if (data.type === 2) {
          dispatch(setPatient());
        } else {
          dispatch(setPublic());
        }
        navigate("/");
      }
    };

    checkTokenValidity();
  }, []);

  return (
    <div className="login-main">
      <div className="login-radio-container">
        <h3 className="login-radio-title">Login as:</h3>
        <div className="login-radio-inputs">
          <label className="login-radio">
            <input
              type="radio"
              name="radio"
              checked={isDoctor}
              onChange={handleRadioButton}
            />
            <span className="login-name">Doctor</span>
          </label>
          <label className="login-radio">
            <input
              type="radio"
              name="radio"
              checked={!isDoctor}
              onChange={handleRadioButton}
            />
            <span className="login-name">Patient</span>
          </label>
        </div>
      </div>
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              className="login-input"
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Username"
            />
          </div>
          <div className="form-group">
            <input
              className="login-input"
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
            />
          </div>
          <button className="login-button" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
