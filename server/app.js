const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');

require('./config/database');

const indexRouter = require('./routes/IndexRoutes');
const authRouter = require('./routes/AuthRoutes');
const usersRouter = require('./routes/UserRoutes');

const app = express();
const expressSwagger = require('express-swagger-generator')(app);
const confSwagger = require('./config/swagger');
expressSwagger(confSwagger.options)

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
