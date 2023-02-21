import React, { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../api";
import { Button, TextField } from "@mui/material";
import "./index.css";

const Login = ({ setToken, navigate }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  ////////////////////////////////////////////////////////////////
  const handleSubmit = async () => {
    const results = await loginUser(username, password);
    console.log(results);
    if (results.token) {
      setToken(results.token);
      console.log("Successfully signed in");
      window.localStorage.setItem("token", results.token);
      navigate("/");
    } else {
      console.log("Error logging in");
      setError(true);
      document.getElementsByName("username")[0].value = "";
      document.getElementsByName("password")[0].value = "";
    }
  };
  ////////////////////////////////////////////////////////////////
  return (
    <div className="login-main-div">
      <div className={error ? "error" : "loginForm"}>
        <form
          className="loginTemplate"
          autoComplete="off"
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit();
            setError(false);
          }}
        >
          <TextField
            style={{ margin: ".25rem" }}
            label="Enter Username"
            name="username"
            type="text"
            onChange={(event) => setUsername(event.target.value)}
          />

          <TextField
            style={{ margin: ".25rem" }}
            label="Enter Password"
            name="password"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />

          {/* <p className={error ? 'errorMessage' : 'hidden'}>Username or password is incorrect</p> */}
          <Button
            style={{
              borderRadius: 35,
              background: "black",
              opacity: "70%",
              color: "orange",
              borderColor: "black",
              height: "3rem",
              margin: ".25rem",
            }}
            variant="contained"
            type="submit"
          >
            Login
          </Button>
          {/* <p className={error ? 'errorMessage2' : 'hidden'}>New here? <Link to='/register' id='sign-in-msg'>Create an account</Link></p> */}
        </form>
      </div>
    </div>
  );
};

export default Login;
