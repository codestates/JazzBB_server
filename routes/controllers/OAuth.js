const axios = require('axios');
const { User } = require('../../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const kakao = {
    clientID: process.env.KAKAO_ID,
    clientSecret: process.env.KAKAO_CLIENTSECRET,
    redirectUri: process.env.REDIRECT_URI,
    Authorization : process.env.ADMIN_KEY,
  };

let tokenData = {};
let userInfo;

module.exports = async (req, res) => {
    // 클라이언트 작업
    await axios({
        method: 'get',
        url: `https://kauth.kakao.com/oauth/authorize?client_id=2af0fc301f2858771a855642ddb9ace7&redirect_uri=https://localhost:3000&response_type=code`,
        headers: {
            accept: 'application/json',
        },
        data: kakao
    })

  
}
//토큰 유효성 검사

