import { useEffect, useState } from "react";

export default function JoinTable({ api, rtable, filter, select_cols }) {
  const [currentTable, setCurrentTable] = useState([]);
  useEffect(() => {
    const getdata = async () => {
      const dat = await api.get_joined({
        select_cols: select_cols ? [...select_cols] : [],
        join_type: "inner",
        rtable: rtable,
        filter: filter,
      });
      console.log('dat',dat);
      //delete dat.employee_id;
      setCurrentTable(dat);
    };
    getdata();
  }, [api, filter, rtable, select_cols]);
  return (
    <>
      <table>
        <thead></thead>
        <tbody>
            {
                currentTable.map((row,i)=>{
                    return(
                            <tr key={i}>
                                {
                                    Object.entries(row).map((col,j)=>{
                                        return(
                                            <td key={i+j}>
                                                {col[1]}
                                            </td>
                                        );
                                    })
                                }
                            </tr>
                    );
                })
            }
        </tbody>
        <tfoot></tfoot>
      </table>
    </>
  );
}
