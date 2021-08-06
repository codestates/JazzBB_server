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
const multer = require('multer');

require("dotenv").config();

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
    
    const multerStorage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'uploads/');
      },
      filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, `user-${file.originalname}-${Date.now()}.${ext}`);
      }
    });
    const multerFilter = (req, file, cb) => {
      if (file.mimetype.startsWith('image')) {
        cb(null, true);
      } else {
        cb(new AppError('Not an image! Please upload an image.', 400), false);
      }
    };
const upload = multer({storage : storage, limits : { filesize : 5 * 1024 * 1024 }, fileFilter: imageFilter })
// const upload = multer({storage : storage, fileFilter: imageFilter });
// const upload = multer({storage: multerStorage, fileFilter: multerFilter});

app.use('/image',express.static('./uploads'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

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

const models = require('./models');
models.sequelize.sync()
.then(()=> {
  console.log('Connet Database')
})
.catch((err) =>{
  console.log(err)
})

app.post('/login', indexRouter.login.login)
app.post('/logout', indexRouter.login.logout)
app.get('/userinfo', indexRouter.user.userRead)
app.post('/userinfo', indexRouter.user.userUpdate)
app.post('/withdraw', indexRouter.user.userDelete)

app.post('/reviewCreate', indexRouter.review.reviewCreate)
app.post('/reviewRead', indexRouter.review.reviewRead)
app.post('/reviewUpdate', indexRouter.review.reviewUpdate)
app.post('/reviewDelete', indexRouter.review.reviewDelete)

app.post('/boardCreate', upload.single('thumbnail'), indexRouter.board.boardCreate)
app.get('/boardRead', indexRouter.board.boardRead)
app.post('/boardUpdate', upload.single('thumbnail'), indexRouter.board.boardUpdate)
app.post('/boardDelete', indexRouter.board.boardDelete)

app.post('/jazzbarCreate', upload.single('thumbnail'), indexRouter.jazzbar.jazzbarCreate)
app.get('/jazzbarRead', indexRouter.jazzbar.jazzbarRead)
app.post('/jazzbarUpdate', upload.single('thumbnail'), indexRouter.jazzbar.jazzbarUpdate)
app.post('/jazzbarDelete', indexRouter.jazzbar.jazzbarDelete)

app.post('/showCreate', upload.single('thumbnail'), indexRouter.show.showCreate)
app.post('/showRead', indexRouter.show.showRead)
app.post('/showUpdate', upload.single('thumbnail'), indexRouter.show.showUpdate)
app.post('/showDelete', indexRouter.show.showDelete)

app.post('/reservationCreate', indexRouter.reservation.reservationCreate)
app.post('/reservationRead', indexRouter.reservation.reservationRead)
app.post('/reservationUpdate', indexRouter.reservation.reservationUpdate)
app.post('/reservationDelete', indexRouter.reservation.reservationDelete)

app.post('/menuCreate', upload.array('thumbnail'), indexRouter.menu.menuCreate)
app.post('/menuRead', indexRouter.menu.menuRead)
app.post('/menuUpdate', upload.array('thumbnail'), indexRouter.menu.menuUpdate)
app.post('/menuDelete', indexRouter.menu.menuDelete)

app.post('/searchReview', indexRouter.search.searchReview)
app.post('/searchBoard', indexRouter.search.searchBoard)
app.post('/searchJazzbar', indexRouter.search.searchJazzbar)
app.post('/searchShow', indexRouter.search.searchShow)
app.post('/searchMenu', indexRouter.search.searchMenu)

const HTTPS_PORT = process.env.HTTPS_PORT || 4000;
let server;
if(fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")){
  const privateKey = fs.readFileSync('.' + "/key.pem", "utf8");
  const certificate = fs.readFileSync('.' + "/cert.pem", "utf8");
  const credentials = { key: privateKey, cert: certificate };
  server = https.createServer(credentials, app);
  server.listen(HTTPS_PORT, () => console.log("server runnning"));
} else {
  server = app.listen(HTTPS_PORT)
}

  module.exports = app;