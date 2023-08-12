import { useEffect, useState } from "react";
import * as apiusers from "../../api/endpoints/users";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [oldUsers, setOldUsers] = useState([]);
  const [newUserId, setNewUserId] = useState('')

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

  const [newUserUserame, setNewUserUsername] = useState('')
  const [newUserPassword, setNewUserPassword] = useState('')
  const [newUserConfirmPassword, setNewUserConfirmPassword] = useState('')
  const addUserHandler = async () => {
    if(newUserConfirmPassword!==newUserPassword){
        return;
    }
    if(newUserPassword.length < 5){
        return;
    }
    const u = await apiusers.add({username: newUserUserame, password: newUserPassword, role: newUserRole})
    setNewUserUsername('')
    setNewUserConfirmPassword('')
    setNewUserPassword('')
    setNewUserId(u.id)
  }


  return (
    <>
      <h1>Admin</h1>

      <h3>Users</h3>
      <table>
        <tbody>
          <tr>
            {Object.keys({ ...users[0] }).map((value, i) => {
              return <td key={i}>{value}</td>;
            })}
          </tr>
          {users.map((el, i) => {
            return (
              <tr
                key={i}
                onChange={() => {
                  setTableDirty(true);
                }}
              >
                {Object.values({ ...el }).map((e, i) => {
                  if (Object.keys({ ...el })[i] === "role") {
                    return (
                      <td key={i}>
                        <select
                          value={e}
                          onChange={(ee) => {
                            updateUserRoleHandler(el, ee.target.value);
                          }}
                        >
                          <option value="user">user</option>
                          <option value="admin">admin</option>
                          <option value="employee">employee</option>
                        </select>
                      </td>
                    );
                  }
                  if (Object.keys({ ...el })[i] === "id") {
                    return <td key={i}>{e}</td>;
                  }
                  if (Object.keys({ ...el })[i] === "password") {
                    return (
                      <td key={i}>
                        <input
                          type="password"
                          value={e}
                          onChange={(ee) => {
                            updatePasswordHandler(el, ee.target.value);
                          }}
                        ></input>
                      </td>
                    );
                  }
                  return (
                    <td key={i}>
                      <input
                        type="text"
                        value={e}
                        onChange={(ee) => {
                          updateUsernameHandler(el, ee.target.value);
                        }}
                      ></input>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <button disabled={!tableDirty} onClick={cancelHandler}>
        Cancel
      </button>
      <button disabled={!tableDirty} onClick={saveHandler}>
        Save Changes
      </button>

      <h3>Add New User</h3>
      <input type="text" placeholder="username" value={newUserUserame} onChange={(el)=>{setNewUserUsername(el.target.value)}} />
      <input type="password" placeholder="password" value={newUserPassword} onChange={(el)=>{setNewUserPassword(el.target.value)}} />
      <input type="password" placeholder="confirm password" value={newUserConfirmPassword} onChange={(el)=>{setNewUserConfirmPassword(el.target.value)}} />
      <select
        value={newUserRole}
        onChange={(el) => {
          changeNewUserRoleHandler(el.target.value);
        }}
      >
        <option value="user">user</option>
        <option value="admin">admin</option>
        <option value="employee">employee</option>
      </select>
      <button onClick={addUserHandler}>Add User</button>
    </>
  );
}
