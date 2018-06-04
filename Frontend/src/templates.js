var fs = require('fs');
var ejs = require('ejs');

exports.OrderOneItem = ejs.compile(fs.readFileSync('./Frontend/templates/OrderOneItem.ejs', "utf8"));