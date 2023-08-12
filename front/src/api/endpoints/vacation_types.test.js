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
