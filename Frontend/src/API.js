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

exports.addNewSupplier = function (supplier, callback) {
    backendPost('/api/add-new-supplier/', supplier, callback);
};

exports.addNewSupply = function (supply, callback) {
    backendPost('/api/add-new-supply/', supply, callback);
};

exports.addNewSupplyProduct = function (supply_product, callback) {
    backendPost('/api/add-new-supplier-product/', supply_product, callback);
};

exports.addNewProduct = function (product, callback) {
    backendPost('/api/add-new-product/', product, callback);
};

exports.addNewStock = function (stock, callback) {
    backendPost('/api/add-new-stock/', stock, callback);
};

exports.addNewStockProduct = function (stock_product, callback) {
    backendPost('/api/add-new-stock-product/', stock_product, callback);
};

exports.addNewClient = function (client, callback) {
    backendPost('/api/add-new-client/', client, callback);
};

exports.addNewOrder = function (order, callback) {
    backendPost('/api/add-new-order/', order, callback);
};

exports.addNewOrderProduct = function (order_product, callback) {
    backendPost('/api/add-new-order-product/', order_product, callback);
};

exports.getClientsList = function(callback) {
    backendGet('/api/get-clients-list/', callback);
};

exports.getProductsList = function(callback) {
    backendGet('/api/get-products-list/', callback);
};

exports.getSuppliersList = function(callback) {
    backendGet('/api/get-suppliers-list/', callback);
};