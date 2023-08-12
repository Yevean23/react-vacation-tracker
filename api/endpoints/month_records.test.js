const add_data = {
    employee: 1,
    month: 1,
    year: 2023,
  };;
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
};

if (require.main === module) {
  test();
}