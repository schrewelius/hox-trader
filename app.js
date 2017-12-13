var app = require('express')();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');
var authorize = require('./utils/authorize');

app.use(bodyParser.urlencoded({extended: false}));  // Form for authentication
app.use(bodyParser.json());

/*
* Routes
*/
app.use('/authentication', require('./handlers/authentication'));
app.use('/users', authorize, require('./handlers/users'));
app.use('/roles', authorize, require('./handlers/roles'));
app.use('/instruments', authorize, require('./handlers/instruments'));
app.use('/orders', authorize, require('./handlers/orders'));
app.use('/trades', authorize, require('./handlers/trades'));

mongoose.connect(config.database, function(err) {
  if (err) {
    console.log('Could not connect tot database %s, %s.', config.database, err);
    process.exit(1);
  } else {
    console.log('Hox-trader connected do database %s.', config.database);
    app.listen(config.port, function() {
      console.log('Hox-trader running on port %s.', config.port);
    });
  }
});
