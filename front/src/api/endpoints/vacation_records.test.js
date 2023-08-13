const test = async () => {
  await get_all();
  let new_emp = await add({ first_name: "Eugene", last_name: "Vovk" });
  new_emp = new_emp.employee_id;
  await get_all();
  await update({
    first_name: "Eugene",
    last_name: "Vovk",
    active: "N",
    employee_id: new_emp,
  });
  await get_all();
  await remove({ employee_id: new_emp });
  await get_all();
};

if (require.main === module) {
  test();
}
