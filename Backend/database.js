var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "yumi"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

exports.createYumiDB = function () {
    con.query("CREATE DATABASE yumi", function (err, result) {
        if (err) throw err;
        console.log("Database created");
    });
}

exports.createTable = function () {
    var sql = "CREATE TABLE suppliers (id VARCHAR(255),name  VARCHAR(256),city  VARCHAR(256),zip  VARCHAR(256),street  VARCHAR(256),house_num  INT(1))";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });
}

exports.addNewUser = function (name, email, password) {
    var sql = "INSERT INTO users (name, email, password) VALUES ('"+name +"', '"+email+"', '"+password+"')";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("User Added");
    });
}

exports.addNewSupplier = function (id, name, city, zip, street, house_num) {
    var sql = "INSERT INTO suppliers (id, name, city , zip , street , house_num) VALUES ('"+id+"', '"+name+"', '"+city+"', '"+zip+"', '"+street+"', '"+house_num+"')";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Supplier Added");
    });
}

exports.addNewProduct = function (id ,name ,screen ,cpu ,battery ,guarantee ,purchase ,sale , type) {
    var sql = "INSERT INTO products (id, name, purchase_price, sale_price, screen, battery, cpu, guarantee, type) VALUES ('"+id+"','"+name+"', '"+purchase+"', '"+sale+"', '"+screen+"', '"+battery+"', '"+cpu+"', '"+guarantee+"', '"+type+"')";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Product Added");
    });
}

// exports.addNewUser = function (name , email ,password) {
//         var sql = "INSERT INTO users (name, email, password) VALUES ('"+name +"', '"+email+"', '"+password+"')";
//         con.query(sql, function (err, result) {
//             if (err) throw err;
//             console.log("User Added");
//         });
// }

exports.getOrdersList = function (callback) {
    con.query("SELECT * FROM products", function (err, result) {
        if (err){
            callback(err , null);
        }else{
            callback(null,result);
        }
    });
}

exports.getUsersList = function (callback) {
    con.query("SELECT * FROM users", function (err, result) {
        if (err){
            callback(err , null);
        }else{
            callback(null,result);
        }
    });
}

exports.getProductsList = function (callback) {
    con.query("SELECT * FROM products", function (err, result) {
        if (err){
            callback(err , null);
        }else{
            callback(null,result);
        }
    });
}

exports.getSuppliersList = function (callback) {
    con.query("SELECT * FROM suppliers", function (err, result) {
        if (err){
            callback(err , null);
        }else{
            callback(null,result);
        }
    });
}



