import React, { useState } from "react";
import "./Login.css";
import { withRouter } from "react-router-dom";
import axios from "axios";

function Login(props) {
  const navigateToSignup = () => {
    props.history.push("/register");
  };

  const [userlogin, setuserlogin] = useState({
    email: "",
    password: "",
  });

  const loginDetails = (event) => {
    setuserlogin({
      ...userlogin,
      [event.target.name]: event.target.value,
    });
  };

  const updateLogin = async () => {
    try {
      const response = await axios.post(
        "http://192.168.43.67:2000/users/login",
        userlogin
      );
      console.log(response);
      console.log( "responseData",response.data);
      const token = response.data.data.token;
      
      if (!response.data.error) {
        localStorage.setItem("loginToken",token)
        props.settoken(token)
        props.history.push("/home");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div class="container-fluid bg">
      <div class="row">
        <div class="col-lg-4 col-md-2 col-sm-12"></div>
        <div class="col-lg-4 col-md-8 col-sm-12">
          <form class="form-container">
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={userlogin.email}
                onChange={loginDetails}
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={userlogin.password}
                onChange={loginDetails}
                class="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div class="mb-3 form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="exampleCheck1"
              />
              <label class="form-check-label" for="exampleCheck1">
                Remember Me
              </label>
            </div>
            <button
              type="button"
              onClick={updateLogin}
              class="btn btn-primary"
              style={{ width: "100%" }}
            >
              Login
            </button>

            <div style={{ width: "100%", marginTop: "10px", display: "flex" }}>
              Doesn't have an account,&nbsp;
              <a onClick={navigateToSignup} href="#">
                <h6> Register Now </h6>
              </a>
            </div>
          </form>
        </div>
        <div class="col-lg-4 col-md-2 col-sm-12"></div>
      </div>
    </div>
  );
}

export default withRouter(Login);
