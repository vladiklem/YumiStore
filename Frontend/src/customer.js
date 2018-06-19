var API = require('./API');
var templates = require('./templates');

var product,products,order,order_product,client,cart,cartNum,cart_item;

cart_item = {
    product: null,
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

order = {
    id: null,
    order_time: null,
    delivery_time: null,
    status: null,
    client_id: null,
    promocode: null,
    price: null
}

order_product = {
    order_id: null,
    product_id: null,
    quantity: null
}

client = {
    id: null,
    name: null,
    phone: null,
    email: null,
    password: null,
    house_num: null,
    entrance: null,
    apt_num: null,
    street: null,
    city: null,
    zip: null
}

cart = [];
products = [];

var $product_list = $("#product-list");
var $cart_list = $("#cart-products-list");

$(function () {

    showAllProducts();

    $('#login-btn').click(function () {
        $("#register-panel").css({"display": "none"})
        $("#login-panel").css({"display": "block"})
    })

    $('#register').click(function () {
        $("#login-panel").css({"display": "none"})
        $("#register-panel").css({"display": "block"})
    })

    $('#create-user').click(function () {
        registerNewClient();
    })

    $("#cart").click(function () {
        showCartList(cart)
    })

    $('#close-cart').click(function () {
        $('#cart-panel').css({"display": "none"});
    })

    $('#close-login').click(function () {
        $('#login-panel').css({"display": "none"});
    })

    $('#close-register').click(function () {
        $('#register-panel').css({"display": "none"});
    })

    $('#login').click(function () {
        loginUser();
    })

    $('#confirm-order').click(function () {
        confirmOrder();
    })

})

function showAllProducts() {
    API.getProductsList(function (err, data) {
        console.log(data)
        for(var i = 0;i<data.length; i++){
            product = {
                id: data[i].id,
                name: data[i].name,
                screen: data[i].screen,
                cpu: data[i].cpu,
                battery: data[i].battery,
                guarantee: data[i].guarantee,
                sale_price: data[i].sale_price,
                purchase_price: data[i].purchase_price,
                type: data[i].type
            }
            products.push(product);
        }
        showProductList(products)
    })
}

function confirmOrder() {
    var price;
    price = 0;
    order.id = '_' + Math.random().toString(36).substr(2, 9);
    for(var i = 0;i<cart.length;i++){
        price = price + cart[i].product.sale_price * cart[i].quantity;
        order_product.order_id = order.id;
        order_product.product_id = cart[i].product.id;
        order_product.quantity = cart[i].quantity;
        API.addNewOrderProduct(order_product,function (err, data){
            if (!err){
                console.log(data);
            }
        });
    }
    order.order_time = new Date();
    order.delivery_time = "Unknown";
    order.price = price;
    order.status = "Waiting";
    order.promocode = "Unknown";
    order.client_id = client.id;
    API.addNewOrder(order,function (err, data){
        if (!err){
            console.log(data);
        }
    });
}

function loginUser() {
    var email = $('#email').val();
    var password = $('#password').val();

    //check empty forms

    if(email === "admin" && password ==="admin"){
        window.location.href = "http://localhost:8090/admin-page";
    }else{
        API.getClientsList(function (err, data) {
            console.log(data);
            if (err) throw err
            for(var i = 0;i<data.length;i++){
                if(data[i].email === email && data[i].password === password){

                    client.id = data[i].id;
                    client.name = data[i].name;
                    client.phone = data[i].phone;
                    client.email = data[i].email;
                    client.city = data[i].city;
                    client.apt_num = data[i].apt_number;
                    client.entrance = data[i].entrance;
                    client.street = data[i].street;
                    client.house_num = data[i].house_number;
                    client.zip = data[i].zip;
                    $("#login-btn").text(client.name);
                    console.log("Logined");

                    break;
                }else{
                    console.log("no client");
                }
            }
        })
    }
}

function registerNewClient() {
    client.id = '_' + Math.random().toString(36).substr(2, 9);
    client.name = $('#client-name').val();
    client.phone = $('#client-phone').val();
    client.email = $('#client-email').val();
    client.password = $('#client-password').val();
    client.city = $('#client-city').val();
    client.apt_num = parseInt($('#client-apt-number').val());
    client.entrance = parseInt($('#client-entrance').val());
    client.street = $('#client-street').val();
    client.house_num = parseInt($('#client-house-num').val());
    client.zip = $('#client-zip').val();
    API.addNewClient(client, function (err, data) {
        if (!err){
            console.log(data);
        }
    })
    $("#login-btn").text(client.name);
}

function showCartList(list) {
    $("#cart-panel").css({"display": "block"})
    $cart_list.html("");
    for(var i = 0;i<list.length;i++){
        showOneCartProduct(list[i]);
    }
}

function showOneCartProduct(product) {
    var html_code = templates.ProductInCartOneItem(product.product);
    var $node = $(html_code);
    $node.find(".cart-item-quantity").text(product.quantity);
    $node.find(".delete-from-cart").click(function(){
        for(var i = 0;i<cart.length;i++){
            if (cart[i].product === product.product){
                cart[i].product = null;
                cart[i].quantity = null;
            }
        }
        $node.remove();
    });
    $cart_list.append($node);
}

function showProductList(list) {
    $product_list.html("");
    for(var i = 0;i<list.length;i++){
        showOneProduct(list[i]);
    }
}

function showOneProduct(product) {
    var html_code = templates.ProductOneItem(product);
    var $node = $(html_code);
    $node.find(".btn-buy").click(function(){
        addToCart(product)
    });
    $product_list.append($node);
}

function addToCart(product) {
    var contains = false;
    for(var i = 0; i<cart.length;i++){
        if(cart[i].product === product){
            cart[i].quantity = cart[i].quantity + 1;
            contains = true;
            break;
        }
    }
    if(!contains){
        cart_item.product = product;
        cart_item.quantity = 1;
        cart.push(cart_item);
    }
    cartNum = parseInt($("#cart-num").text());
    cartNum = cartNum + 1;
    $("#cart-num").text(cartNum);
}

