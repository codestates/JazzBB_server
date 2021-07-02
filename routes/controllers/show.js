const jwt = require('jsonwebtoken');
const { board, review, menu, subscribe, jazzbar, reservation, show, user } = require("../../models");
const multer = require('multer');


module.exports = {
  showCreate: async (req,res) => {
    const { time, date, player, thumbnail, content, showCharge } = req.body;

    //토큰 유효성 검사

    
    if(!time || !date || !player || !content || !showCharge){
      res.status(422).send("insufficient parameters supplied");
    } else {
      await show.create({
        time : time,
        date : date,
        player : player,
        thumbnail :  thumbnail,
        content :  content,
        showCharge : showCharge,
       })
      return res.status(200).send("OK")
    }
  },
  showRead: async (req,res) => {
    const { jazzbar_id } = req.body;

    const showInfo = await show.findAll({
      where : { jazzbar_id : jazzbar_id}
    })

    if (!showInfo) {
      return res.status(404).send("not found");
    } else {
      return res.status(200).send({data : showInfo.dataValues, message : "OK"});
    }
    
  },
  showUpdate: async (req, res) => {
    const { id, jazzbar_id, time, date, player, thumbnail, content, showCharge } = req.body;
    //토큰유효성검사

    if(!time || !date || !player || !content || !showCharge){
      res.status(404).send("Fill all content");
    } else {
      await show.update({
        time : time,
        date : date,
        player : player,
        thumbnail :  thumbnail,
        content :  content,
        showCharge : showCharge,
       },{
         where :{ 
           id : id,
           jazzbar_id : jazzbar_id
         }
       })
      return res.status(200).send("OK")
    }
    
  },
  showDelete: async (req, res) => {
    const { id, jazzbar_id} = req.body;
    //토큰 유효성 검사

    if(!jazzbar_id){
      return res.status(404).send("not found");
    } else {
      await show.destroy({
        where : {
          id : id,
          jazzbar_id : jazzbar_id,
      }});
      return res.status(200).send("OK");
    }
  },
  
};
