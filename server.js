var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Beer = require('./models/beer');
var port = process.env.PORT || 3000;
var routes  = require( './routes' );
var router = express.Router();
var http = require('http');
var path = require('path');

var app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(path.join(__dirname, '/public')));
app.set( 'view engine', 'hjs' );

mongoose.connect('mongodb://localhost:27017/beerlocker');

app.use('/', router);
app.get('/', routes.index);
app.post('/create', routes.create);
app.get('/edit/:id', routes.edit);
app.post('/update/:id', routes.update);
app.get('/beer/:id', routes.beer);
app.get('/destroy/:id', routes.destroy);

app.listen(port);
console.log('Insert beer on port ' + port);
