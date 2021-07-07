const jwt = require('jsonwebtoken') 
const { board, review, menu, subscribe, jazzbar, reservation, show, user } = require("../../models");


module.exports = {
  menuCreate: async (req,res) => {
    const { name, thumbnail, price, kind, content, jazzbar_id } = req.body;

    //토큰 유효성 검사

    //토큰에서 user_id 추출
    const user_id = '';

    //jazzbar_id 추출(client req 가능한지 물어보기)

    if(!name || !thumbnail || !price || !kind || !content){
      res.status(404).send("not found contents");
    } else {
      await menu.create({
        name : name,
        thumbnail : thumbnail,
        price :  price,
        kind :  kind,
        content : content,
        jazzbar_id : jazzbar_id
       })
      return res.status(200).send("created")
    }
  },
  menuRead: async (req,res) => {
    const { jazzbar_id } = req.body;

    let menuInfo = await menu.findOne({
      where : {jazzbar_id : jazzbar_id}
    })
    let menudData = menuInfo.map((el) => {
      return {id : el.dataValues.id, user_id : el.dataValues.user_id, title : el.dataValues.title, content : el.dataValues.content}
      });
    
    if(!menuInfo){
      return res.status(404).send("not found");
    } else {
      return res.status(200).send({data : menudData, message : "OK"});
    }
  },
  menuUpdate: async (req, res) => {
    const { name, thumbnail, price, kind, content } = req.body;

    //토큰 유효성 검사

    if(!menu || !name|| !thumbnail|| !price|| !kind || !content){
      res.status(404).send("not found content!");
    } else {
      await menu.update({
        name : name,
        thumbnail :  thumbnail,
        price :  price,
        kind :  kind,
        content :  content,
      },{
        where :{ 
          id : id,
        }
      })
      return res.status(200).send("Updated")
    }
  },
  menuDelete: async (req, res) => {
    const { id } = req.body;
    //토큰 유효성 검사

    if(!id ){
      return res.status(404).send("Not found");
    } else {
      await menu.destroy({
        where : {
          id : id,
      }});
      return res.status(201).send("Deleted");
    }
  },
  
};
