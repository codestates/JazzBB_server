const axios = require('axios');
const { User } = require('../../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const kakao = {
    clientID: process.env.KAKAO_ID,
    clientSecret: process.env.KAKAO_CLIENTSECRET,
    redirectUri: process.env.REDIRECT_URI
  };

let code = '';
let tokenData = {};
let userInfo;


module.exports = async (req, res) => {
  await axios({
    method: 'get',
    url: `https://kauth.kakao.com/oauth/authorize?client_id=${kakao.clientID}&redirect_uri=${kakao.redirectUri}&response_type=code`,
    headers: {
      accept: 'application/json',
    },
    data: kakao
  }).then(async (response) => {
    code = response.data.code;
    await axios({
        method : 'post',
        url : 'https://kauth.kakao.com/oauth/token',
        data : {
         grant_type : 'authorization_code',
         client_id : process.env.KAKAO_ID,
         redirect_uri : process.env.REDIRECT_URI,
         code : code,
        }
        })
    })
    .then(async (data) => {
        tokenData.accessToken = data.data.access_token;
        tokenData.refresh_token = data.data.refresh_token;
        await axios({
            method : 'post',
            url : 'https://kapi.kakao.com/v2/user/me',
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
            })
    })
    .then(async (data) => {
        try {
            const exUser = await User.findOne({
                where : { userId : data.id },
            });
            if (exUser) {
                userInfo = exUser;
            } else {
                const newUser = await User.create({
                  userId : data.id,
                  username : data.kakao_acount.profile.nickname,
                  thumbnail : data.kakao_acount.profile.thumbnail_image_url,
                });
                userInfo = newUser;
            }
        } catch (error) {
            console.error(error);
        }
    })
    return res.status(200).send({data : {username : userInfo.username, accessToken : tokenData.accessToken }})  
}