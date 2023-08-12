const SERVER_URL_LOCAL = "http://localhost";
const SERVER_URL_TKD_LAPTOP = "http://10.49.25.69";

const SERVER_PORT = "";

const SERVER_URL = SERVER_URL_LOCAL + SERVER_PORT;

const ENDPOINT = "users";

const get_all = async () => {
  let res = await fetch(`${SERVER_URL}/endpoints/${ENDPOINT}`, {
    method: "get",
  });
  let bod = await res.json();
  console.log("fetched", bod);
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
  username: 'regina',
  password: 'regina',
  role: 'user',
};
const update_data = {
  role: 'admin',
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
};

if (require.main === module) {
  test();
}
