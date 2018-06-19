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
    var sql = "CREATE TABLE products (id VARCHAR(255), name VARCHAR(255), purchase_price INT(1), sale_price INT(1), screen INT(1), battery INT(1), cpu VARCHAR(255), guarantee INT(1), type VARCHAR(255))";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });
}

exports.addNewSupplier = function (id, name, city, zip, street, house_num) {
    var sql = "INSERT INTO suppliers (id, name, city , zip , street , house_num) VALUES ('"+id+"', '"+name+"', '"+city+"', '"+zip+"', '"+street+"', '"+house_num+"')";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Supplier Added");
    });
}

exports.addNewSupply = function (id, supply_date, supplier_id) {
    var sql = "INSERT INTO supplies (id, supply_date, supplier_id) VALUES ('"+id+"', '"+supply_date+"', '"+supplier_id+"')";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Supply Added");
    });
}

exports.addNewSupplyProduct = function (supply_id, product_id, quantity) {
    var sql = "INSERT INTO supplies_products (supply_id, product_id, quantity) VALUES ('"+supply_id+"', '"+product_id+"', '"+quantity+"')";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("SupplyProduct Added");
    });
}

exports.addNewProduct = function (id ,name ,screen ,cpu ,battery ,guarantee ,purchase ,sale , type) {
    var sql = "INSERT INTO products (id, name, purchase_price, sale_price, screen, battery, cpu, guarantee, type) VALUES ('"+id+"','"+name+"', '"+purchase+"', '"+sale+"', '"+screen+"', '"+battery+"', '"+cpu+"', '"+guarantee+"', '"+type+"')";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Product Added");
    });
}

exports.addNewStock = function (id , city , zip , street , house_num) {
    var sql = "INSERT INTO stocks (id, city, zip, street, house_num) VALUES ('"+id+"', '"+city+"', '"+zip+"', '"+street+"', '"+house_num+"')";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Stock Added");
    });
}

exports.addNewStockProduct = function (stock_id, product_id, quantity) {
    var sql = "INSERT INTO stocks_products (stock_id, product_id, quantity) VALUES ('"+stock_id+"', '"+product_id+"', '"+quantity+"')";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("StockProduct Added");
    });
}

exports.addNewClient = function (id, name, phone, email, password, city, zip, street, house_number, entrance, apt_number) {
    var sql = "INSERT INTO users (id, name, phone, email, password, city, zip, street, house_number, entrance, apt_number) VALUES ('"+id+"', '"+name+"', '"+phone+"', '"+email+"', '"+password+"', '"+city+"', '"+zip+"', '"+street+"', '"+house_number+"', '"+entrance+"', '"+apt_number+"')";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("User Added");
    });
}

exports.addNewOrder = function (id, order_time, delivery_time, status, client_id, promocode, price) {
    var sql = "INSERT INTO orders (id, order_time, delivery_time, status, client_id, promocode, price) VALUES ('"+id+"', '"+order_time+"', '"+delivery_time+"', '"+status+"', '"+client_id+"', '"+promocode+"', '"+price+"')";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Order Added");
    });
}

exports.addNewOrderProduct = function (order_id, product_id, quantity) {
    var sql = "INSERT INTO orders_products (order_id, product_id, quantity) VALUES ('"+order_id+"', '"+product_id+"', '"+quantity+"')";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("OrderProduct Added");
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

exports.getClientsList = function (callback) {
    con.query("SELECT * FROM users", function (err, result) {
        if (err){
            callback(err , null);
        }else{
            callback(null,result);
            console.log("Clients Got");
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



