const { jazzbar, show } = require("../../models");
const util = require('./utilFunction');

module.exports = {
  showCreate: async (req, res) => {
    //토큰 유효성 검사
    let newAccesstoken =  await util.getToken(req, res);
    const { jazzbarId, time, date, player, content, showCharge } = req.body;
    const seatData = await jazzbar.findOne({
      where: { id: jazzbarId },
      attributes: ['defaultSeat']
    });
    const currentSeat = seatData.dataValues.defaultSeat
    //thumbnail 받아오기
    let thumbnail = process.env.WEBSITE + '/image/' + req.file.filename;

    console.log(req.file, ": req.file @@@@@@@@ : ")

    if (!time || !date || !content || !showCharge) {
      res.status(422).send("insufficient parameters supplied");
    } else {
      await show.create({
        jazzbarId: jazzbarId,
        time: time,
        date: date,
        player: player,
        thumbnail: thumbnail,
        content: content,
        showCharge: showCharge,
        currentSeat: currentSeat,
      })
      return res.status(200).send({data : { accessToken : newAccesstoken }, message : "created"})
    }
  },
  // 두가지 보여주기 => 전체 & 해당 jazzbarId 정보 이렇게 수정하기
  showRead: async (req, res) => {
    const { jazzbarId } = req.body;
    let showInfo = [];

    if(jazzbarId){
      showInfo = await show.findAll({ where: { jazzbarId: jazzbarId }})
    } else {
      showInfo = await show.findAll();
    }

    let showData = showInfo.map((el) => {
      return el.dataValues;
    })
    return res.status(200).send({ data: showData, message: "OK" });
  },
  showUpdate: async (req, res) => {
    const { id, jazzbarId, time, date, player, content, showCharge } = req.body;
    //토큰 유효성 검사
    let newAccesstoken =  await util.getToken(req, res);
    if (!newAccesstoken) {
      return res.status(404).send("not found Accesstoken");
    }

    if (!time || !date || !player || !content || !showCharge) {
      res.status(404).send("Fill all content OR token");
    } 
    console.log(req.file)
    if(req.file){
      //thumbnail 받아오기
      let thumbnail = process.env.WEBSITE + '/image/' + req.file.filename;
      await show.update({
        time: time,
        date: date,
        player: player,
        thumbnail: thumbnail,
        content: content,
        showCharge: showCharge,
      }, {
        where: {
          id: id,
          jazzbarId: jazzbarId
        }
      })
    } else {
      await show.update({
        time: time,
        date: date,
        player: player,
        content: content,
        showCharge: showCharge,
      }, {
        where: {
          id: id,
          jazzbarId: jazzbarId
        }
      })
    }
  return res.status(200).send({data : { accessToken : newAccesstoken }, message : "Updated"})

  },
  showDelete: async (req, res) => {
    const { id, jazzbarId } = req.body;
    //토큰 유효성 검사
    let newAccesstoken = await util.getToken(req, res);

    if (!id || !jazzbarId || !newAccesstoken) {
      return res.status(404).send("not found");
    } else {
      await show.destroy({
        where: {
          id: id,
          jazzbarId: jazzbarId,
        }
      });
      return res.status(200).send({data : { accessToken : newAccesstoken }, message : "Deleted"});
    }
  },

};
