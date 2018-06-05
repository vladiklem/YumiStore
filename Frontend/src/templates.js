var fs = require('fs');
var ejs = require('ejs');

exports.OrderOneItem = ejs.compile(fs.readFileSync('./Frontend/templates/OrderOneItem.ejs', "utf8"));
exports.ProductOneItem = ejs.compile(fs.readFileSync('./Frontend/templates/ProductOneItem.ejs', "utf8"));