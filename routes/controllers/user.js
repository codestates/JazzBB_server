const jwt = require('jsonwebtoken') 
const { board, review, menu, subscribe, jazzbar, reservation, show, user } = require("../../models");


module.exports = {
  userRead: async (req,res) => {
    //토큰 유효성 검사

    //토큰에서 user_id 추출
    const user_id = '';

    
    const userInfo = await user.findOne({
      where : {userId : userId}
    })

    if (!userInfo) {
      return res.status(404).send("not found");
    } else {
      return res.status(200).send({data : userInfo.dataValues, message : "OK"});
    }
  },
  userUpdate: async (req, res) => {
    const { userId, username, usertype, mobile, thumbnail, jazzbar_id } = req.body;

    if(!userId || !username || !usertype || !mobile){
      res.status(404).send("Fill all content");
    } else {
      await user.update({
        username : username,
        mobile : mobile,
        thumbnail :  thumbnail,
        usertype : usertype,
       },{
         where :{ 
           userId : userId
         }
       })
       return res.status(200).send("OK")
      }
  },
  userDelete: async (req, res) => {
    const { userId } = req.body;
    //토큰 유효성 검사

    if(!userId){
      return res.status(404).send("not found");
    } else {
      await user.destroy({
        where : {
          userId : id,
      }});
      return res.status(200).send("OK");
    }
  },
  
};
