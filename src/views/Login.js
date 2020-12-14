import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Dimmer, Loader } from "semantic-ui-react";

import { useForm } from "react-hook-form";

export default function Login({ users }) {
  const { handleSubmit, register, errors } = useForm();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [wrongUser, setWrongUser] = useState();

  const onSubmit = (values) => {
    const theUser = users.find(
      (x) => x.email === values.email && x.password === values.password
    );
    if (theUser) {
      localStorage.setItem("user", JSON.stringify(theUser));
      history.push("/");
    } else {
      setWrongUser(true);
    }
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
              <h1 className="text-primary display-4">Login</h1>
              <hr />
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
                    onKeyUp={() => setWrongUser(false)}
                    className="form-control"
                    ref={register({
                      required: "Please enter the email",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    autoFocus
                  />
                  <p className="text-danger">
                    {errors.email && errors.email.message}
                  </p>
                  {wrongUser ? (
                    <p className="text-danger">
                      These credentials do not match our records
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
                    type="password"
                    className="form-control"
                    name="password"
                    ref={register({
                      required: "Please enter the password",
                    })}
                  />
                  <p className="text-danger">
                    {errors.password && errors.password.message}
                  </p>
                </div>
              </div>
              <div className="form-group row mb-0">
                <div className="col-md-6 offset-md-4">
                  <button type="submit" className="btn btn-primary btn-block">
                    Login
                  </button>

                  <Link className="btn btn-link btn-block" to="/">
                    Back
                  </Link>
                  <Link className="btn btn-link btn-block" to="/register">
                    Not a member? Create an account free
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
