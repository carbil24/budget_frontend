import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { Dimmer, Loader } from "semantic-ui-react";

import { useForm } from "react-hook-form";

export default function Register({ users, setUsers, members, setMembers }) {
  const { handleSubmit, register, errors, watch } = useForm();
  const history = useHistory();
  const [userExists, setUserExists] = useState();
  const [loading, setLoading] = useState(true);

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = async (data) => {
    let theUser = users.find((x) => x.email === data.email);
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    if (!theUser) {
      theUser = {
        id: users[users.length - 1].id + 1,
        first_name: data.first_name
          .toLowerCase()
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
          .join(" "),
        last_name: data.last_name
          .toLowerCase()
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
          .join(" "),
        email: data.email,
        password: data.password,
      };
      setUsers([...users, theUser]);

      let theMember = members.find((x) => x.email === theUser.email);
      if (!theMember) {
        setMembers([
          ...members,
          {
            id: members[members.length - 1].id + 1,
            email: theUser.email,
            name: theUser.first_name + " " + theUser.last_name,
            created_at: today.toLocaleDateString(),
          },
        ]);
      } else {
        setMembers(
          members.map((x) => {
            if (x.email !== theUser.email) return x;
            return {
              ...x,
              name: theUser.first_name + " " + theUser.last_name,
            };
          })
        );
      }
      localStorage.setItem("user", JSON.stringify(theUser));
      history.push("/");
    } else {
      setUserExists(true);
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
