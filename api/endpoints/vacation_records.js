import { SERVER_URL } from "./config";

const ENDPOINT = __filename;

const fetch_employees = async () => {
  let res = await fetch(`${SERVER_URL}/endpoints/${ENDPOINT}`, {
    method: "get",
  });
  let bod = await res.json();
  console.log("fetched", bod);
  return bod;
};

const add_employee = async (employee) => {
  let res = await fetch(`${SERVER_URL}/endpoints/${ENDPOINT}`, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });
  let bod = await res.json();
  console.log("added", bod);
  return bod;
};

const update_employee = async (employee) => {
  let res = await fetch(`${SERVER_URL}/endpoints/${ENDPOINT}`, {
    method: "put",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });
  let bod = await res.json();
  console.log("updated", bod);
  return bod;
};

const delete_employee = async ({ employee_id }) => {
  let res = await fetch(`${SERVER_URL}/endpoints/${ENDPOINT}/${employee_id}`, {
    method: "delete",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  let bod = await res.json();
  console.log("deleted", bod);
  return bod;
};

const test = async () => {
  await fetch_employees();
  let new_emp = await add_employee({ first_name: "Eugene", last_name: "Vovk" });
  new_emp = new_emp.employee_id;
  await fetch_employees();
  await update_employee({
    first_name: "Eugene",
    last_name: "Vovk",
    active: "N",
    employee_id: new_emp,
  });
  await fetch_employees();
  await delete_employee({ employee_id: new_emp });
  await fetch_employees();
};

if (require.main === module) {
  test();
}
