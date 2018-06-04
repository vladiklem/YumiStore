var express = require('express');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');


function configureEndpoints(app) {
    var api = require('./api');

    app.post('/api/add-new-product/', api.addNewProduct);

    app.get('/api/unconfirmed-orders/', api.unconfirmedOrders);

    app.get('/',function (req, res) {
        res.render('adminPage');
    });

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