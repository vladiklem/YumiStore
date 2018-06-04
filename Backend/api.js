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