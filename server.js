var express = require('express');
var cors = require('cors');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var multer  = require('multer')
var router = express.Router();
var mongoose = require('mongoose');
app.use(multer({ dest: './uploads/'}))

mongoose.connect('mongodb://localhost/test');

/* modal initiation goes here.
var Bear     = require('./models/bear');
var Tp     = require('./models/tp');
var Cases     = require('./models/cases1');
var Feed     = require('./models/feed');
*/

app.use("/media",express.static(__dirname + '/uploads'));
app.use("/static",express.static(__dirname + '/static'));
app.use("/admin",express.static(__dirname + '/admin'));
app.use("/videos",express.static(__dirname + '/videos'));

app.use(cors());

router.route('/api/')

  .get(function(req, res) {
    Tp.find(function(err, tp){
      if (err)
        res.send(err);
        res.render('tps',{tp:tp});
    });
  });


app.use('/api', router);