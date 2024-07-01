// src/components/SignUp.js

import React from "react";
import axios from "axios";
import "../components/SignUp.css";

const SignUp = () => {
  const handleOAuth = (provider) => {
    window.location.href = `/auth/${provider}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const name = e.target.name.value;

    axios
      .post("/api/register", { email, name })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container">
      <div className="signup-box">
        <h1>BoomAI</h1>
        <div className="oauth-buttons">
          <button className="google" onClick={() => handleOAuth("google")}>
            Sign up with Google
          </button>
          <button className="facebook" onClick={() => handleOAuth("facebook")}>
            Sign up with Facebook
          </button>
          <button
            className="microsoft"
            onClick={() => handleOAuth("microsoft")}
          >
            Sign up with Microsoft
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" required />
          <input type="text" name="name" placeholder="Name" required />
          <button type="submit">Get Started</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
