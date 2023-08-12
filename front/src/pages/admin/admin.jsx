import { useEffect, useState } from "react";
import * as apiusers from "../../api/endpoints/users";
import * as apiemployees from "../../api/endpoints/employees";
import FullTable from "../../components/fulltable";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [oldUsers, setOldUsers] = useState([]);
  const [newUserId, setNewUserId] = useState("");

  useEffect(() => {
    const get_users = async () => {
      const _users = await apiusers.get_all();
      setOldUsers(_users);
      setUsers(_users);
    };
    get_users();
  }, [newUserId]);

  const [newUserRole, setNewUserRole] = useState("user");
  const changeNewUserRoleHandler = (val) => {
    if(val==='employee'){
        setAddNewUserAsEmployee(true);
    }
    setNewUserRole(val);
  };

  const [tableDirty, setTableDirty] = useState(false);
  const saveHandler = () => {
    console.log("saving");
    users.forEach((el, i) => {
      if (oldUsers[i] !== el) {
        apiusers.update(el);
      }
    });
    setOldUsers(users);
    setTableDirty(false);
  };
  const cancelHandler = () => {
    console.log("cancel");
    setUsers(oldUsers);
    setTableDirty(false);
  };

  const updateUserRoleHandler = (e, val) => {
    const newval = { ...e, role: val };
    const newusers = users.filter((usr) => {
      return usr.id !== e.id;
    });
    newusers.push(newval);
    newusers.sort((a, b) => {
      return a.id - b.id;
    });
    setUsers(newusers);
  };

  const updatePasswordHandler = (e, val) => {
    const newval = { ...e, password: val };
    const newusers = users.filter((usr) => {
      return usr.id !== e.id;
    });
    newusers.push(newval);
    newusers.sort((a, b) => {
      return a.id - b.id;
    });
    setUsers(newusers);
  };
  const updateUsernameHandler = (e, val) => {
    const newval = { ...e, username: val };
    const newusers = users.filter((usr) => {
      return usr.id !== e.id;
    });
    newusers.push(newval);
    newusers.sort((a, b) => {
      return a.id - b.id;
    });
    setUsers(newusers);
  };

  const [newUserUserame, setNewUserUsername] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserConfirmPassword, setNewUserConfirmPassword] = useState("");

  const [newUserFirstName, setNewUserFirstName] = useState("");
  const [newUserLastName, setNewUserLastName] = useState("");
  const [newUserActive, setNewUserActive] = useState("Y");

  const [addNewUserAsEmployee, setAddNewUserAsEmployee] = useState(false)
  const addUserHandler = async () => {
    if (addNewUserAsEmployee) {
      if (!newUserFirstName || !newUserLastName) {
        return;
      }
    }
    if (newUserConfirmPassword !== newUserPassword) {
      return;
    }
    if (newUserPassword.length < 5) {
      return;
    }
    const u = await apiusers.add({
      username: newUserUserame,
      password: newUserPassword,
      role: newUserRole,
    });
    if (newUserRole === "employee") {
      apiemployees.add({
        first_name: newUserFirstName,
        last_name: newUserLastName,
        active: newUserActive,
      });
    }

    setNewUserUsername("");
    setNewUserConfirmPassword("");
    setNewUserPassword("");
    setNewUserFirstName('');
    setNewUserLastName('');
    setNewUserRole('user');
    setAddNewUserAsEmployee(false);
    setNewUserId(u.id);
  };

  return (
    <>
      <h1>Admin</h1>

      <h3>Users</h3>
        <FullTable api={apiusers} />
    </>
  );
}
