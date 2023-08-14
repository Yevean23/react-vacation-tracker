import { useEffect, useState } from "react";

export default function FullMonthTable({api, rtable, filter}){
    const [currentTable,setCurrentTable]= useState([]);




    useEffect(()=>{
        const getdata = async () =>{
            const n = await api.get_joined({
                join_type: "inner",
                rtable: rtable,
                filter: filter,
              });
            setCurrentTable(n);
        }
        getdata();
    },[api,filter])
    return(
        <>

        </>
    );
}