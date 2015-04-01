var express    = require('express');
var cors = require('cors');
//var bodyParser = express.bodyParser;
var app = express();
var mailer = require('express-mailer');

mailer.extend(app, {
  from: 'sandeep@moonraft.com',
  host: 'smtp.mandrillapp.com', // hostname 
  //secureConnection: false, // use SSL 
  port: 587, // port for secure SMTP 
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts 
  auth: {
    user:'sandeep@moonraft.com',
    pass:'pVM6JevvtMqYflFZwjyvSQ'
  }
});

var mandrill = require('node-mandrill')('pVM6JevvtMqYflFZwjyvSQ');

var http = require('http').Server(app);
var io = require('socket.io')(http);
//var bodyParser = require('body-parser');
var multer  = require('multer')
var router = express.Router();
var mongoose = require('mongoose');
app.use(multer({ dest: './uploads/'}))

mongoose.connect('mongodb://localhost/test');

var Bear     = require('./models/bear');
var Tp     = require('./models/tp');
var Cases     = require('./models/cases1');
var Feed     = require('./models/feed');

var Twitter = require('node-tweet-stream')
  , t = new Twitter({
    consumer_key: 'sPcjkQBPW6jlm2kHgi8VTfiSM',
    consumer_secret: 'VA0NKbIbULLRBRQMcyQKqIdRrR3uiA8ahMaCRAC62zDUpjPCRI',
    token: '319175103-wicW8A0mMDJ2LvYtqiQR2Kep4HwW3ZbxDORvtIMI',
    token_secret: 'PMPkem7YrkWBTixqKTEBnuQ3lxAqO58mkLuMJdMj9RprT'
  })




//var fs = require('fs');
// configure app to use bodyParser()
// this will let us get the data from a POST
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
//app.use(bodyParser())

app.use("/media",express.static(__dirname + '/uploads'));
app.use("/static",express.static(__dirname + '/static'));
app.use("/admin",express.static(__dirname + '/admin'));
app.use("/videos",express.static(__dirname + '/videos'));

app.use(cors());
app.set('view engine', 'ejs');

app.get('/', function(req, res){
  var q = req.query.q;
  res.sendfile('index.html');
});

app.get('/control', function(req, res){
  res.sendfile('control.html');
});

app.get('/admin', function(req, res){
  res.sendfile('admin.html');
});

app.get('/cases', function(req, res){
  res.sendfile('cases.html');
});

app.get('/tweets', function(req, res){
  res.sendfile('tweets.html');
});

router.get('/helloJ',function(req,res){
  res.json({ message: 'hooray! welcome to our api!' });
})


 //===================================================================== TP Routes =================
  router.route('/tptoggle/')
  
  .get(function(req, res) {
    Tp.find(function(err, tp){
      if (err)
        res.send(err);
        res.render('tps',{tp:tp});
    });
  });



router.route('/tp')

  // create a bear (accessed at POST http://localhost:8080/bears)
  .post(function(req, res) {
    
    var tp = new Tp();    // create a new instance of the Bear model
    tp.name = req.body.name;  // set the bears name (comes from the request)
    tp.id1  = req.body.id1;
    tp.id2 =  req.body.id2;
    tp.id3 = req.body.id3;
    tp.id4 = req.body.id4;
    tp.id5 = req.body.id5;
    tp.id6 = req.body.id6;
    tp.id7 = req.body.id7;
    tp.id8 = req.body.id8;
    tp.recent = '0';
    tp.timestamp = Date.now();

    tp.save(function(err) {
      if (err)
        res.send(err);
      res.json(tp);
    });    
  })

  // get all the bears (accessed at GET http://localhost:8080/api/bears)
  .get(function(req, res) {
    Tp.find(function(err, tps) {
      if (err)
        res.send(err);
      res.json(tps);
    });
  });

// on routes that end in /bears/:bear_id
// ----------------------------------------------------
 router.route('/tp/:tp_id')

