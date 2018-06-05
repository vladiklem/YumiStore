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
    var name = req.body.name;
    var model = req.body.model;
    var price = req.body.price;
    db.addNewProduct(name , model , price)
    // add product to database
    res.send('OK');
}

exports.addNewUser = function (req, res) {
    console.log('api');
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    db.addNewUser(name , email , password)
    // add product to database
    res.send('OK');
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