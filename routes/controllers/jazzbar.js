const { board, review, menu, subscribe, jazzbar, reservation, show, user } = require("../../models");
const util = require('./utilFunction');

module.exports = {
  jazzbarCreate: async (req, res) => {
    const { serviceOption, address, barName, defaultSeat, area, gpsX, gpsY, mobile, openTime } = req.body;
    //토큰 유효성 검사
    let newAccesstoken = util.getToken(req, res);

    //토큰에서 user_id 추출
    let user_id = util.getUserId(req, res);

    //thumbnail 받아오기
    let thumbnail = '/image/' + req.files.filename;

    if (!serviceOption || !address || !barName || !defaultSeat || !area || !gpsX || !gpsY) {
      res.status(404).send("not found");
    } else {
      await jazzbar.create({
        serviceOption: serviceOption,
        address: address,
        barName: barName,
        defaultSeat: defaultSeat,
        area: area,
        gpsX: gpsX,
        gpsY: gpsY,
        mobile: mobile,
        thumbnail: thumbnail,
        openTime: openTime
      })

      // jazzbar_id를 usertable에 update.
      const lastJazzBar = await jazzbar.findAll({
        limit: 1,
        order: "createdAt desc",
      })
      const jazzbar_id = lastJazzBar[0].dataValues.id;
      await user.update(
        { jazzbar_id: jazzbar_id },
        {
          where: {
            userId: user_id
          }
        })
      return res.status(200).send({ data: { accessToken: newAccesstoken }, message: "created" })
    }
  },
  jazzbarRead: async (req, res) => {
    jazzbarInfo = await jazzbar.findAll()
    jazzbarData = jazzbarInfo.map((el) => {
      return {
        id: el.dataValues.id,
        barName: el.dataValues.barName,
        mobile: el.dataValues.mobile,
        defaultSeat: el.dataValues.defaultSeat,
        area: el.dataValues.area,
        thumbnail: el.dataValues.thumbnail,
        address: el.dataValues.address,
        rating: el.dataValues.rating,
        serviceOption: el.dataValues.serviceOption,
        openTime: el.dataValues.openTime,
        gpsX: el.dataValues.gpsX,
        gpsY: el.dataValues.gpsY,
      }
    });
    if (!jazzbarInfo) {
      return res.status(404).send("not found");
    } else {
      return res.status(200).send({ data: jazzbarData, message: "OK" })
    }
  },
  jazzbarUpdate: async (req, res) => {
    const { serviceOption, address, barName, defaultSeat, area, gpsX, gpsY, mobile, rating, jazzbar_id, openTime } = req.body;
    //토큰 유효성 검사
    let newAccesstoken = util.getToken(req, res);

    //thumbnail 받아오기
    let thumbnail = '/image/' + req.files.filename;

    if (!serviceOption || !address || !barName || !defaultSeat || !area || !gpsX || !gpsY) {
      res.status(404).send("not found");
    } else {
      await jazzbar.update({
        serviceOption: serviceOption,
        address: address,
        barName: barName,
        defaultSeat: defaultSeat,
        area: area,
        gpsX: gpsX,
        gpsY: gpsY,
        mobile: mobile,
        rating: rating,
        thumbnail: thumbnail,
        openTime: openTime
      }, {
        where: {
          id: jazzbar_id
        }
      })
      return res.status(200).send({ data: { accessToken: newAccesstoken }, message: "Updated" })
    }
  },
  jazzbarDelete: async (req, res) => {
    const { jazzbar_id } = req.body;
    const id = jazzbar_id
    //토큰 유효성 검사
    let newAccesstoken = util.getToken(req, res);

    if (!id) {
      return res.status(404).send("Not found");
    } else {
      await jazzbar.destroy({
        where: {
          id: id
        }
      });
      return res.status(201).send({data : { accessToken : newAccesstoken }, message : "Deleted"});
    }
  },

};
