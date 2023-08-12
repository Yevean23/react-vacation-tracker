import { Outlet } from "react-router-dom";
import NavHeader from "./components/navheader";

export default function App(){
    return(
        <>
            <NavHeader/>
            <Outlet />
        </>
    );
}