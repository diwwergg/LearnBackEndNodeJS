// connect database name bookstore port 3306

const mysql = require('mysql2');
let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "bookstore",
    port : 3306
});

let sqlCommand = {
    selectMar: "select * from books where bname like '%mar%';",
    selectNameOLimit2: "select * from books where bname like '%o%' limit 2;",
    sumAmount: "select sum(amount) as SumAmount from sell_histories;",
    isbn: "select isbn from sell_histories;",
    sumPrice: "select sum(price * amount) as AllPrice from sell_histories ;"

}

// query data show result class
const queryData = () => {
    Object.keys(sqlCommand).forEach((key) => {
        let sql = sqlCommand[key];
        connection.query(sql, function(err, results, fields) {
            if (err) throw err;
            console.log(sql);
            console.log(results);
        });
    });
};

// query data show rows text 
const queryDataText = () => {
    Object.keys(sqlCommand).forEach((key) => {
        let sql = sqlCommand[key];
        connection.query(sql, function(err, rows, columns,  fields) {
            if (err) throw err;
            console.log(sql);
            // show columns name 
            let text = "";
            columns.forEach((column) => {
                text += column.name + "\t";
            });
            console.log(text);

            rows.forEach(row => {
                let text = "";
                Object.keys(row).forEach((key) => {
                    text += row[key] + "\t";
                });
                console.log(text);
            });
        }
        );
    });
};

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    // queryData();
    queryDataText();

    // end connection after 5 seconds
    setTimeout(() => {
        connection.end();
        console.log("Connection closed!");
    }, 5000);
});