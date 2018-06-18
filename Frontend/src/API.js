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