//   // get the bear with that id
//   .get(function(req, res) {
//     .findById(req.params.bear_id, function(err, bear) {
//       if (err)
//         res.send(err);
//       res.json(bear);
//     });
//   })

  // update the bear with this id
  .put(function(req, res) {
    Tp.findById(req.params.tp_id, function(err, tp) {
      if (err)
        res.send(err);

        tp.recent = (Date.now()).toString();
        tp.save(function(err){
        if (err)
          res.send(err);

        res.json({ message:'tp updated!'});
      });

    });
  })

  // delete the bear with this id
  .delete(function(req, res) {
    Tp.remove({
      _id:req.params.tp_id
    }, function(err,tp) {
      if(err)
        res.send(err);
      res.json({ message: 'Successfully deleted' });
    });
  });

  //==================================================== bear routes =============================== //


router.route('/bears')

  // create a bear (accessed at POST http://localhost:8080/bears)
  .post(function(req, res) {
    
    var bear = new Bear();    // create a new instance of the Bear model
    bear.name = req.body.name;  // set the bears name (comes from the request)

    bear.save(function(err) {
      if (err)
        res.send(err);

      res.json(bear);
    });    
  })

  // get all the bears (accessed at GET http://localhost:8080/api/bears)
  .get(function(req, res) {
    Bear.find(function(err, bears) {
      if (err)
        res.send(err);
      res.json(bears);
    });
  });

// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/bears/:bear_id')

  // get the bear with that id
  .get(function(req, res) {
    Bear.findById(req.params.bear_id, function(err, bear) {
      if (err)
        res.send(err);
      res.json(bear);
    });
  })

  // update the bear with this id
  .put(function(req, res) {
    Bear.findById(req.params.bear_id, function(err, bear) {

      if (err)
        res.send(err);

      bear.name = req.body.name[0];
      bear.save(function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'Bear updated!' });
      });

    });
  })

  // delete the bear with this id
  .delete(function(req, res) {
    Bear.remove({
      _id: req.params.bear_id
    }, function(err, bear) {
      if (err)
        res.send(err);
      res.json({ message: 'Successfully deleted' });
    });
  });

  //==================================================== feed routes =============================== //

router.route('/feedback')

  .post(function(req, res) {
    console.log(req.body);
    var feed = new Feed();
    feed.name = req.body.name[0];
    feed.email = req.body.email;
    feed.feedback = req.body.feedback;
    feed.timestamp = Date.now();
   //=========================== email block ===================
//send an e-mail to jim rubenstein
    var str = 'Feedback from '+ req.body.name[0] + " " + req.body.email +" from SCC";
    mandrill('/messages/send', {
    message: {
        to: [{email: 'de@zensar.com',name: 'Zensar SCC'}],
        from_email: 'scc@zensar.com',
        subject: str,
        text: req.body.feedback
    }
    }, function(error, response)
    {
    //uh oh, there was an error
    if (error) console.log( JSON.stringify(error));

    //everything's good, lets see what mandrill said
    else console.log(response);
    });


   //===========================================================
    
    feed.save(function(err) {
      if (err)
        res.send(err);
    res.json(feed);
    });
  })


  .get(function(req, res) {
    Feed.find(function(err, feed){
      if (err)
        res.send(err);
        console.log(typeof feed);
        //res.json(feed);
        var xl = JSON.stringify(feed);
        res.render('email',{xl:xl});
    });
  });

