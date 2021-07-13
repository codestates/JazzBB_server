const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const indexRouter = require('./routes/index');
const fs = require('fs');
const https = require('https');
const sequelize = require('sequelize');
const http = require('http');
const multer = require('multer')

require("dotenv").config();

// const authRouter = require('./routes/controllers/OAuth');
// const { sequelize } = require('./models');
// const passportConfig = require('./passport')

const app = express();

app.set('port', process.env.PORT || 4000);

//multer 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
  const ext = path.extname(file.originalname);
  cb(null, path.basename(file.originalname, ext)+ Date.now() + ext);
  },
})
const imageFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
  return cb(new Error("Only image files are allowed!"));
  }
  cb(null, true);
};
app.use('/image',express.static('./uploads'));
 
const upload = multer({storage : storage, limits : { filesize : 5 * 1024 * 1024 }, fileFilter: imageFilter })



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
      origin: true,
      credentials: true,
      methods: ["GET", "POST", "OPTIONS"],
    })
  );

// sequelize 연동
// const models = require('./models');
// models.sequelize.sync({force : true})
//   .then(()=> {
//     console.log('Connet Database')
//   })
//   .catch((err) =>{
//     console.log(err)
//   })

// passportConfig();

//라우팅

//1.user
app.get('/login', indexRouter.login.login)
app.post('/logout', indexRouter.login.logout)
app.get('/userRead', indexRouter.user.userRead)
app.post('/userinfo', upload.single('thumbnail'), indexRouter.user.userUpdate)
app.post('/withdraw', indexRouter.user.userDelete)

//2.Review
app.post('/reviewCreate', indexRouter.review.reviewCreate)
app.get('/reviewRead', indexRouter.review.reviewRead)
app.post('/reviewUpdate', indexRouter.review.reviewUpdate)
app.post('/reviewDelete', indexRouter.review.reviewDelete)

//3.Board
app.post('/boardCreate', upload.single('thumbnail'), indexRouter.board.boardCreate)
app.get('/boardRead', indexRouter.board.boardRead)
app.post('/boardUpdate', upload.single('thumbnail'), indexRouter.board.boardUpdate)
app.post('/boardDelete', indexRouter.board.boardDelete)

//4. jazzbar
app.post('/jazzbarCreate', upload.array('thumbnail'), indexRouter.jazzbar.jazzbarCreate)
app.get('/jazzbarRead', indexRouter.jazzbar.jazzbarRead)
app.post('/jazzbarUpdate', upload.array('thumbnail'), indexRouter.jazzbar.jazzbarUpdate)
app.post('/jazzbarDelete', indexRouter.jazzbar.jazzbarDelete)

//5. show
app.post('/showCreate', upload.single('thumbnail'), indexRouter.show.showCreate)
app.get('/showRead', indexRouter.show.showRead)
app.post('/showUpdate', upload.single('thumbnail'), indexRouter.show.showUpdate)
app.post('/showDelete', indexRouter.show.showDelete)

//6. reservation
app.post('/reservationCreate', indexRouter.reservation.reservationCreate)
app.get('/reservationRead', indexRouter.reservation.reservationRead)
app.post('/reservationUpdate', indexRouter.reservation.reservationUpdate)
app.post('/reservationDelete', indexRouter.reservation.reservationDelete)

//7. menu
app.post('/menuCreate', upload.array('thumbnail'), indexRouter.menu.menuCreate)
app.get('/menuRead', indexRouter.menu.menuRead)
app.post('/menuUpdate', upload.array('thumbnail'), indexRouter.menu.menuUpdate)
app.post('/menuDelete', indexRouter.menu.menuDelete)

//8. search
app.get('/searchReview', indexRouter.search.searchReview)
app.get('/searchBoard', indexRouter.search.searchBoard)
app.get('/searchJazzbar', indexRouter.search.searchJazzbar)
app.get('/searchShow', indexRouter.search.searchShow)
app.get('/searchMenu', indexRouter.search.searchMenu)


// app.post('/oauth', indexRouter.oauth); // 오앗!!!

const HTTPS_PORT = process.env.HTTPS_PORT || 4000;

// 인증서 파일들이 존재하는 경우에만 https 프로토콜을 사용하는 서버를 실행합니다. 
// 만약 인증서 파일이 존재하지 않는경우, http 프로토콜을 사용하는 서버를 실행합니다.
// 파일 존재여부를 확인하는 폴더는 서버 폴더의 package.json이 위치한 곳입니다.

let server;
//https server 설정
if(fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")){

  const privateKey = fs.readFileSync('.' + "/key.pem", "utf8");
  const certificate = fs.readFileSync('.' + "/cert.pem", "utf8");
  const credentials = { key: privateKey, cert: certificate };

  server = https.createServer(credentials, app);
  server.listen(HTTPS_PORT, () => console.log("server runnning"));

} else {
  server = app.listen(HTTPS_PORT)
}

//http server 설정(https 설정후 삭제예정)
// const port = 4000;
// const ip = "127.0.0.1";
// let server = http.createServer(app);
// console.log("Listening on http://" + ip + ":" + port);
// server.listen(port, ip);

  module.exports = app;