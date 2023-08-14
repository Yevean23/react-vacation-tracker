import { Link } from "react-router-dom";

export default function NavHeader() {
  return (
    <>
      <ul style={{display:'flex', columnGap:'20px', listStyleType: 'none' }}>
        <li>
          <Link to="/admin">admin</Link>
        </li>
        <li>
          <Link to="/employees">employees</Link>
        </li>
        <li>
          <Link to="/config">config</Link>
        </li>
        <li>
          <Link to="/month_records">month recs</Link>
        </li>
        <li>
          <Link to="/vacation_records">vacay recs</Link>
        </li>
        <li>
          <Link to="/tracking">track</Link>
        </li>
      </ul>
    </>
  );
}
