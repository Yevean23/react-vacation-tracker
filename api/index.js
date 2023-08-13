const sqlite3 = require("sqlite3");
const express = require("express");
const fs = require("fs");
const cors = require("cors");

function get_sql_string(sql_filename) {
  const dataSql = fs.readFileSync(`${sql_filename}.sql`).toString();

  // Convert the SQL string to array so that you can run them one at a time.
  // You can split the strings using the query delimiter i.e. `;` in // my case I used `);` because some data in the queries had `;`.
  const dataArr = dataSql.toString().split(");");
  return dataArr[0];
}

var app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

const db = new sqlite3.Database("./emp_database.db", (err) => {
  if (err) {
    console.error("Erro opening database " + err.message);
  } else {
    db.exec(
      `
      create table users (
        id integer primary key not null,
        username text not null,
        password text not null,
        role text not null
    );
    insert into users (username, password, role)
    values ('admin', 'admin', 'admin'),
        ('entry', 'entry', 'entry');
    create table employees (
        id integer primary key not null,
        last_name text not null,
        first_name text not null,
        active text not null
    );
    insert into employees (first_name, last_name, active)
    values ('Spider', 'man', 'N'),
        ('Tony', 'Stark', 'N'),
        ('Jean', 'Grey', 'Y');
    create table vacation_types(
        id integer primary key not null,
        name text not null,
        short_name text not null,
        color text not null
    );
    insert into vacation_types (name, short_name, color)
    values ('Long-term Vacation', 'V', 'green'),
        ('Holiday', 'H', 'orange'),
        ('Sick Leave', 'S', 'red'),
        ('FMLA', 'F', 'blue'),
        ('Not Employeed', 'N', 'gray');
    create table month_records(
        id integer primary key not null,
        employee_id int not null,
        month int not null,
        year int not null
    );
    insert into month_records (employee_id, year, month)
    values (1, 2023, 1),
        (2, 2023, 1);
    create table vacation_records(
        id integer primary key not null,
        employee_id int not null,
        year int not null,
        month int not null,
        day int not null,
        type int not null
    );
    insert into vacation_records (employee_id, year, month, day, type)
    values (1, 2023, 1, 1, 3),
        (1, 2023, 1, 2, 3),
        (2, 2023, 1, 1, 4);
    `,
      (err) => {
        if (err) {
          console.log("Table already exists.");
        }
      }
    );
  }
});

app.get("/", (req, res) => {
  res.send("Successful response.");
});

app.get("/endpoints/:dtable", (req, res, next) => {
  db.all(`SELECT * FROM ${req.params.dtable};`, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json([...rows]);
  });
});

app.post("/endpoints/:dtable", (req, res, next) => {
  db.run(
    `insert into ${req.params.dtable} (${Object.keys(req.body).join(
      ", "
    )}) values (${Object.values(req.body)
      .map(() => {
        return "?";
      })
      .join(",")});`,
    Object.values(req.body),
    function (err, result) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.status(201).json({
        id: this.lastID,
      });
    }
  );
});

app.post("/endpoints/:dtable/filter", (req, res, next) => {
  const exec_string = `SELECT * FROM ${req.params.dtable} where ${Object.keys(
    req.body.filter
  )
    .map((k, i) => {
      return `${k} = ?`;
    })
    .join(" AND ")} ;`;
  console.log(exec_string);
  const varArr = Object.values(req.body.filter).map((p, i) => {
    return p;
  });

  console.log(varArr);
  db.all(exec_string, varArr, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    console.log(rows);
    res.status(200).json([...rows]);
  });
});

app.post("/endpoints/:dtable/join", (req, res, next) => {
  let exec_string = "";

  let varArr = [];
  let select_cols = "*";
  if(req.body.select_cols){
    select_cols = req.body.select_cols.join(', ');
  }
  if (req.body.filter) {
    exec_string = `
    SELECT ${select_cols}
    FROM ${req.params.dtable}
    ${req.body.join_type} JOIN ${req.body.rtable}
    ON ${req.params.dtable}.${req.body.rtable.slice(0, -1)}_id = ${req.body.rtable}.id
    WHERE ${Object.keys(req.body.filter)
      .map((k, i) => {
        return `${k} = ?`;
      })
      .join(" AND ")};
    `;
    varArr = Object.values(req.body.filter).map((p, i) => {
      return p;
    });
  } else {
    exec_string = `
    SELECT ${select_cols}
    FROM ${req.params.dtable}
    ${req.body.join_type} JOIN ${req.body.rtable}
    ON ${req.params.dtable}.${req.body.rtable.slice(0, -1)}_id = ${
      req.body.rtable
    }.id;
    `;
  }

  //console.log(exec_string);
  //console.log(varArr);
  db.all(exec_string, varArr, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    console.log(rows);
    res.status(200).json([...rows]);
  });
});

app.put("/endpoints/:dtable", (req, res, next) => {
  db.run(
    `UPDATE ${req.params.dtable} set ${Object.keys(req.body)
      .filter((el) => {
        return el !== "id";
      })
      .map((el) => {
        return el + " = ?";
      })
      .join(",")} WHERE id = ?;`,
    [
      ...Object.values(req.body).filter((el, i) => {
        return Object.keys(req.body)[i] !== "id";
      }),
      req.body.id,
    ],
    function (err, result) {
      if (err) {
        res.status(400).json({ error: res.message });
        return;
      }
      res.status(200).json({ id: req.body.id });
    }
  );
});

app.delete("/endpoints/:dtable", (req, res, next) => {
  db.run(
    `DELETE FROM ${req.params.dtable} WHERE id = ?;`,
    [req.body.id],
    function (err, result) {
      if (err) {
        res.status(400).json({ error: res.message });
        return;
      }

      res.status(200).json({ id: req.body.id });
    }
  );
});

app.listen(80, "localhost", () => {
  console.log("Server is listening on port " + 80);
});
