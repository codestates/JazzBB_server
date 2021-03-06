const { user } = require("../../models");
require('dotenv').config();
const axios = require('axios');

let tokenData = {};
let userInfo;
let jazzbarId;

module.exports = { 
  login: async (req, res) => {
    const { access_token, refresh_token } = req.body;
    // const kakaoHeader = {
    //     'Authorization': process.env.ADMIN_KEY,
    //     'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    //   };
    // const data = {
    //     grant_type: 'authorization_code',
    //     client_id: process.env.KAKAO_ID,
    //     redirect_uri: process.env.REDIRECT_URI,
    //     code: code,
    // };
    // const queryString = Object.keys(data)
    // .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
    // .join('&');

    // await axios.post('https://kauth.kakao.com/oauth/token', queryString, { headers: kakaoHeader })
    // .then(async (data) => {
    //   tokenData.accessToken = data.data.access_token;
    //   tokenData.refresh_token = data.data.refresh_token;
    // })
    await axios({
        method : 'post',
        url : 'https://kapi.kakao.com/v2/user/me',
        headers: {
          // authorization: `Bearer ${tokenData.accessToken}`,
          authorization: `Bearer ${access_token}`,
        },
        })
        .then(async (data) => {
        try {
            const exUser = await user.findOne({
                where : { userId : data.data.id },
            });
            if (exUser) {
                userInfo = exUser;
                jazzbarId = exUser.jazzbarId;
                
            } else {
                const newUser = await user.create({
                  userId : data.data.id,
                  username : data.data.properties.nickname,
                  thumbnail : data.data.properties.thumbnail_image,
                  userEmail : data.data.kakao_account.email,
                });
                userInfo = newUser;
            }
        } catch (error) {
            console.error(error);
        }
    })
    await res.cookie("refreshToken", refresh_token, {
      httpOnly: true,
    })
    return res.status(200).send({data : { accessToken : tokenData.accessToken, jazzbarId : jazzbarId, userinfo: userInfo }})   
  },
  logout: async (req,res) => {
    await axios({
      method : 'post',
      url : 'https://kapi.kakao.com/v1/user/logout',
      headers: {
        Authorization: `Bearer ${req.headers.authorization}`,
      },
      })
  
  },
};