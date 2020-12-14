import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dimmer, Loader } from "semantic-ui-react";

import Image from "../images/undraw_online_cv_qy9w.png";

export default function Home({ members, groups, group_member, group_rule }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(function () {
      setLoading(false);
    }, 1300);
  });

  // console.log(members);
  // console.log(groups);
  // console.log(group_member);
  // console.log(group_rule);

  return (
    <div className="container mt-5">
      {loading ? (
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      ) : (
        <div className="row">
          <div className="col-12 col-sm-10 col-lg-6 mx-auto">
            <div className="bg-white p-5 shadow rounded">
              {user ? (
                <>
                  <h1 className="col-12 text-primary text-center display-5 mb-0">
                    Hey {user.first_name}. Please select an option:
                  </h1>
                  <hr />
                  <Link to="/myBudget">
                    <span className="btn btn-primary btn-lg btn-block mt-3">
                      Manage My Budget
                    </span>
                  </Link>
                  <Link to="/groups">
                    <span className="btn btn-primary btn-lg btn-block mt-3">
                      See My Groups
                    </span>
                  </Link>
                  <Link to="/createGroup">
                    <span className="btn btn-primary btn-lg btn-block mt-3">
                      Create a New Group
                    </span>
                  </Link>
                </>
              ) : (
                <>
                  <h1 className="col-12 text-primary text-center display-5 mb-0">
                    Welcome to BUDGET!
                  </h1>
                  <hr />
                  <div className="d-flex justify-content-center align-items-center">
                    <Link
                      to="/login"
                      className="btn btn-primary btn-lg btn-block mb-2"
                    >
                      Login
                    </Link>
                  </div>
                  <div className="d-flex justify-content-center align-items-center">
                    <Link
                      to="/register"
                      className="btn btn-primary btn-lg btn-block mb-2"
                    >
                      Register
                    </Link>
                  </div>
                </>
              )}
              <div className="d-flex justify-content-center align-items-center">
                <img src={Image} width="50%" alt="im" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
