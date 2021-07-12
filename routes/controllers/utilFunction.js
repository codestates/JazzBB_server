const express = require('express');
require('dotenv').config();

// 함수 형태로 만들것.
//토큰유효성 검사 => 현재 토큰이 유효한지 확인하고 토큰이 만료되었으면 재발급 받아야함. 재발급은 리프레시토큰으로 받아와야함.
utilFunctions = {
  getToken: async (req, res) => {
    let token = req.headers.authorization;
    let refresh_token = req.headers.cookie;
    // accessToken, refreshToken 둘다 따로 지정해야됨//
    let tokenData = {};

    await axios({
      method: 'get',
      url: 'https://kapi.kakao.com/v1/user/access_token_info',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (data) => {
        let id = data.data.id
        if (id) {
          return token
        }
        else if (!id) {
          const code = req.body.authorizationCode;
          const kakaoHeader = {
            'Authorization': process.env.ADMIN_KEY,
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          };
          const data = {
            grant_type: 'refresh_token',
            client_id: process.env.KAKAO_ID,
            refresh_token: refresh_token,
            code: code,
          };
          const queryString = Object.keys(data)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
            .join('&');

          await axios.post('https://kauth.kakao.com/oauth/token', queryString, { headers: kakaoHeader })
            .then((data) => {
              tokenData.accessToken = data.data.access_token;
            })
            return tokenData.accessToken;
        }
      })
  },
  getUserId: async (res, req) => {
    let token = req.headers.authorization;
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
  }

};


module.exports = utilFunctions;