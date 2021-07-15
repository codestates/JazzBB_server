const util = require('./utilFunction');
require("dotenv").config();
const { board, review, menu, subscribe, jazzbar, reservation, show, user } = require("../../models");


module.exports = {
  userRead: async (req, res) => {
    //토큰 유효성 검사
    let newAccesstoken = await util.getToken(req, res);
    //토큰에서 user_id 추출
    let user_id = await util.getUserId(req, res);

    const userInfo = await user.findOne({
      where: { userId: user_id }
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
    let newAccesstoken = await util.getToken(req, res);
    //토큰에서 user_id 추출
    let user_id = await util.getUserId(req, res);

    if (!user_id || !username || !usertype || !mobile || !newAccesstoken) {
      res.status(404).send("Fill all content");
    } else {
      await user.update({
        username: username,
        mobile: mobile,
        usertype: usertype,
      }, {
        where: {
          userId: user_id
        }
      })
      return res.status(200).send({ data: { accessToken: newAccesstoken }, message: "OK" })
    }
  },
  userDelete: async (req, res) => {
    //토큰 유효성 검사
    let newAccesstoken = util.getToken(req, res);
    //토큰에서 user_id 추출
    let user_id = util.getUserId(req, res);

    if (!user_id) {
      return res.status(404).send("not found");
    } else {
      await user.destroy({
        where: {
          userId: userInfo.id,
        }
      });
      return res.status(200).send({ data: { accessToken: newAccesstoken }, message: "OK" });
    }
  },
};
