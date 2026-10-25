
import React from "react";
import "./styles/login.css";

import membership from "./assets/membership.png";
import lock from "./assets/lock.png";
import hat from "./assets/hat.png";
import pad from "./assets/pad.png";

function Login() {
  return (
    <div className="portal-page">
      <div className="portal-card">
        <header className="portal-header">
          <img
            src={membership}
            alt="Membership logo"
            className="membership-logo"
          />

          <div className="portal-title">
            <span className="membership">MEMBERSHIP</span>
            <span className="fee">FEE PORTAL</span>
          </div>
        </header>

        <div className="login-content">
          <img
            src={lock}
            alt="Lock icon"
            className="lock-icon"
          />

          <h1>Login</h1>
          <p className="login-subtitle">
            Sign in to your student account
          </p>

          <form action="/erp.php" method="POST">
            <label htmlFor="student_number">
              Student Number
            </label>

            <div className="input-box">
              <img src={hat} alt="" className="field-icon" />

              <input
                type="text"
                id="student_number"
                name="student_number"
                placeholder="Enter your student number"
                autoComplete="username"
                required
              />
            </div>

            <label htmlFor="password">Password</label>

            <div className="input-box">
              <img src={pad} alt="" className="field-icon" />

              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />
            </div>

            <div className="remember-row">
              <label className="remember-label">
                <input
                  type="checkbox"
                  name="remember"
                  value="yes"
                />
                <span>Remember me</span>
              </label>

              <a href="#forgot-password">
                Forgot password?
              </a>
            </div>

            <button type="submit" className="login-button">
              Login
            </button>
          </form>

          <p className="portal-footer">
            Membership Fee Portal
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
