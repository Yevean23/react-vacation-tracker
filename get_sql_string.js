const fs = require("fs");

function get_sql_string(sql_filename){
    const dataSql = fs.readFileSync(`${sql_filename}.sql`).toString();

    // Convert the SQL string to array so that you can run them one at a time.
    // You can split the strings using the query delimiter i.e. `;` in // my case I used `);` because some data in the queries had `;`.
    const dataArr = dataSql.toString().split(");");
    return dataArr[0];
}
