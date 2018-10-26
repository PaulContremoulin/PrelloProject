let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let passport = require('passport');

require('./config/database');

let indexRouter = require('./routes/IndexRoutes');
let authRouter = require('./routes/AuthRoutes');
let usersRouter = require('./routes/UserRoutes');

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

require('./config/passport');

app.use('/api', indexRouter);
app.use('/api', authRouter);
app.use('/api/user', passport.authenticate('jwt', { failWithError: true, session: false}), usersRouter);

module.exports = app;
