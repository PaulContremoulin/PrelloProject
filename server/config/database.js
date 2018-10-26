let mongoose = require('mongoose');
mongoose.connect('mongodb://' + process.env.DB_URL + '/prello', { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Database openned.')
});

