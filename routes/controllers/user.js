const util = require('./utilFunction');
const { board, review, menu, subscribe, jazzbar, reservation, show, user } = require("../../models");


module.exports = {
  userRead: async (req,res) => {
    //토큰 유효성 검사
    let newAccesstoken = util.getToken(req,res);

    //토큰에서 user_id 추출
    let user_id = util.getUserId(req,res);

    const userInfo = await user.findOne({
      where : {userId : user_id}
    })

    if (!userInfo) {
      return res.status(404).send("not found");
    } else {
      return res.status(200).send({data : { accessToken : newAccesstoken, userinfo : userInfo.dataValues }, message : "OK"});
    }
  },
  userUpdate: async (req, res) => {
    const { userId, username, usertype, mobile,  jazzbar_id } = req.body;
    let thumbnail = '/image' + filename

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
    //토큰 유효성 검사
    let newAccesstoken = util.getToken(req,res);
    //토큰에서 user_id 추출
    let user_id = util.getUserId(req,res);
    
    if(!user_id){
      return res.status(404).send("not found");
    } else {
      await user.destroy({
        where : {
          userId : userInfo.id,
      }});
      return res.status(200).send({data : { accessToken : newAccesstoken }, message : "OK"});
    }
  },
};
