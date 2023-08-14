import * as apivacationrecords from "../../api/endpoints/vacation_records";
import FullTable from "../../components/fulltable";

export default function VactionRecordsPage() {
  return (
    <>
      <h1>Vacation Records</h1>

      <h3>Users</h3>
        <FullTable api={apivacationrecords} />
    </>
  );
}
