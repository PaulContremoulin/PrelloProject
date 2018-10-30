/**
* @organization POLYTECH
* @author PAUL CONTREMOULIN
* @project PRELLO
*/

// Dependencies
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan-debug');
const passport = require('passport');
const dotenv = require('dotenv');


// Initialization
const app = express();
app.use(logger('app:api', 'dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

// Environment configuration
const environmentPath = path.resolve('./environments/.env.'+app.get('env'));
dotenv.config({ path: environmentPath});
// Database & passport require
require('./config/database');
require('./config/passport');

// Swagger
const expressSwagger = require('express-swagger-generator')(app);
const confSwagger = require('./config/swagger');
expressSwagger(confSwagger.options)

// Routes
const indexRouter = require('./routes/IndexRoutes');
const authRouter = require('./routes/AuthRoutes');
const userRouter = require('./routes/UserRoutes');
const boardRouter = require('./routes/BoardRoutes');

app.use('/api', indexRouter);
app.use('/api', authRouter);
app.use('/api/user', passport.authenticate('jwt', { session: false }), userRouter);
app.use('/api/board', passport.authenticate('jwt', { session: false }), boardRouter);

module.exports = app;
