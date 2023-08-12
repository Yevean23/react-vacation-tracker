import { useEffect, useState } from "react";
import * as apiemployees from "../../api/endpoints/employees";
import FullTable from "../../components/fulltable";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [oldEmployees, setOldEmployees] = useState([]);
  const [newEmployeeId, setNewEmployeeId] = useState("");
  const [tableDirty, setTableDirty] = useState(false);

  useEffect(() => {
    const get_users = async () => {
      const _users = await apiemployees.get_all();
      console.log(_users);
      setEmployees(_users);
    };
    get_users();
  }, [newEmployeeId]);

  const [newEmployeeFirstName, setNewEmployeeFirstName] = useState("");
  const [newEmployeeLastName, setNewEmployeeLastName] = useState("");
  const [newEmployeeActive, setNewEmployeeActive] = useState("Y");

  const updateTextTableHandler = (index, id, column_name, new_value) => {
    //apiemployees.update({})
    let newval = employees;
    newval = newval[index];
    newval[column_name] = new_value;

    const newels = employees.filter((el) => {
      return el.id !== id;
    });
    newels.push(newval);
    newels.sort((a, b) => {
      return a.id - b.id;
    });

    console.log(index, id, column_name, new_value);
    console.log(newels);

    setEmployees(() => {
      return newels;
    });
  };

  const saveTableChangesHandler = () => {
    employees.forEach((empl, i) => {
      if (oldEmployees[i] !== empl) {
        apiemployees.update(empl);
      }
    });
    setOldEmployees(employees);
    setTableDirty(false);
  };
  const cancelTableChangesHandler = () => {
    setEmployees(() => {
      return oldEmployees;
    });
    setTableDirty(false);
  };

  const addEmployeeHandler = async () => {
    const n = await apiemployees.add({
      first_name: newEmployeeFirstName,
      last_name: newEmployeeLastName,
      active: newEmployeeActive,
    });
    setNewEmployeeId(n);
  };

  const updateActiveHandler = (e, val) => {
    const newval = { ...e, active: val };
    const newusers = employees.filter((usr) => {
      return usr.id !== e.id;
    });
    newusers.push(newval);
    newusers.sort((a, b) => {
      return a.id - b.id;
    });
    setEmployees(newusers);
  };

  return (
    <>
      <h1>Employees</h1>
      <h3>All Employees</h3>

      <FullTable api={apiemployees} />
    </>
  );
}
