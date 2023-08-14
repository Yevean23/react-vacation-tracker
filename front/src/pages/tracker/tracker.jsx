import * as apimonthrecords from "../../api/endpoints/month_records";
import * as apivacationrecords from "../../api/endpoints/vacation_records";
import { useState } from "react";
import JoinTable from "../../components/jointable";
import FullMonthTable from "../../components/fullmonthtable";
export default function TrackerPage() {
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(2023);

  return (
    <>
      <h1>Vacaction Tracker</h1>
      <div style={{ display: "flex" }}>
        <button
          onClick={() => {
            setYear(year - 1);
          }}
        >
          prev
        </button>
        <h3>Year:</h3>
        <select>
          <option>2023</option>
          <option>2022</option>
          <option>2021</option>
        </select>
        <button
          onClick={() => {
            setYear(year + 1);
          }}
        >
          next
        </button>
      </div>

      <br />
      <div style={{ display: "flex" }}>
        <button
          onClick={() => {
            setMonth(((month + 10) % 12) + 1);
          }}
        >
          prev
        </button>
        <h5>Month:</h5>

        <select>
          <option>June</option>
          <option>July</option>
          <option>August</option>
        </select>
        <button
          onClick={() => {
            setMonth((month % 12) + 1);
          }}
        >
          next
        </button>
      </div>

      <br />

      {/* <JoinTable
        api={apimonthrecords}
        rtable={"employees"}
        filter={{ month: month, year: year }}
        select_cols={["*"]}
        //select_cols={["month_records.employee_id","first_name", "last_name"]}
      /> */}
      <JoinTable
        api={apivacationrecords}
        rtable={"month_records"}
        filter={{ month: month, year: year }}
        select_cols={["*"]}
        //select_cols={["month_records.employee_id","first_name", "last_name"]}
      />


    </>
  );
}
