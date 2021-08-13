const util = require('./utilFunction');
require("dotenv").config();
const { user, jazzbar } = require("../../models");


module.exports = {
  userRead: async (req, res) => {
    //토큰 유효성 검사
    let newAccesstoken = await util.getToken(req, res);
    //토큰에서 userId 추출
    let userId = await util.getUserId(req, res);

    const userInfo = await user.findOne({
      where: { userId: userId }
    })

    if (!userInfo) {
      return res.status(404).send("not found");
    } else {
      return res.status(200).send({ data: { accessToken: newAccesstoken, userinfo: userInfo.dataValues }, message: "OK" });
    }
  },
  userUpdate: async (req, res) => {

    const { username, usertype, mobile } = req.body;
    //토큰 유효성 검사
    console.log(req.body)
    let newAccesstoken = await util.getToken(req, res);
    //토큰에서 userId 추출
    let userId = await util.getUserId(req, res);

    if (!userId || !username || !usertype || !mobile || !newAccesstoken) {
      res.status(404).send("Fill all content");
    } else {
      const newUserInfo = await user.update({
        username: username,
        mobile: mobile,
        usertype: usertype,
      }, {
        where: {
          userId: userId
        }
      })
      return res.status(200).send({ data: { accessToken: newAccesstoken, userinfo: newUserInfo }, message: "OK" })
    }
  },
  userDelete: async (req, res) => {
    //토큰 유효성 검사
    let newAccesstoken =  await util.getToken(req, res);
    //토큰에서 userId 추출
    let userId = await util.getUserId(req, res);
    
    let userData = await user.findOne({ where : {userId : userId}})
    let jazzbarId = userData.dataValues.jazzbarId
    console.log("******** : ", jazzbarId)
    if(jazzbarId){
      await jazzbar.destroy({
        where: {
          id: jazzbarId,
        }
      });
    }

    if (!userId) {
      return res.status(404).send("not found");
    } else {
      await user.destroy({
        where: {
          userId: userId,
        }
      });
      return res.status(200).send({ data: { accessToken: newAccesstoken }, message: "OK" });
    }
  },
};
