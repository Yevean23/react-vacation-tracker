import { useEffect, useState } from "react";

export default function FilterTable({ api, filter }) {
  const [currentTable, setCurrentTable] = useState([]);

  useEffect(() => {
    const getdata = async () => {
      const t = await api.get_filtered(filter);
      setCurrentTable(t);
      //console.log(t);
    };
    getdata();
  }, [api, filter]);
  return (
    <>
      <table>
        <thead></thead>
        <tbody>
          {currentTable.map((el, i) => {
            console.log(el);
            return <tr key={i}><td>{el.id}</td></tr>;
          })}
        </tbody>
        <tfoot></tfoot>
      </table>
    </>
  );
}
