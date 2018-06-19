var config = require('./data/config');
var db = require("./database");
var orders;

exports.addNewSupplier = function (req, res) {
    var id = req.body.id;
    var name = req.body.name;
    var city = req.body.city;
    var street = req.body.street;
    var house_num = req.body.house_num;
    var zip = req.body.zip;
    db.addNewSupplier(id, name, city, street, house_num, zip)
    res.send('OK')
}

exports.addNewSupply = function (req, res) {
    var id = req.body.id;
    var supply_date = req.body.supply_date;
    var supplier_id = req.body.supplier_id;
    db.addNewSupply(id , supply_date , supplier_id)
    res.send('OK')
}

exports.addNewSupplyProduct = function (req, res) {
    var supply_id = req.body.supply_id;
    var product_id = req.body.product_id;
    var quantity = req.body.quantity;
    db.addNewSupplyProduct(supply_id, product_id, quantity)
    res.send('OK')
}

exports.addNewProduct = function (req, res) {
    var id = req.body.id;
    var name = req.body.name;
    var purchase = req.body.purchase_price;
    var sale = req.body.sale_price;
    var screen = req.body.screen;
    var cpu = req.body.cpu;
    var bat = req.body.battery;
    var guarantee = req.body.guarantee;
    var type = req.body.type;
    db.addNewProduct(id , name , screen , cpu , bat , guarantee , purchase , sale , type)
    // add product to database
    res.send('OK');
}

exports.addNewStock = function (req, res) {
    var id = req.body.id;
    var city = req.body.city;
    var street = req.body.street;
    var house_num = req.body.house_num;
    var zip = req.body.zip;
    db.addNewStock(id, city, zip ,street, house_num)
    res.send('OK')
}

exports.addNewStockProduct = function (req, res) {
    var stock_id = req.body.stock_id;
    var product_id = req.body.product_id;
    var quantity = req.body.quantity;
    db.addNewStockProduct(stock_id, product_id, quantity)
    res.send('OK')
}

exports.addNewClient = function (req, res) {
    var id = req.body.id;
    var name = req.body.name;
    var phone = req.body.phone;
    var email = req.body.email;
    var password = req.body.password;
    var city = req.body.city;
    var zip = req.body.zip;
    var street = req.body.street;
    var house_number = req.body.house_num;
    var entrance = req.body.entrance;
    var apt_number = req.body.apt_num;
    db.addNewClient(id, name, phone, email, password, city, zip, street, house_number, entrance, apt_number)
    res.send('OK');
}

exports.addNewOrder = function (req, res) {
    var id = req.body.id;
    var order_time = req.body.order_time;
    var delivery_time = req.body.delivery_time;
    var status = req.body.status;
    var client_id = req.body.client_id;
    var promocode = req.body.promocode;
    var price = req.body.price;
    db.addNewOrder(id, order_time, delivery_time, status, client_id, promocode, price)
    res.send('OK');
}

exports.addNewOrderProduct = function (req, res) {
    var order_id = req.body.order_id;
    var product_id = req.body.product_id;
    var quantity = req.body.quantity;
    db.addNewOrderProduct(order_id, product_id, quantity)
    res.send('OK')
}

exports.getClientsList = function (req, res) {
    db.getClientsList(function (err, data) {
        if(err) throw err
        res.send(data)
    })
}

exports.getProductsList = function (req, res) {
    db.getProductsList(function (err, data) {
        if(err) throw err
        res.send(data)
    })
}

exports.getSuppliersList = function (req, res) {
    db.getSuppliersList(function (err, data) {
        if(err) throw err
        res.send(data)
    })
}