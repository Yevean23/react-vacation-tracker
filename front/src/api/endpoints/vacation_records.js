const SERVER_URL_LOCAL = "http://localhost";
//const SERVER_URL_TKD_LAPTOP = "http://10.49.25.69";

const SERVER_PORT = "";

const SERVER_URL = SERVER_URL_LOCAL + SERVER_PORT;

const ENDPOINT = "vacation_records";

export const get_all = async () => {
  let res = await fetch(`${SERVER_URL}/endpoints/${ENDPOINT}`, {
    method: "get",
  });
  let bod = await res.json();
  console.log("fetched", bod);
  return bod;
};

export const get_filtered = async (filter) => {
  let res = await fetch(`${SERVER_URL}/endpoints/${ENDPOINT}/filter`, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ filter: filter }),
  });
  let bod = await res.json();
  console.log("fetched", bod);
  return bod;
};

export const get_joined = async ({
  join_type,
  rtable,
  filter,
  select_cols,
}) => {
  let res = await fetch(`${SERVER_URL}/endpoints/${ENDPOINT}/join`, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      select_cols: select_cols,
      join_type: join_type,
      rtable: rtable,
      filter: filter,
    }),
  });
  let bod = await res.json();
  console.log("fetched joined", bod);
  return bod;
};

export const add = async (employee) => {
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

export const update = async (employee) => {
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

export const remove = async ({ employee_id }) => {
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
