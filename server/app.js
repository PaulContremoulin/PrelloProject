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
var cors = require('cors');

// Initialization
const app = express();
app.use(cors())
app.use(logger('app:api', 'dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

// Environment configuration
const environmentPath = path.resolve('./environments/.' + app.get('env') + '.env' );
dotenv.config({ path: environmentPath});

// Database & passport require
require('./config/database');
require('./config/passport');

// Swagger
const expressSwagger = require('express-swagger-generator')(app);
const confSwagger = require('./config/swagger');
expressSwagger(confSwagger.options);

// Routes
const indexRouter = require('./routes/IndexRoutes');
const authRouter = require('./routes/AuthRoutes');
const memberRouter = require('./routes/MemberRoutes');
const boardRouter = require('./routes/BoardRoutes');
const ListRoutes = require('./routes/ListRoutes');

app.use('/api', indexRouter);
app.use('/api', authRouter);
app.use('/api/members', memberRouter);
app.use('/api/boards', passport.authenticate('jwt', { session: false }), boardRouter);
app.use('/api/lists', passport.authenticate('jwt', { session: false }), ListRoutes);
module.exports = app;
