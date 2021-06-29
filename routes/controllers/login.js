const jwt = require('jsonwebtoken');
const express = require('express');
const passport = require('passport');
const User = require('../../models/user');
// const {isLoggedIn, isNotLoggedIn } = require('./middlewares');
// const router = express.Router();
// const { board, review, menu, subscribe, jazzbar, reservation, show, user } = require("../../models");
require('dotenv').config();

let tokenData = {};
let userInfo;

module.exports = { 
  login: async (req, res) => {
    const code = req.body.authorizationCode;
    const kakaoHeader = {
        'Authorization': process.env.ADMIN_KEY,
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      };
    const data = {
        grant_type: 'authorization_code',
        client_id: process.env.KAKAO_ID,
        redirect_uri: process.env.REDIRECT_URI,
        code: code,
    };
    const queryString = Object.keys(data)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
    .join('&');

    await axios.post('https://kauth.kakao.com/oauth/token', queryString, { headers: kakaoHeader })
    .then(async (data) => {
      tokenData.accessToken = data.data.access_token;
      tokenData.refresh_token = data.data.refresh_token;
    })
    await axios({
        method : 'post',
        url : 'https://kapi.kakao.com/v2/user/me',
        headers: {
          authorization: `Bearer ${tokenData.accessToken}`,
        },
        })
        .then(async (data) => {
        try {
            const exUser = await User.findOne({
                where : { userId : data.data.id },
            });
            if (exUser) {
                userInfo = exUser;
            } else {
                const newUser = await User.create({
                  userId : data.data.id,
                  username : data.data.properties.nickname,
                  thumbnail : data.data.properties.thumbnail_image,
                });
                userInfo = newUser;
            }
        } catch (error) {
            console.error(error);
        }
    })
    // console.log('userInfo tokenData******** : ', userInfo, tokenData)
    return res.status(200).send({data : {username : userInfo.username, accessToken : tokenData.accessToken }})  
    
  },
  logout: async (req,res) => {
    await axios({
      method : 'post',
      url : 'https://kapi.kakao.com/v1/user/logout',
      headers: {
        Authorization: `Bearer ${tokenData.accessToken}`,
      },
      })
  
  },
};


// module.exports = router;