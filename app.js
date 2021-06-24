const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const indexRouter = require('./routes/index');
const fs = require('fs');
const https = require('https');

require("dotenv").config();

const app = express();
app.set('port', process.env.PORT || 4000);

//서버 설정
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
    cors({
      origin: ["https://localhost:3000"],
      credentials: true,
      methods: ["GET", "POST", "OPTIONS"],
    })
  );

  


  module.exports = app;