var config = require('./data/config');

exports.unconfirmedOrders = function (req, res) {
    // get order list from database
    res.send(config);
};

exports.addNewProduct = function (req, res) {
    var name = req.body.name;
    var model = req.body.model;
    var price = req.body.price;
    // add product to database
    res.send('OK');
}