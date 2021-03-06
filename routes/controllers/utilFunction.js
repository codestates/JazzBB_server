require('dotenv').config();
const axios = require('axios');
const cookieParser = require('cookie-parser');
const fs = require('fs');
cookieParser();

// 함수 형태로 만들것.
//토큰유효성 검사 => 현재 토큰이 유효한지 확인하고 토큰이 만료되었으면 재발급 받아야함. 재발급은 리프레시토큰으로 받아와야함.
utilFunctions = {
  getToken: async (req, res) => {
    console.log("토큰요청중...");
    let token = req.headers.authorization;
    console.log(req.body)
    let refresh_token = req.headers.cookie.replace('refreshToken=', '')
    // accessToken, refreshToken 둘다 따로 지정해야됨//
    let tokenData = {};
    let result;

    const newToken = await axios({
      method: 'get',
      url: 'https://kapi.kakao.com/v1/user/access_token_info',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (data) => {
        let id = data.data.id
        if(!!id) {
          return result = token;
        }
        else if (!id) {
          // const code = req.body.authorizationCode;
          const kakaoHeader = {
            'Authorization': process.env.ADMIN_KEY,
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          };
          const data = {
            grant_type: 'refresh_token',
            client_id: process.env.KAKAO_ID,
            refresh_token: refresh_token,
            // code: code,
          };
          const queryString = Object.keys(data)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
            .join('&');

          await axios.post('https://kauth.kakao.com/oauth/token', queryString, { headers: kakaoHeader })
            .then((data) => {
              tokenData.accessToken = data.data.access_token;

            })
          await console.log("토큰요청회신 완료 :")
          return result = tokenData.accessToken;
        }
      })
      
    return result;
  },
  getUserId: async (res, req) => {
    let token = req.req.headers.authorization;
    let user_id
    await axios({
      method: 'get',
      url: 'https://kapi.kakao.com/v1/user/access_token_info',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((data) => {
        user_id = data.data.id
      })
    return user_id
  },
  deletePic : async (address) => {
    let arr = await address.split(',');
    await arr.map((el) => {
      let path = "uploads/" + el.slice(el.lastIndexOf('/') +1)
      fs.unlink(path, function (err) {
        if (err) {
          console.error('File removed err!!');
        } else {
          console.log("File removed");
        }
      });
    })
  }

};


module.exports = utilFunctions;