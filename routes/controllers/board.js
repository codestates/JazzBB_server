const jwt = require('jsonwebtoken') 
const { board, review, menu, subscribe, jazzbar, reservation, show, user } = require("../../models");


module.exports = {
  boardCreate: async (req,res) => {
    const { title, content } = req.body;

    //토큰 유효성 검사

    //토큰에서 user_id 추출
    const user_id = '';

    if(!title || !content){
      res.status(404).send("not found title or content");
    } else {
      await board.create({
        user_id : user_id,
        title : title,
        content :  content,
       })
      return res.status(200).send("created")
    }
  },
  boardRead: async (req,res) => {
    const {id} = req.body;
    let boardInfo;
    let boardData;
    if(!!id){
      boardInfo = await board.findOne({
        where : {id : id}
      })
    }
    else if(!id){
      boardInfo = await board.findAll()
      boardData = boardInfo.map((el) => {
        return {id : el.dataValues.id, user_id : el.dataValues.user_id, title : el.dataValues.title, content : el.dataValues.content}
        });
    }

    if(!boardInfo) {
      return res.status(404).send("not found");
    } 
    else if(!!boardData) {
      return res.status(200).send({data : boardData, message : "OK"});
    } else {
      return res.status(200).send({data : boardInfo.dataValues, message : "OK"})
    }
  },
  boardUpdate: async (req, res) => {
    const { id, title, content } = req.body;

    //토큰 유효성 검사

    //토큰에서 user_id 추출
    const user_id = '';

    if(!title || !content){
      res.status(404).send("not found title or content");
    } else {
      await board.update({
        title : title,
        content :  content,
      },{
        where :{ 
          id : id,
          user_id : user_id
        }
      })
      return res.status(200).send("Updated")
    }
  },
  boardDelete: async (req, res) => {
    const { id, title } = req.body;
    //토큰 유효성 검사

    if(!id || !title){
      return res.status(404).send("Not found");
    } else {
      await board.destroy({
        where : {
          id : id,
          title : title
      }});
      return res.status(201).send("Deleted");
    }
  },
};