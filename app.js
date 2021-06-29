const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const indexRouter = require('./routes/index');
const fs = require('fs');
const https = require('https');
const http = require('http');

require("dotenv").config();

const authRouter = require('./routes/controllers/OAuth');
const { sequelize } = require('./models');
// const passportConfig = require('./passport')

const app = express();
app.set('port', process.env.PORT || 4000);

// 엔진 설정
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

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

// sequelize 연동
// sequelize.sync({force : false})
//   .then(()=> {
//     console.log('Connet Database')
//   })
//   .catch((err) =>{
//     console.log(err)
//   })
// passportConfig();

//라우팅
app.post('/boardCreate', indexRouter.board.boardCreate)
app.get('/boardRead', indexRouter.board.boardRead)
app.post('/boardUpdate', indexRouter.board.boardUpdate)
app.post('/boardDelete', indexRouter.board.boardDelete)

app.post('/jazzbarCreate', indexRouter.jazzbar.jazzbarCreate)
app.get('/jazzbarRead', indexRouter.jazzbar.jazzbarRead)
app.post('/jazzbarUpdate', indexRouter.jazzbar.jazzbarUpdate)
app.post('/jazzbarDelete', indexRouter.jazzbar.jazzbarDelete)

app.post('/menuCreate', indexRouter.menu.menuCreate)
app.get('/menuRead', indexRouter.menu.menuRead)
app.post('/menuUpdate', indexRouter.menu.menuUpdate)
app.post('/menuDelete', indexRouter.menu.menuDelete)

app.post('/reservationCreate', indexRouter.reservation.reservationCreate)
app.get('/reservationRead', indexRouter.reservation.reservationRead)
app.post('/reservationUpdate', indexRouter.reservation.reservationUpdate)
app.post('/reservationDelete', indexRouter.reservation.reservationDelete)

app.post('/reviewCreate', indexRouter.review.reviewCreate)
app.get('/reviewRead', indexRouter.review.reviewRead)
app.post('/reviewUpdate', indexRouter.review.reviewUpdate)
app.post('/reviewDelete', indexRouter.review.reviewDelete)

app.post('/showCreate', indexRouter.show.showCreate)
app.get('/showRead', indexRouter.show.showRead)
app.post('/showUpdate', indexRouter.show.showUpdate)
app.post('/showDelete', indexRouter.show.showDelete)

app.post('/userCreate', indexRouter.user.userCreate)
app.get('/userRead', indexRouter.user.userRead)
app.post('/userUpdate', indexRouter.user.userUpdate)
app.post('/userDelete', indexRouter.user.userDelete)

app.post('/oauth', indexRouter.oauth); // 오앗!!!

app.get('/login', indexRouter.oauth);
app.post('/logout', indexRouter.login.logout);

//redirectURI
app.get('')


const HTTPS_PORT = process.env.HTTPS_PORT || 4000;

// 인증서 파일들이 존재하는 경우에만 https 프로토콜을 사용하는 서버를 실행합니다. 
// 만약 인증서 파일이 존재하지 않는경우, http 프로토콜을 사용하는 서버를 실행합니다.
// 파일 존재여부를 확인하는 폴더는 서버 폴더의 package.json이 위치한 곳입니다.

// let server;
//https server 설정
// if(fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")){

//   const privateKey = fs.readFileSync('.' + "/key.pem", "utf8");
//   const certificate = fs.readFileSync('.' + "/cert.pem", "utf8");
//   const credentials = { key: privateKey, cert: certificate };

//   server = https.createServer(credentials, app);
//   server.listen(HTTPS_PORT, () => console.log("server runnning"));

// } else {
//   server = app.listen(HTTPS_PORT)
// }

//http server 설정(https 설정후 삭제예정)
const port = 4000;
const ip = "127.0.0.1";
let server = http.createServer(app);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);

  module.exports = app;