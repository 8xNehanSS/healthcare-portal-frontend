import React, { useState } from "react";
import "./Login.css";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isDoctor, setIsDoctor] = useState(false);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Add login logic here
  };

  function handleRadioButton() {
    setIsDoctor(!isDoctor);
  }

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