router.route('/feedback/:feed_id')

 // delete the bear with this id
  .delete(function(req,res) {
    Feed.remove({
      _id: req.params.feed_id
    }, function(err, bear) {
      if (err)
        res.send(err);
      res.json({ message: 'Successfully deleted' });
    });
  });


  router.route('/testimonials/')
  
  .get(function(req, res) {
    Feed.find(function(err, feed){
      if (err)
        res.send(err);
        res.render('test',{feed:feed});

    });
  });
  
  //==================================================== case routes =============================== //
  

  router.route('/cases')

  .post(function(req, res) {
    console.log("received request from madhu");
    console.log(req.files);
    var cased = new Cases();
    cased.name = req.body.name;
    cased.globe =true
    cased.location = req.body.location; 
    cased.lat = req.body.lat;
    cased.lon = req.body.lon;
    console.log(req.body.content);
    cased.content = Boolean(parseInt(req.body.content));
    cased.summary = req.body.summary;
    cased.nbb1_num = req.body.nbb1_num;
    cased.nbb1_txt = req.body.nbb1_txt;
    cased.nbb2_num = req.body.nbb2_num;
    cased.nbb2_txt = req.body.nbb2_txt;
    cased.nbb3_num = req.body.nbb3_num;
    cased.nbb3_txt = req.body.nbb3_txt;
    cased.sol_high = req.body.sol_high;
    cased.feedback = req.body.feedback;
    cased.designation = req.body.designation;
    cased.sector      = req.body.sector;

    if (req.files.hasOwnProperty('thumbName'))
      {
      cased.thumbName = req.files.thumbName.name;
    }
    else{
      cased.thumbName = "";
    }

    if (req.files.hasOwnProperty('bannerName'))
    {
    cased.bannerName = req.files.bannerName.name;
    }
    else{
      cased.bannerName = "";
    }

    if (req.files.hasOwnProperty('videoName')){
      cased.videoName = req.files.videoName.name;
    }

    else{
      cased.videoName ="";
    }

    cased.timestamp = Date.now();
    cased.save(function(err) {
      if (err)
        res.send(err);
    res.json(cased);
    });
  })

 

  .get(function(req, res) {
    Cases.find(function(err, cased){
      if (err)
        res.send(err);
        res.json(cased);
    });
  });

router.route('/page/:case_id')
  .get(function(req, res) {
    Cases.findById(req.params.case_id, function(err, cased) {
      if (err)
        res.send(err);
      res.render('test1',cased);
    });
  })


router.route('/cases/:case_id')
  .get(function(req, res) {
    Cases.findById(req.params.case_id, function(err, cased) {
      if (err)
        res.send(err);
      res.json(cased);
    });
  })

 
.put(function(req, res) {

    Cases.findById(req.params.case_id, function(err, cased) {

      if (err)
        res.send(err);

    cased.name = req.body.name;
    cased.globe = true;
    cased.location = req.body.location; 
    cased.lat = req.body.lat;
    cased.lon = req.body.lon;
    cased.content = Boolean(parseInt(req.body.content));
    
    cased.summary = req.body.summary;
    cased.nbb1_num = req.body.nbb1_num;
    cased.nbb1_txt = req.body.nbb1_txt;
    cased.nbb2_num = req.body.nbb2_num;
    cased.nbb2_txt = req.body.nbb2_txt;
    cased.nbb3_num = req.body.nbb3_num;
    cased.nbb3_txt = req.body.nbb3_txt;
    cased.sol_high = req.body.sol_high;
    cased.feedback = req.body.feedback;
    cased.designation = req.body.designation;
    cased.sector      = req.body.sector;
    
    if (req.files.hasOwnProperty('bannerName')){
    cased.bannerName = req.files.bannerName.name;
     }

    if (req.files.hasOwnProperty('thumbName')){
    cased.thumbName = req.files.thumbName.name;
    }

    if (req.files.hasOwnProperty('videoName')){
      cased.videoName = req.files.videoName.name;
    }

    cased.timestamp = Date.now();
      cased.save(function(err) {
        if (err)
          res.send(err);
        res.json(cased);
      });
    });
  })
 
  .delete(function(req, res) {
    Cases.remove({
      _id: req.params.case_id
    }, function(err, cased) {
      if (err)
        res.send(err);
      res.json({ message:'deleted'});
    });
  });

  //================================================================================================ //


app.use('/api', router);

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log(msg)
  });



});


  // // 10 minutes later
  // t.track('#Zensar');

  // t.on('tweet', function (tweet) {
  //   console.log('tweet received', tweet);
  //   io.emit('tweet', tweet);
  // })

  // t.on('error', function (err) {
  //   console.log('Oh no');
  // })



http.listen(8000, function(){
  console.log('listening on *:8000');
});
