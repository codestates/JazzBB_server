const multer = require('multer');
const fs = require("fs");
var router = require("express").Router();

// upload.single('userfile'),

module.exports =  {
    upload : async (req, res) => {
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
            cb(null, 'uploads/')
            },
            filename: function (req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext)+ DataCue.now() + ext);
            },
        })
        const imageFilter = (req, file, cb) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error("Only image files are allowed!"));
            }
            cb(null, true);
        };
        const upload = multer({storage : storage, limits : { filesize : 5 * 1024 * 1024 }, fileFilter: imageFilter })
        
        router.post('/array', upload.array('images'), async (req, res) => {
            //   const imageUrls = req.files.map(file => file.location);
              console.log(req.files);
              console.log(req.body);
              res.send({
                file: req.files,
                body: req.body
              }); 
        });
        
    }
};