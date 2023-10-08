import axios from "axios";
import React, { useState } from "react";
import { withRouter } from "react-router-dom";

function Register(props) {
  const navigateToLogin = () => {
    props.history.push("/");
  };

  const [registerUser, setregisterUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const userDetails = (event) => {
    setregisterUser({
      ...registerUser,
      [event.target.name]: event.target.value,
    });
  };

  const sendDetails = async () => {
    try {
      const response = await axios.post(
        "http://192.168.43.67:2000/users/register",
        registerUser
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
    setregisterUser({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  };

  return (
    <div class="container-fluid bg" style={{ marginTop: "-49px" }}>
      <div class="row">
        <div class="col-lg-4 col-md-2 col-sm-12"></div>
        <div class="col-lg-4 col-md-8 col-sm-12">
          <form class="form-container">
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={registerUser.firstName}
                onChange={userDetails}
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>

            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={registerUser.lastName}
                onChange={userDetails}
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>

            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={registerUser.email}
                onChange={userDetails}
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
                value={registerUser.password}
                onChange={userDetails}
                class="form-control"
                id="exampleInputPassword1"
              />
            </div>

            <button
              type="button"
              onClick={sendDetails}
              class="btn btn-primary btn-block"
              style={{ width: "100%" }}
            >
              Register
            </button>

            <div style={{ width: "100%", marginTop: "10px", display: "flex" }}>
              Already have an account,&nbsp;
              <a onClick={navigateToLogin} href="#">
                <h6> Login </h6>
              </a>
            </div>
          </form>
        </div>
        <div class="col-lg-4 col-md-2 col-sm-12"></div>
      </div>
    </div>
  );
}

export default withRouter(Register);
