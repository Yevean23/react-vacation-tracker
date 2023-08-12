import { useEffect, useState } from "react";

export default function FullTable({ api }) {
  const [tableDirty, setTableDirty] = useState(false);
  const [currentTable, setCurrentTable] = useState([]);
  const [oldTable, setOldTable] = useState([]);

  const [newId, setNewId] = useState("");

  const [newEntry, setNewEntry] = useState({});

  useEffect(() => {
    const getData = async () => {
      console.log(api);
      const newdata = await api.get_all();
      setCurrentTable(newdata);
      setOldTable(newdata);
      //Object.keys(newdata[0]).forEach();
    };
    console.log(api);

    getData();
  }, [newId, api]);

  useEffect(() => {
    if (currentTable.length) {
      const n = {};
      Object.keys(currentTable[0]).forEach((v) => {
        n[v] = "";
      });
      setNewEntry(n);
    }
  }, [currentTable]);

  const modifyNewEntryHandler = (_key, new_value) => {
    setNewEntry(() => {
      const n = newEntry;

      n[_key] = new_value;
      return { ...n };
    });
  };

  const addNewEntryHandler = async () => {
    delete newEntry.id;
    console.log(newEntry);

    const new_id = await api.add(newEntry);
    setNewId(new_id);
  };

  const updateTableHandler = (new_val, el, name) => {
    const newel = { ...el };
    newel[name] = new_val;
    const t = currentTable.filter((e) => {
      return e != el;
    });
    t.push(newel);
    t.sort((a, b) => {
      return a.id - b.id;
    });
    setCurrentTable(t);
  };

  const undoChangesHandler = () => {
    setCurrentTable(oldTable);
    setTableDirty(false);
  };

  const saveChangesHandler = () => {
    currentTable.forEach((el, i) => {
      if (el !== oldTable[i]) {
        api.update(el);
      }
    });

    setTableDirty(false);
  };

  return (
    <>
      {Object.entries(newEntry).map((pair, i) => {
        if (pair[0] === "id") return;
        return (
          <input
            key={i}
            value={newEntry[i]}
            placeholder={pair[0]}
            onChange={(input_el) => {
              modifyNewEntryHandler(pair[0], input_el.target.value);
            }}
          ></input>
        );
      })}
      <button onClick={addNewEntryHandler}>Add Entry</button>
      <table>
        <thead></thead>
        <tbody
          onChange={() => {
            setTableDirty(true);
          }}
        >
          <tr>
            {Object.keys({ ...currentTable[0] }).map((valuei, i) => {
              return <td key={i}>{valuei}</td>;
            })}
          </tr>
          {currentTable.map((el, i) => {
            return (
              <tr key={i}>
                {Object.values({ ...el }).map((valuej, j) => {
                  if (Object.keys({ ...el })[j] === "active") {
                    return (
                      <td key={j}>
                        <select
                          value={valuej}
                          onChange={(input_el) => {
                            updateTableHandler(
                              input_el.target.value,
                              el,
                              Object.keys({ ...el })[j]
                            );
                          }}
                        >
                          <option value="Y">Y</option>
                          <option value="N">N</option>
                        </select>
                      </td>
                    );
                  }
                  if (Object.keys({ ...el })[j] === "role") {
                    return (
                      <td key={i + j}>
                        <select
                          value={valuej}
                          onChange={(input_el) => {
                            updateTableHandler(
                              input_el.target.value,
                              el,
                              Object.keys({ ...el })[j]
                            );
                          }}
                        >
                          <option value="user">user</option>
                          <option value="admin">admin</option>
                          <option value="employee">employee</option>
                        </select>
                      </td>
                    );
                  }
                  if (Object.keys({ ...el })[j] === "id") {
                    return <td key={i + j}>{valuej}</td>;
                  }
                  if (Object.keys({ ...el })[j] === "password") {
                    return (
                      <td key={i + j}>
                        <input
                          type="password"
                          value={valuej}
                          onChange={(input_el) => {
                            updateTableHandler(
                              input_el.target.value,
                              el,
                              Object.keys({ ...el })[j]
                            );
                          }}
                        ></input>
                      </td>
                    );
                  }

                  if (!j) {
                    // id is uneditable
                    return <td key={i + j}>{valuej}</td>;
                  }

                  return (
                    <td key={i + j}>
                      <input
                        type="text"
                        value={valuej}
                        onChange={(input_el) => {
                          updateTableHandler(
                            input_el.target.value,
                            el,
                            Object.keys({ ...el })[j]
                          );
                        }}
                      />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        <tfoot></tfoot>
      </table>
      <button disabled={!tableDirty} onClick={undoChangesHandler}>
        Undo
      </button>
      <button disabled={!tableDirty} onClick={saveChangesHandler}>
        Save
      </button>
    </>
  );
}
