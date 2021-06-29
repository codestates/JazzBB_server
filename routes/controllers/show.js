const jwt = require('jsonwebtoken');
// const { board, review, menu, subscribe, jazzbar, reservation, show, user } = require("../../models");
const multer = require('multer');

module.exports = {
  uploadPost : async (req, res) => {
    // const upload = multer({
    //   storage : multer.diskStorage({
    //     destination(req, file, cb){
    //       cb(null, 'uploads/');
    //     },
    //     filename(req, file, cb) {
    //       const ext = path.extname(file.originalname);
    //       cb(null, path.basename(file.originalname, ext)+ DataCue.now() + ext);
    //     },
    //   }),
    //   limits : { filesize : 5 * 1024 * 1024}
    // }),
  },
  showCreate: async (req,res) => {
    
  },
  showRead: async (req,res) => {
    
  },
  showUpdate: async (req, res) => {
    
  },
  showDelete: async (req, res) => {
    
  },
  
};
