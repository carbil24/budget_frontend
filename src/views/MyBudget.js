import React, { useState, useEffect } from "react";
import { Dimmer, Loader } from "semantic-ui-react";
import Image from "../images/undraw_online_cv_qy9w.png";

export default function MyBudget() {
  const [loading, setLoading] = useState(true);

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
          <div className="col-12 col-sm-12 col-lg-8 mx-auto">
            <div className="bg-white p-5 shadow rounded">
              <div className="d-flex justify-content-between align-items-center">
                <h1 className="text-primary display-4 mb-1">My Budget</h1>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <img src={Image} width="40%" alt="ima" />
              </div>
              <div className="d-flex justify-content-between align-items-center mb-2 mt-4 mr-4">
                <h3 className="text-primary display-5">
                  <a
                    data-toggle="collapse"
                    href="#incomes"
                    role="button"
                    aria-expanded="false"
                    aria-controls="incomes"
                  >
                    My Incomes
                  </a>
                </h3>
                <h3 id="newTotalIncome" className="text-primary display-5">
                  0
                </h3>
              </div>
              <div className="collapse" id="incomes">
                <div className="card card-body"></div>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-2 mt-4 mr-4">
                <h3 className="text-primary display-5">
                  <a
                    data-toggle="collapse"
                    href="#basicExpenses"
                    role="button"
                    aria-expanded="false"
                    aria-controls="basicExpenses"
                  >
                    My Basic Expenses
                  </a>
                </h3>
                <h3 id="newTotalBasic" className="text-primary display-5">
                  0
                </h3>
              </div>
              <div className="collapse" id="basicExpenses">
                <div className="card card-body"></div>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-2 mt-4 mr-4">
                <h3 className="text-primary display-5">
                  <a
                    data-toggle="collapse"
                    href="#otherExpenses"
                    role="button"
                    aria-expanded="false"
                    aria-controls="otherExpenses"
                  >
                    My Other Expenses
                  </a>
                </h3>
                <h3 id="newTotalOther" className="text-primary display-5">
                  0
                </h3>
              </div>
              <div className="collapse" id="otherExpenses">
                <div className="card card-body"></div>
              </div>
              <div className="d-flex justify-content-end align-items-center">
                <h3 className="text-primary display-5">_________</h3>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-2 mt-4 mr-4">
                <h3 className="text-primary display-5">Balance</h3>
                <h3 id="newBalance" className="text-primary display-5">
                  0
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
