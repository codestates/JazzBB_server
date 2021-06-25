const jwt = require('jsonwebtoken');
const express = require('express');
const passport = require('passport');
const User = require('../../models/user');
const {isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();
// const { board, review, menu, subscribe, jazzbar, reservation, show, user } = require("../../models");
require('dotenv').config();

module.exports = { 
  login: (req, res) => {
    router.get('/kakao', passport.authenticate('kakao'));
    router.get('/kakao/callback', passport.authenticate('kakao', {
      failureRedirect: '/',
      }), (req, res) => {
      res.redirect('/');
    });
   
  },
  logout: (req,res) => {
    router.get('/logout', isLoggedIn, (req,res) => {
      req.logout();
      req.session.destroy(); 
      res.redirect('/');
  })
  },
};


// module.exports = router;