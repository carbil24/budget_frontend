import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { Dimmer, Loader } from "semantic-ui-react";
import Avatar from "react-avatar";

import Image from "../images/undraw_online_cv_qy9w.png";

export default function MyGroups({
  users,
  groups,
  rules,
  group_rule,
  members,
  group_member,
  setGroup_member,
}) {
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(-1);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setTimeout(function () {
      setLoading(false);
    }, 1300);
  }, []);

  const handleClose = () => setShow(false);

  const handleShow = (i) => setShow(i);

  const member = members.find((x) => x.email === user.email);

  const groupsIds = group_member
    .filter((x) => x.member_id === member.id)
    .map((x) => x.group_id);

  const myGroups = groups.filter((x) => groupsIds.includes(x.id));

  return (
    <div className="container mt-5">
      {loading ? (
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      ) : (
        <div className="row">
          <div className="col-12 col-sm-10 col-lg-8 mx-auto">
            <div className="bg-white p-5 shadow rounded">
              <h1 className="text-primary display-4 mb-0">My Groups</h1>
              <div className="d-flex justify-content-center align-items-center">
                <img src={Image} width="40%" alt="ima" />
              </div>
              <ul className="list-group">
                {myGroups.length > 0 ? (
                  myGroups.map((group, i) => {
                    const participantsIds = group_member
                      .filter((x) => x.group_id === group.id)
                      .map((x) => x.member_id);
                    const participants = members.filter((x) =>
                      participantsIds.includes(x.id)
                    );
                    const creator = users.find(
                      (x) => x.email === group.created_by
                    );
                    const rulesIds = group_rule
                      .filter((x) => x.group_id === group.id)
                      .map((x) => x.rule_id);

                    const theRules = rules.filter((x) =>
                      rulesIds.includes(x.id)
                    );

                    const isJoined = group_member.find(
                      (x) =>
                        x.member_id === member.id && x.group_id === group.id
                    ).joined;
                    const isRulesAccepted = group_member.find(
                      (x) =>
                        x.member_id === member.id && x.group_id === group.id
                    ).rules_accepted;
                    return (
                      <li
                        className="list-group-item border-0 mb-3 shadow-sm"
                        key={i}
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          {isJoined ? (
                            !isRulesAccepted ? (
                              !group.rules_set ? (
                                <h2>
                                  <Link
                                    className="text-secondary d-flex justify-content-between align-items-center"
                                    to="/groups"
                                    onClick={() =>
                                      alert("Please set the rules to continue")
                                    }
                                  >
                                    {group.name}
                                  </Link>
                                </h2>
                              ) : (
                                <h2>
                                  <Link
                                    className="text-secondary d-flex justify-content-between align-items-center"
                                    to="/groups"
                                    onClick={() =>
                                      alert(
                                        "Please accept the rules to continue"
                                      )
                                    }
                                  >
                                    {group.name}
                                  </Link>
                                </h2>
                              )
                            ) : (
                              <h2>
                                <Link
                                  className="text-secondary d-flex justify-content-between align-items-center"
                                  to="/groups"
                                  onClick={() => alert("Showing the group")}
                                >
                                  {group.name}
                                </Link>
                              </h2>
                            )
                          ) : (
                            <h2>
                              <Link
                                className="text-secondary d-flex justify-content-between align-items-center"
                                to="/groups"
                                onClick={() =>
                                  alert("You must join the group to continue")
                                }
                              >
                                {group.name}
                              </Link>
                            </h2>
                          )}
                          <button
                            className="btn btn-primary"
                            onClick={() => handleShow(i)}
                          >
                            Rules
                          </button>
                        </div>
                        {group.created_by === user ? (
                          <p className="text-secondary">
                            Created by you on {group.created_at}
                          </p>
                        ) : (
                          <p className="text-secondary">
                            Created by {creator.first_name} {creator.last_name}{" "}
                            on {group.created_at}
                          </p>
                        )}

                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            {participants.map((participant, i) => {
                              return (
                                <Avatar
                                  size="40"
                                  round={true}
                                  key={i}
                                  name={participant.name}
                                  data-toggle="tooltip"
                                  title={
                                    participant.name + " - " + participant.email
                                  }
                                >
                                  {participant.initials +
                                    " - " +
                                    participant.email}
                                </Avatar>
                              );
                            })}
                          </div>
                          {/*<!-- Modal -->*/}
                          <Modal
                            show={show === i}
                            onHide={handleClose}
                            animation={true}
                          >
                            <Modal.Header closeButton>
                              <Modal.Title>Rules of {group.name}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <ul className="list-group">
                                {theRules.length > 0 ? (
                                  theRules.map((rule, i) => {
                                    return (
                                      <li
                                        className="list-group-item border-0 mb-3 shadow-sm"
                                        key={i}
                                      >
                                        <p className="text-secondary">
                                          {rule.description}
                                        </p>
                                      </li>
                                    );
                                  })
                                ) : (
                                  <li className="list-group-item border-0 mb-3 shadow-sm">
                                    Rules have not been set yet
                                  </li>
                                )}
                              </ul>
                            </Modal.Body>
                            <Modal.Footer>
                              {isJoined ? (
                                !isRulesAccepted ? (
                                  !group.rules_set ? (
                                    <>
                                      <Button
                                        variant="secondary"
                                        onClick={handleClose}
                                      >
                                        Close
                                      </Button>
                                      <Button
                                        variant="secondary"
                                        onClick={handleClose}
                                      >
                                        Set Rules
                                      </Button>
                                    </>
                                  ) : (
                                    <>
                                      <Button
                                        variant="secondary"
                                        onClick={handleClose}
                                      >
                                        Close
                                      </Button>
                                      <Button
                                        variant="secondary"
                                        onClick={handleClose}
                                      >
                                        Accept Rules
                                      </Button>
                                    </>
                                  )
                                ) : (
                                  <Button
                                    variant="secondary"
                                    onClick={handleClose}
                                  >
                                    Close
                                  </Button>
                                )
                              ) : (
                                <Button
                                  variant="secondary"
                                  onClick={handleClose}
                                >
                                  Close
                                </Button>
                              )}
                            </Modal.Footer>
                          </Modal>
                          {!isJoined ? (
                            <div className="d-flex justify-content-end align-items-center">
                              <button
                                className="btn btn-primary"
                                onClick={() => {
                                  setGroup_member(
                                    group_member.map((x) => {
                                      if (
                                        x.group_id !== group.id ||
                                        x.member_id !== member.id
                                      )
                                        return x;
                                      return {
                                        ...x,
                                        joined: true,
                                      };
                                    })
                                  );
                                }}
                              >
                                Join
                              </button>
                              <button
                                className="btn btn-danger"
                                onClick={() => {
                                  setGroup_member(
                                    group_member.filter(
                                      (x) =>
                                        x.group_id !== group.id ||
                                        x.member_id !== member.id
                                    )
                                  );
                                }}
                              >
                                Reject
                              </button>
                            </div>
                          ) : null}
                        </div>
                      </li>
                    );
                  })
                ) : (
                  <li className="list-group-item border-0 mb-3 shadow-sm">
                    There is no groups to show
                  </li>
                )}
              </ul>

              <Link className="btn btn-link btn-block" to="/">
                Back
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
