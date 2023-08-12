import { useEffect, useState } from "react";
import * as apiemployees from "../../api/endpoints/employees";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const get_users = async () => {
      const _users = await apiemployees.get_all();
      console.log(_users);
      setEmployees(_users);
    };
    get_users();
  }, []);

  return (
    <>
      <h1>Employees</h1>
      <h3>All Employees</h3>

      <table>
        <tr>
          {Object.keys({ ...employees[0] }).map((value, i) => {
            return <td key={i}>{value}</td>;
          })}
        </tr>
        {employees.map((el, i) => {
          return (
            <tr key={i}>
              {Object.values({ ...el }).map((value, i) => {
                if (Object.keys({ ...el })[i] === "active") {
                  return (
                    <td key={i}>
                      <select value={value}>
                        <option value="Y">Y</option>
                        <option value="N">N</option>
                      </select>
                    </td>
                  );
                }
                if (Object.keys({ ...el })[i] === "id") {
                  return <td key={i}>{value}</td>;
                }
                return (
                  <td key={i}>
                    <input type="text" value={value}></input>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </table>
      <button>Cancel</button>
      <button>Save Changes</button>

      <h3>Add New Employee</h3>
      <input type="text" placeholder="first name" />
      <input type="text" placeholder="last name" />
      <select>
        <option>Active</option>
        <option>Not Active</option>
      </select>
      <button>Add Employee</button>
    </>
  );
}
