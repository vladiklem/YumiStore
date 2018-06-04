var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "mydb"
});

con.connect();

exports.createYumiDB = function () {
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        con.query("CREATE DATABASE yumi", function (err, result) {
            if (err) throw err;
            console.log("Database created");
        });
    });
}

exports.createProductsTable = function () {
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "CREATE TABLE products (name VARCHAR(255), model VARCHAR(256), price INT(1)";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table created");
        });
    });
}

exports.addNewProduct = function (name , model ,price) {
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "INSERT INTO products (name, model, price) VALUES ('"+name +"', '"+model+"', '"+price+"')";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Product Added");
        });
    });
}

exports.getOrdersList = function (callback) {
    con.query("SELECT * FROM products", function (err, result) {
        if (err){
            callback(err , null);
        }else{
            callback(null,result);
        }
    });
}



