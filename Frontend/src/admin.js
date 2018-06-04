var API = require('./API');
var templates = require('./templates');

var prod_name , prod_model , prod_price;
var orderData,newProductData;

newProductData = {
    name: "",
    model: "",
    price: 0
};

$(function () {
    $('#conf').click(function () {
        showOrders("confirmed")
    })
    $('#unconf').click(function () {
        showOrders("unconfirmed")
    })
    $('#new-product').click(function () {
       addNewProduct();
    })
})

function showOrders(type) {
    $('#order-list').html('');
    $('#list-name').text(type + " orders");
    API.unconfirmedOrders(function (err, data) {
        console.log(data);
        // for(var i = 0;i<data.length; i++){
        //     if(type === data[i].type){
        //         orderData = {
        //             customerName: data[i].customerName,
        //             id: data[i].id,
        //             products: data[i].products,
        //             sum: data[i].sum
        //         }
        //         var html_code = templates.OrderOneItem(orderData);
        //         var $node = $(html_code);
        //         $('#order-list').append($node);
        //     }
        // }
    })
}

function addNewProduct() {
    prod_name = $('#product-name').val();
    prod_model = $('#product-model').val();
    prod_price = $('#product-price').val();
    newProductData.name = prod_name;
    newProductData.model = prod_model;
    newProductData.price = prod_price;
    API.addNewProduct(newProductData,function (err, data){
        if (!err){
            console.log(data);
        }
    });
}