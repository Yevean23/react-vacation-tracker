export default function TrackerPage() {
  return (
    <>
      <h1>Vacaction Tracker</h1>
      <div style={{ display: "flex" }}>
        <button>prev</button>
        <h3>Year:</h3>
        <select>
          <option>2023</option>
          <option>2022</option>
          <option>2021</option>
        </select>
        <button>next</button>
      </div>

      <br />
      <div style={{ display: "flex" }}>
        <button>prev</button>
        <h5>Month:</h5>

        <select>
          <option>June</option>
          <option>July</option>
          <option>August</option>
        </select>
        <button>next</button>
      </div>

      <br />

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
    </>
  );
}
