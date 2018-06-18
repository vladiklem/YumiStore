var API = require('./API');
var templates = require('./templates');

var productData = {
    id: null,
    name: null,
    screen: null,
    cpu: null,
    battery: null,
    guarantee: null,
    sale_price: null,
    purchase_price: null
};

var order = {
    id: null,
    order_time: null,
    client_id: null,
    goods_id: [],
    delivery_time: null,
    status: null,
    price: null
}

var user = {
    id: null,
    name: null,
    phone: null,
    email: null,
    house_num: null,
    entrance: null,
    apt_num: null,
    street: null,
    city: null,
    zip: null
}

var cart = [];
var cartNum;

var $product_list = $("#product-list");
var $cart_list = $("#cart-products-list");
var products = [];

$(function () {
    API.getProductsList(function (err, data) {
        console.log(data)
        for(var i = 0;i<data.length; i++){
            productData = {
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
            console.log(productData.id);
            products.push(productData);
        }
        showProductList(products)
    })

    $("#cart").click(function () {
        $("#cart-panel").css({"display": "block"})
        showCartList(cart)
    })

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
                        loginUser(data[i]);
                        break;
                    }else{
                        console.log("no user");
                    }
                }
            })
        }
    })

    $("#confirm-order-btn").click(function () {
        confirmOrder();
    })

})

function confirmOrder() {
    var price = 0;
    for(var i = 0;i<cart.length;i++){
        price += cart[i].price;
        order.goods_id.push(cart[i].name);
    }
    order.price = price;
    order.status = "Waiting";
    order.client_id = user.id;
    console.log(order);
}

function loginUser(data) {
    user.id = data.id;
    user.name = data.name;
    user.phone = data.phone;
    user.email = data.email;
    user.city = data.city;
    user.apt_num = data.apt_num;
    user.entrance = data.entrance;
    user.street = data.street;
    user.house_num = data.house_num;
    user.zip = data.zip;
    $("#login-btn").text(user.name);
}

function showCartList(list) {
    $cart_list.html("");
    for(var i = 0;i<list.length;i++){
        showOneCartProduct(list[i]);
    }
}

function showOneCartProduct(product) {
    var html_code = templates.ProductInCartOneItem(product);
    var $node = $(html_code);
    $node.find(".delete-from-cart").click(function(){
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
    productData = {
        id: product.id,
        name: product.name,
        screen: product.screen,
        cpu: product.cpu,
        battery: product.battery,
        guarantee: product.guarantee,
        sale_price: product.sale_price,
        purchase_price: product.purchase_price,
        type: product.type
    }
    cart.push(productData);
    cartNum = parseInt($("#cart-num").text());
    cartNum = cartNum + 1;
    console.log(cart);
    $("#cart-num").text(cartNum);
}

