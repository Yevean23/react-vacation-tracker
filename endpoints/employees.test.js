const add_data = { first_name: "Eugene", last_name: "Vovk", active: "Y" };
const update_data = {
  first_name: "Eugene",
  last_name: "Vovk",
  active: "N",
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