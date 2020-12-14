import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import Navbar from "./views/Navbar";
import MyBudget from "./views/MyBudget";
import MyGroups from "./views/MyGroups";
import CreateGroup from "./views/CreateGroup";
import { jsonData } from "./data/jsonData";

function App() {
  const data = new jsonData();
  const [users, setUsers] = useState(data.users);
  const [members, setMembers] = useState(data.members);
  const [groups, setGroups] = useState(data.groups);
  const [rules] = useState(data.rules);
  const [group_member, setGroup_member] = useState(data.group_member);
  const [group_rule, setGroup_rule] = useState(data.group_rule);

  return (
    <div className="App d-flex flex-column h-screen justify-content-between">
      <main className="py-4">
        <Router>
          <Switch>
            <Route exact path="/">
              <Navbar />
              <Home
                members={members}
                groups={groups}
                group_member={group_member}
                group_rule={group_rule}
              />
            </Route>
            <Route exact path="/login">
              <Navbar />
              <Login users={users} />
            </Route>
            <Route exact path="/register">
              <Navbar />
              <Register
                users={users}
                setUsers={setUsers}
                members={members}
                setMembers={setMembers}
              />
            </Route>
            <Route exact path="/myBudget">
              <Navbar />
              <MyBudget />
            </Route>
            <Route exact path="/groups">
              <Navbar />
              <MyGroups
                users={users}
                groups={groups}
                group_rule={group_rule}
                rules={rules}
                group_member={group_member}
                setGroup_member={setGroup_member}
                members={members}
              />
            </Route>
            <Route exact path="/createGroup">
              <Navbar />
              <CreateGroup
                users={users}
                groups={groups}
                setGroups={setGroups}
                group_rule={group_rule}
                rules={rules}
                group_member={group_member}
                members={members}
                setMembers={setMembers}
                setGroup_member={setGroup_member}
              />
            </Route>
          </Switch>
        </Router>
      </main>
    </div>
  );
}

export default App;
