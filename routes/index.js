var mongoose = require('mongoose');
var Beer = mongoose.model('Beer');

exports.index = function (req, res) {
  Beer.
    find().
    exec( function (err, beers) {
      res.render('index', {
        title: 'Beer Locker',
        beers: beers
      });
    });
};

exports.create = function(req, res) {
  var beer = new Beer();
  beer.name = req.body.name;
  beer.type = req.body.type;
  beer.quantity = req.body.quantity;
  beer.save(function(err){
    if(err) {
      res.send(err);
    }
    res.redirect('/beers');
  });
};

exports.update = function(req, res) {
  Beer.findById(req.params.id, function(err, beer) {
    if (err) {
      res.send(err);
    }
    beer.name = req.body.name;
    beer.type = req.body.type;
    beer.quantity = req.body.quantity;
    beer.save(function(err) {
      if(err) {
        res.send(err);
      }
    res.redirect('/beers');
    });
  });
};

exports.edit = function(req, res) {
  Beer.
    findById(req.params.id).
    exec(function(err, beer) {
    res.render('edit', {
      title: "Update " + beer.name,
      beer: beer,
    });
  });
};

exports.show = function(req, res) {
  Beer.
    findById(req.params.id).
    exec(function(err, beer) {
      res.render('show', {
        title: "More about yer beer:",
        beer: beer
      });
    });
};

exports.destroy = function(req, res) {
  Beer.findByIdAndRemove(req.params.id, function(err, beer) {
    if (err)
      res.send(err);
    res.redirect('/beers');
  });
};
