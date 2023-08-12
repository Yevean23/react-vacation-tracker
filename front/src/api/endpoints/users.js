const SERVER_URL_LOCAL = "http://localhost";
// const SERVER_URL_TKD_LAPTOP = "http://10.49.25.69";

const SERVER_PORT = "";

const SERVER_URL = SERVER_URL_LOCAL + SERVER_PORT;

const ENDPOINT = "users";

export const get_all = async () => {
  let res = await fetch(`${SERVER_URL}/endpoints/${ENDPOINT}`, {
    method: "get",
  });
  let bod = await res.json();
  console.log("fetched", bod);
  return bod;
};

export const add = async (item) => {
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

export const update = async (item) => {
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

export const remove = async (item) => {
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

