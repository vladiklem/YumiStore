var express = require('express');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');


function configureEndpoints(app) {
    var api = require('./api');

    app.post('/api/add-new-supplier/', api.addNewSupplier);
    app.post('/api/add-new-supply/', api.addNewSupply)
    app.post('/api/add-new-supplier-product/', api.addNewSupplyProduct);
    app.post('/api/add-new-product/', api.addNewProduct);
    app.post('/api/add-new-stock/', api.addNewStock)
    app.post('/api/add-new-stock-product', api.addNewStockProduct)
    app.post('/api/add-new-client/', api.addNewClient);
    app.post('/api/add-new-order/', api.addNewOrder)
    app.post('/api/add-new-order-product/', api.addNewOrderProduct)

    app.get('/api/get-clients-list/',api.getClientsList);
    app.get('/api/get-products-list/',api.getProductsList);
    app.get('/api/get-suppliers-list/',api.getSuppliersList);

    app.get('/',function (req, res) {
        res.render('customerPage');
    });

    app.get('/admin-page',function (req, res) {
        res.render('adminPage')
    })

    app.use(express.static(path.join(__dirname, '../Frontend/www')));
}

function startServer(port) {
    var app = express();

    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    app.use(morgan('dev'));

    app.use(bodyParser.json({limit: '60mb'}));
    app.use(bodyParser.urlencoded({ extended: false}));

    configureEndpoints(app);

    app.listen(port, function () {
        console.log('My Application Running on http://localhost:'+port+'/');
    });
}

exports.startServer = startServer;