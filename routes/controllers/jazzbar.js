const { jazzbar, user } = require("../../models");
const util = require('./utilFunction');

module.exports = {
  jazzbarCreate: async (req, res) => {
    const { serviceOption, address, barName, defaultSeat, area, gpsX, gpsY, mobile, openTime } = req.body;
    //토큰 유효성 검사
    let newAccesstoken =  await util.getToken(req, res);

    //토큰에서 userId 추출
    let userId = await util.getUserId(req, res);
    
    //thumbnail 받아오기
    let thumbnail = process.env.WEBSITE + '/image/' + req.file.filename;
    // let thumbnail = process.env.WEBSITE + '/image/' + req.file.mimetype.split('/')

    if ( !address || !barName || !defaultSeat || !area) {
      res.status(404).send("not found");
    } else {
      const newJazzbar =  await jazzbar.create({
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

      await user.update(
        { jazzbarId: newJazzbar.dataValues.id },
        {
          where: {
            userId: userId
          }
        })
      return res.status(200).send({ data: { accessToken: newAccesstoken, jazzbarId : newJazzbar.dataValues.id }, message: "created" })
    }
  },
  jazzbarRead: async (req, res) => {
    jazzbarInfo = await jazzbar.findAll()
    jazzbarData = jazzbarInfo.map((el) => {
      return el.dataValues;
    });
    if (!jazzbarInfo) {
      return res.status(404).send("not found");
    } else {
      return res.status(200).send({ data: jazzbarData, message: "OK" })
    }
  },
  jazzbarUpdate: async (req, res) => {
    const { serviceOption, address, barName, defaultSeat, area, gpsX, gpsY, mobile, rating, jazzbarId, openTime } = req.body;
    //토큰 유효성 검사
    let newAccesstoken = await util.getToken(req, res);
    if (!newAccesstoken) {
      return res.status(404).send("not found Accesstoken");
    }
    if (!serviceOption || !address || !barName || !defaultSeat || !area || !gpsX || !gpsY) {
      res.status(404).send("not found");
    }

    if(req.file){
      //thumbnail 받아오기
      let thumbnail = process.env.WEBSITE + '/image/' + req.file.filename;
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
          id: jazzbarId
        }
      })
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
        openTime: openTime
      }, {
        where: {
          id: jazzbarId
        }
      })
    }
      return res.status(200).send({ data: { accessToken: newAccesstoken }, message: "Updated" })
  },
  jazzbarDelete: async (req, res) => {
    const { jazzbarId } = req.body;
    const id = jazzbarId
    //토큰 유효성 검사
    let newAccesstoken = await util.getToken(req, res);

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
