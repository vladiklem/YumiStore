(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function backendGet(url, callback) {
    $.ajax({
        url: url,
        type: 'GET',
        success: function(data){
            callback(null, data);
        },
        error: function() {
            callback(new Error("Ajax Failed"));
        }
    })
}

function backendPost(url, data, callback) {
    $.ajax({
        url: url,
        type: 'POST',
        contentType : 'application/json',
        data: JSON.stringify(data),
        success: function(data){
            callback(null, data);
        },
        error: function() {
            callback(new Error("Ajax Failed"));
        }
    })
}

exports.unconfirmedOrders = function(callback) {
    backendGet('/api/unconfirmed-orders/', callback);
};

exports.addNewProduct = function (product, callback) {
    backendPost('/api/add-new-product/', product, callback);
};

exports.addNewUser = function (user, callback) {
    backendPost('/api/add-new-user/', user, callback);
};

exports.addNewSupplier = function (supplier, callback) {
    backendPost('/api/add-new-supplier/', supplier, callback);
};

exports.getUsersList = function(callback) {
    backendGet('/api/get-users-list/', callback);
};

exports.getProductsList = function(callback) {
    backendGet('/api/get-products-list/', callback);
};

exports.getSuppliersList = function(callback) {
    backendGet('/api/get-suppliers-list/', callback);
};
},{}],2:[function(require,module,exports){
var API = require('./API');

var opts,orders,product,supplier;

opts = $('#supplier-company-name');

orders = [];

product = {
    id: null,
    name: null,
    screen: null,
    cpu: null,
    battery: null,
    guarantee: null,
    sale_price: null,
    purchase_price: null,
    type: null
};

supplier = {
    id: null,
    name: null,
    city: null,
    street: null,
    house_num: null,
    zip: null
}

$(function () {
    $('#new-product').click(function () {
       addNewProduct();
    })
    $('#new-supplier').click(function () {
        addNewSupplier();
    })
    showSuppliers();
})

function addNewSupplier() {
    supplier.id = '_' + Math.random().toString(36).substr(2, 9);
    supplier.name = $('#company-name').val();
    supplier.city = $('#company-city').val();
    supplier.street = $('#company-street').val();
    supplier.house_num = parseInt($('#company-house-num').val());
    supplier.zip = $('#company-zip').val();
    API.addNewSupplier(supplier,function (err, data){
        if (!err){

        }
    });
}

function showSuppliers() {
    API.getSuppliersList(function (err, data) {
        if(data.length === 0){
            var txt = $("<p></p>").text("You must add at least one suuplier company");
            opts.append(txt);
        }else{
            for(var i = 0;i<data.length;i++){
                var opt = $("<option></option>").text(data[i].name);
                opts.append(opt);
            }
        }
    })
}

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
    product.id = '_' + Math.random().toString(36).substr(2, 9);
    product.name = $('#product-name').val();
    product.purchase_price = parseInt($('#product-purchase-price').val());
    product.sale_price = parseInt($('#product-sale-price').val());
    product.screen = parseInt($('#product-screen').val());
    product.battery = parseInt($('#product-battery').val());
    product.cpu = $('#product-cpu').val();
    product.guarantee = parseInt($('#product-guarantee').val());
    product.type = $('#product-type').val();
    API.addNewProduct(product,function (err, data){
        if (!err){
            console.log(data);
        }
    });
}
},{"./API":1}]},{},[2]);
