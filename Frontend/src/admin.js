var API = require('./API');

var opts,orders,product,stock,supplier,supply,supply_product,stock_product;

opts = $('#supplier-company-name');

orders = [];

stock_product = {
    stock_id: null,
    product_id: null,
    quantity: null
}

stock = {
    id: null,
    city: null,
    zip: null,
    street: null,
    house_num: null
}

supply_product = {
    supply_id: null,
    product_id: null,
    quantity: null
}

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

supply = {
    id: null,
    supply_date: null,
    supplier_id: null
}

$(function () {
    showSuppliers();
    $('#new-product').click(function () {
       addNewProduct();
    })
    $('#new-supplier').click(function () {
        addNewSupplier();
    })
    $('#new-stock').click(function () {
        addNewStock()
    })
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
            console.log(data);
        }
    });
}

function addNewProduct() {
    supply.id = '_' + Math.random().toString(36).substr(2, 9);
    supply.supplier_id = opts.find(':selected').data("id");
    supply.supply_date = new Date();

    product.id = '_' + Math.random().toString(36).substr(2, 9);
    product.name = $('#product-name').val();
    product.purchase_price = parseInt($('#product-purchase-price').val());
    product.sale_price = parseInt($('#product-sale-price').val());
    product.screen = parseInt($('#product-screen').val());
    product.battery = parseInt($('#product-battery').val());
    product.cpu = $('#product-cpu').val();
    product.guarantee = parseInt($('#product-guarantee').val());
    product.type = $('#product-type').val();

    supply_product.supply_id = supply.id;
    supply_product.product_id = product.id;
    supply_product.quantity = parseInt($('#product-quantity').val());

    stock_product.stock_id = "_qu32cyo5b";
    stock_product.product_id = product.id;
    stock_product.quantity = supply_product.quantity;

    API.addNewStockProduct(stock_product,function (err, data) {
        if(!err){
            console.log(data);
        }
    })

    API.addNewSupply(supply, function (err, data) {
        if (!err){
            console.log(data);
        }
    })

    API.addNewSupplyProduct(supply_product, function (err, data) {
        if (!err){
            console.log(data);
        }
    })

    API.addNewProduct(product,function (err, data){
        if (!err){
            console.log(data);
        }
    });
}

function addNewStock() {
    stock.id = '_' + Math.random().toString(36).substr(2, 9);
    stock.city = $('#stock-city').val();
    stock.street = $('#stock-street').val();
    stock.house_num = parseInt($('#stock-house-num').val());
    stock.zip = $('#stock-zip').val();
    API.addNewStock(stock,function (err, data){
        if (!err){
            console.log(data);
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
                opt.data("id", data[i].id);
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