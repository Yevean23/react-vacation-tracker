const SERVER_URL_LOCAL = "http://localhost";
const SERVER_URL_TKD_LAPTOP = "http://10.49.25.69";

const SERVER_PORT = "";

const SERVER_URL = SERVER_URL_LOCAL + SERVER_PORT;

const ENDPOINT = "month_records";

const get_all = async () => {
  let res = await fetch(`${SERVER_URL}/endpoints/${ENDPOINT}`, {
    method: "get",
  });
  let bod = await res.json();
  console.log("fetched", bod);
  return bod;
};

const get_filtered = async (filter) => {
  let res = await fetch(`${SERVER_URL}/endpoints/${ENDPOINT}/filter`, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ filter: filter }),
  });
  let bod = await res.json();
  console.log("fetched filtered", bod);
  return bod;
};

const get_joined = async ({ join_type, rtable, filter, select_cols }) => {
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

const add = async (item) => {
  let res = await fetch(`${SERVER_URL}/endpoints/${ENDPOINT}`, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
  let bod = await res.json();
  console.log("added", bod);
  return bod;
};

const update = async (item) => {
  let res = await fetch(`${SERVER_URL}/endpoints/${ENDPOINT}`, {
    method: "put",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
  let bod = await res.json();
  console.log("updated", bod);
  return bod;
};

const remove = async (item) => {
  let res = await fetch(`${SERVER_URL}/endpoints/${ENDPOINT}`, {
    method: "delete",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
  let bod = await res.json();
  console.log("deleted", bod);
  return bod;
};

const add_data = {
  employee: 1,
  month: 1,
  year: 2023,
};
const update_data = {
  employee: 1,
  month: 2,
  year: 2023,
};

const test = async () => {
  await get_all();
  let new_item = await add(add_data);
  let new_id = new_item.id;
  await get_all();
  await update({ ...update_data, id: new_id });
  await get_all();
  await remove({ id: new_id });
  await get_all();
  await get_filtered({ month: 1, year: 2023 });
  await get_joined({ join_type: "inner", rtable: "employees" });
  await get_joined({
    join_type: "inner",
    rtable: "employees",
    filter: { month: 1, year: 2023 },
  });
  await get_joined({
    select_cols: ['first_name','last_name'],
    join_type: "inner",
    rtable: "employees",
    filter: { month: 1, year: 2023 },
  });
};

if (require.main === module) {
  test();
}
