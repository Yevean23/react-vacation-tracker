import { useEffect, useState } from "react";

export default function FullMonthTable({api, filter, rows}){
    const [currentTable,setCurrentTable]= useState([])
    useEffect(()=>{
        const getdata = async () =>{
            const n = await api.get_filtered(filter);
            console.log('rows',rows);
            setCurrentTable(n);
        }
        getdata();
    },[api,filter])
    return(
        <>
        <table>
            <thead></thead>
            <tbody>

            </tbody>
        </table>

        </>
    );
}