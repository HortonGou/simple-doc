const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const history = require('connect-history-api-fallback');

const logger = require('morgan');

const indexRouter = require('./routes/index');
const folderRouter = require('./routes/folders');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/folder', folderRouter);

const autoRefresh = require('./utils/AutoRefresh');

autoRefresh.start()

module.exports = app;
