import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Dimmer, Loader } from "semantic-ui-react";

import { useForm } from "react-hook-form";
import Axios from "axios";
import UserContext from "../context/UserContext";

export default function Register() {
  const { handleSubmit, register, errors, watch } = useForm();
  const history = useHistory();
  const [userExists, setUserExists] = useState();
  const [loading, setLoading] = useState(true);

  const { setUserData } = useContext(UserContext);

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = async (data) => {
    const newUser = {
      firstName: data.first_name
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
        .join(" "),
      lastName: data.last_name
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
        .join(" "),
      email: data.email,
      password: data.password,
    };

    try {
      await Axios.post("http://localhost:4000/api/auth/register", newUser);
    } catch (err) {
      if (err.response.data.message === "Email already exists")
        setUserExists(true);
      return;
    }

    const loginRes = await Axios.post("http://localhost:4000/api/auth/login", {
      email: newUser.email,
      password: newUser.password,
    });

    setUserData({
      token: loginRes.data.token,
      user: loginRes.data.user,
    });

    localStorage.setItem("x-access-token", loginRes.data.token);
    history.push("/");
  };

  useEffect(() => {
    setTimeout(function () {
      setLoading(false);
    }, 1300);
  });

  return (
    <div className="container mt-5">
      {loading ? (
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      ) : (
        <div className="row">
          <div className="col-12 col-sm-10 col-lg-6 mx-auto">
            <form
              className="bg-white shadow rounded py-3 px-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <h1 className="text-primary display-4">Register</h1>
              <hr />
              <div className="form-group row">
                <label
                  htmlFor="first_name"
                  className="col-md-4 col-form-label text-md-right"
                >
                  First Name
                </label>

                <div className="col-md-6">
                  <input
                    className="form-control"
                    name="first_name"
                    ref={register({
                      required: "You must enter you first name",
                    })}
                    autoFocus
                  />
                  <p className="text-danger">
                    {errors.first_name && errors.first_name.message}
                  </p>
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="last_name"
                  className="col-md-4 col-form-label text-md-right"
                >
                  Last Name
                </label>

                <div className="col-md-6">
                  <input
                    className="form-control"
                    name="last_name"
                    ref={register({
                      required: "You must enter you last name",
                    })}
                  />
                  <p className="text-danger">
                    {errors.last_name && errors.last_name.message}
                  </p>
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="email"
                  className="col-md-4 col-form-label text-md-right"
                >
                  E-Mail Address
                </label>

                <div className="col-md-6">
                  <input
                    name="email"
                    onKeyUp={(e) => {
                      if (e.keyCode !== 13) setUserExists(false);
                    }}
                    className="form-control"
                    ref={register({
                      required: "You must enter an email",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  <p className="text-danger">
                    {errors.email && errors.email.message}
                  </p>
                  {userExists ? (
                    <p className="text-danger">
                      The email has already been taken
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="password"
                  className="col-md-4 col-form-label text-md-right"
                >
                  Password
                </label>

                <div className="col-md-6">
                  <input
                    className="form-control"
                    name="password"
                    type="password"
                    ref={register({
                      required: "You must specify a password",
                      minLength: {
                        value: 8,
                        message: "Password must have at least 8 characters",
                      },
                    })}
                  />
                  <p className="text-danger">
                    {errors.password && errors.password.message}
                  </p>
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="confirm_password"
                  className="col-md-4 col-form-label text-md-right"
                >
                  Confirm Password
                </label>

                <div className="col-md-6">
                  <input
                    className="form-control"
                    name="confirm_password"
                    type="password"
                    ref={register({
                      validate: (value) =>
                        value === password.current ||
                        "The passwords do not match",
                    })}
                  />
                  <p className="text-danger">
                    {errors.confirm_password && errors.confirm_password.message}
                  </p>
                </div>
              </div>

              <div className="form-group row mb-0 ">
                <div className="col-md-6 offset-md-4">
                  <button type="submit" className="btn btn-primary btn-block">
                    Register
                  </button>
                  <Link className="btn btn-link btn-block" to="/">
                    Back
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
