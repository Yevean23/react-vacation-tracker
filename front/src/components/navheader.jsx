import { Link } from "react-router-dom";

export default function NavHeader(){
    return(
        <>
            <ul>
                <li>
                    <Link to='/admin'>admin</Link>
                </li>
                <li>
                    <Link to='/employees'>employees</Link>
                </li>
                <li>
                    <Link to='/config'>config</Link>
                </li>
                <li>
                    <Link to='/tracking'>track</Link>
                </li>
            </ul>
        </>
    );
}