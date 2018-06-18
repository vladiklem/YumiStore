var config = require('./data/config');
var db = require("./database");
var orders;

exports.unconfirmedOrders = function (req, res) {
    // get order list from database
    db.getOrdersList(function (err, data) {
        if(err) throw err
        res.send(data);
    });
};

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

exports.addNewUser = function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    db.addNewUser(name , email , password)
    // add product to database
    res.send('OK');
}

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

exports.getUsersList = function (req, res) {
    db.getUsersList(function (err, data) {
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