import * as apimonthrecords from "../../api/endpoints/month_records";
import FullTable from "../../components/fulltable";

export default function MonthRecordsPage() {
  return (
    <>
      <h1>Month Records</h1>

      <h3>Users</h3>
        <FullTable api={apimonthrecords} />
    </>
  );
}
