var API = require('./API');
var templates = require('./templates');

var productData = {
    name: "",
    model: "",
    price: 0
}

$(function () {
    API.getProductsList(function (err, data) {
        for(var i = 0;i<data.length; i++){
            productData = {
                name: data[i].name,
                model: data[i].model,
                price: data[i].price
            }
            var html_code = templates.ProductOneItem(productData);
            var $node = $(html_code);
            // $node.getElementsById('#add-cart')
            $('#product-list').append($node);
        }
    })
})