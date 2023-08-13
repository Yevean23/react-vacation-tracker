import * as apimonthrecords from "../../api/endpoints/month_records";
import * as apivacationrecords from "../../api/endpoints/vacation_records";
import { useState } from "react";
import JoinTable from "../../components/jointable";
import FullMonthTable from "../../components/fullmonthtable";
export default function TrackerPage() {
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(2023);

  const [rows, setRows] = useState([]);
  const updateRowsHandler = (dat) => {
    console.log("dat", dat);
    setRows(dat);
  };
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

      <JoinTable key={rows}
        api={apimonthrecords}
        rtable="employees"
        filter={{ month: month, year: year }}
        select_cols={["first_name", "last_name"]}
        updateRowsHandler={(w) => {
          updateRowsHandler();
        }}
      />

      <FullMonthTable key={rows}
        api={apivacationrecords}
        filter={{ month: month, year: year }}
        rows={rows}
      />

      {/*
      <button>Add All Active Employees</button>
      <button>Copy From Last Month</button>
      <input type="text" placeholder="search for employee"></input>
      <select>
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </select>
      <button>Add Single</button>







      <table>
        <tr>
          <td></td>
          <td></td>
          Days
          <td></td>
        </tr>
        <tr>
          <td>Employees</td>
          <td></td>

          <td>01</td>
          <td>02</td>
          <td>03</td>
        </tr>
        <tr>
          <td>delete</td>
          <td>First Name</td>
          <td>Last Name</td>

          <td>wed</td>
          <td>thu</td>
          <td>fri</td>
        </tr>
        <tr>
          <td>
            <button>del</button>
          </td>
          <td>huge</td>
          <td>euge</td>

          <td>
            <select>
              <option></option>
              <option>F</option>
              <option>M</option>
            </select>
          </td>
          <td>
            <select>
              <option></option>
              <option>F</option>
              <option>M</option>
            </select>
          </td>
          <td>
            <select>
              <option></option>
              <option>F</option>
              <option>M</option>
            </select>
          </td>
        </tr>
      </table>


        */}
    </>
  );
}
