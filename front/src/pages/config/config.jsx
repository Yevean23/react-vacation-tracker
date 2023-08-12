export default function ConfigPage() {
  return (
    <>
      <h1>Config</h1>
      <table>
        <thead>
          <tr>
            <h3>Add New Absense Type</h3>
          </tr>
          <tr>
            <td>
              <input type="text" placeholder="Type of absense" />
            </td>
            <td>
              <input type="text" placeholder="Shorthand" />
            </td>
            <td>
              <input type="color" />
            </td>
            <td>
              <button>Add Type</button>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <h3>Absense Types</h3>
          </tr>
          <tr>
            <td>
              <input placeholder="type" />
            </td>
            <td>
              <input placeholder="type" />
            </td>
            <td>
              <input type="color" />
            </td>
            <td>
                <button>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
