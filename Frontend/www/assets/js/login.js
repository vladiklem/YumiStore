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

exports.getUsersList = function(callback) {
    backendGet('/api/get-users-list/', callback);
};

exports.getProductsList = function(callback) {
    backendGet('/api/get-products-list/', callback);
};
},{}],2:[function(require,module,exports){
var API = require('./API');

$(function () {
    $('#login').click(function () {
        var email = $('#email').val();
        var password = $('#password').val();
        if(email === "admin" && password ==="admin"){
            window.location.href = "http://localhost:8090/admin-page";
        }else{
            API.getUsersList(function (err, data) {
                console.log(data);
                if (err) throw err
                for(var i = 0;i<data.length;i++){
                    if(data[i].email === email && data[i].password === password){
                        window.location.href = "http://localhost:8090/customer-page";
                    }
                }
            })
        }
    })
    $('#register').click(function () {
        window.location.href = "http://localhost:8090/register-page";
    })
})
},{"./API":1}]},{},[2]);
