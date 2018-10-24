var mongoose = require('mongoose');
mongoose.connect('mongodb://' + process.env.DB_URL, { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log('Database openned.')
});

