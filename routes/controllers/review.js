const jwt = require('jsonwebtoken') 
const { review } = require("../../models");
// const { board, review, menu, subscribe, jazzbar, reservation, show, user } = require("../../models");

module.exports = {
  reviewCreate: async (req,res) => {
    const { jazzbarId, boardId, point, content } = req.body;
    //토큰 유효성 검사

    //토큰에서 user_id 추출
    const user_id = '';

    if(!point || !content ){
      res.status(422).send("insufficient parameters supplied");
    } 
    else if(!!jazzbarId) {
      await review.create({
        jazzbar_id : jazzbarId,
        user_id : user_id,
        point : point,
        content :  content,
       })
      return res.status(200).send("OK")
    }
    else if(!!boardId) {
      await review.create({
        board_id : boardId,
        user_id : user_id,
        point : point,
        content :  content,
       })
      return res.status(200).send("OK")
    } else {
      return res.status(404).send("something is wrong. check your code!!")
    }

  },
  reviewRead: async (req,res) => {
    const { jazzbarId, boardId  } = req.body;

    if(!!jazzbarId){
      let reviewInfo = await review.findAll({
        where : { jazzbar_id : jazzbarId}
      })
      if (!reviewInfo) {
        return res.status(404).send("not found reviewInfo");
      } else {
        return res.status(200).send({data : reviewInfo.dataValues, message : "OK"});
      }
    } else if(!!boardId) {
      let reviewInfo = await review.findAll({
        where : { board_id : boardId}
      })
      if (!reviewInfo) {
        return res.status(404).send("not found reviewInfo");
      } else {
        return res.status(200).send({data : reviewInfo.dataValues, message : "OK"});
      }
    } else {
      return res.status(404).send("something is wrong. check your code!!")
    }
  },
  reviewUpdate: async (req, res) => {
    const { jazzbarId, boardId, point, content } = req.body;
    //토큰유효성 검사

    //토큰에서 user_id 추출
    const user_id = '';

    if(!point || !content ){
      res.status(404).send("Fill all content");
    } 
    else if(!!jazzbarId) {
      await review.update({
        point : point,
        content :  content,
       },{
         where :{ 
          jazzbar_id : jazzbarId,
          user_id : user_id,
         }
       })
      return res.status(200).send("Updated")
    }
    else if(!!boardId) {
      await review.update({
        point : point,
        content :  content,
       },{
         where :{ 
          board_id : boardId,
          user_id : user_id,
         }
       })
      return res.status(200).send("Updated")
    } else {
     return res.status(404).send("something is wrong. check your code!!")
    }
  },
  reviewDelete: async (req, res) => {
    const { id } = req.body;
    //토큰 유효성 검사


    if(!id){
      return res.status(404).send("not found");
    } else {
      await review.destroy({
        where : {
          id : id,
      }});
      return res.status(201).send("deleted");
    }
  },
  
};
