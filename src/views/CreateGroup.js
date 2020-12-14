import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Dimmer, Loader } from "semantic-ui-react";
import ChipInput from "material-ui-chip-input";

import { useForm } from "react-hook-form";

import Image from "../images/undraw_online_cv_qy9w.png";

export default function CreateGroup({
  groups,
  setGroups,
  rules,
  group_rule,
  members,
  setMembers,
  group_member,
  setGroup_member,
}) {
  const { handleSubmit, register, errors } = useForm();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const [theMembers, setTheMembers] = useState([]);
  const [badEmail, setBadEmail] = useState();
  const [emptyMembers, setEmptyMembers] = useState();

  const onSubmit = (data) => {
    const newMembers = members;
    const newGroupMembers = group_member;
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    if (theMembers.length === 0) {
      setEmptyMembers(true);
    } else {
      setEmptyMembers(false);
      let theGroup = {
        id: groups[groups.length - 1].id + 1,
        name: data.name,
        members: theMembers.length + 1,
        created_by: user.email,
        rules_set: false,
        created_at: today.toLocaleDateString(),
      };
      setGroups([...groups, theGroup]);

      newGroupMembers.push({
        group_id: theGroup.id,
        member_id: members.find((x) => x.email === user.email).id,
        joined: true,
        rules_accepted: false,
      });

      theMembers.map((member, i) => {
        let theMember = members.find((x) => x.email === member);
        if (!theMember) {
          theMember = {
            id: members[members.length - 1].id + 1,
            email: member,
            name: "No Name",
            created_at: today.toLocaleDateString(),
          };
          newMembers.push(theMember);
        }
        newGroupMembers.push({
          group_id: theGroup.id,
          member_id: theMember.id,
          joined: false,
          rules_accepted: false,
        });
      });
      setMembers(newMembers);
      setGroup_member(newGroupMembers);
    }
    setBadEmail(false);
    history.push("/");
  };

  useEffect(() => {
    setTimeout(function () {
      setLoading(false);
    }, 1300);
  });

  const handleAddChip = async (chip) => {
    var mailformat = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (chip.match(mailformat)) {
      if (chip !== user.email) {
        setTheMembers((theMembers) => [...theMembers, chip]);
      }
      setBadEmail(false);
    } else {
      setBadEmail(true);
    }
  };
  const handleDeleteChip = async (chip, i) => {
    setTheMembers((theMembers) =>
      theMembers.filter((chip, index) => index !== i)
    );
    setBadEmail(false);
  };

  const handleKeyUp = (e) => {
    if (
      e.keyCode !== 13 &&
      e.keyCode !== 188 &&
      e.keyCode !== 32 &&
      e.keyCode !== 9
    ) {
      setEmptyMembers(false);
      setBadEmail(false);
    }
  };
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
              <h1 className="text-primary display-4">Create Group</h1>
              <div className="d-flex justify-content-center align-items-center">
                <img src={Image} width="40%" alt="ima" />
              </div>
              <hr />
              <div className="form-group row">
                <div className="col-12 col-sm-12 col-lg-12">
                  <label htmlFor="name">Name</label>

                  <input
                    className="form-control bg-light shadow-sm"
                    name="name"
                    ref={register({
                      required: "You must enter the name of the group",
                    })}
                    placeholder="Please enter the name of the group..."
                    autoFocus
                  />
                  <p className="text-danger">
                    {errors.name && errors.name.message}
                  </p>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-12 col-sm-12 col-lg-12">
                  <label htmlFor="new_member">Add other members</label>
                  <div className="row mb-2">
                    <div className="col-12 col-sm-12 col-lg-12">
                      <ChipInput
                        type="email"
                        onKeyUp={handleKeyUp}
                        fullWidth
                        newChipKeyCodes={[32, 188, 9]}
                        className="bg-light shadow-sm"
                        value={theMembers}
                        placeholder="Please enter the email of the members..."
                        onAdd={(chip) => handleAddChip(chip)}
                        onDelete={(chip, index) =>
                          handleDeleteChip(chip, index)
                        }
                      />
                      {badEmail ? (
                        <p className="text-danger">
                          You must enter a valid email address
                        </p>
                      ) : null}
                      {emptyMembers ? (
                        <p className="text-danger">
                          You must enter minimum one member
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>

              <button className="btn btn-primary btn-lg btn-block">
                Create
              </button>
              <Link className="btn btn-link btn-block" to="/">
                Back
              </Link>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
