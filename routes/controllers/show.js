const { board, review, menu, subscribe, jazzbar, reservation, show, user } = require("../../models");
const util = require('./utilFunction');

module.exports = {
  showCreate: async (req, res) => {
    const { jazzbar_id, time, date, player, content, showCharge } = req.body;
    //토큰 유효성 검사
    let newAccesstoken = util.getToken(req, res);

    const currentSeat = await jazzbar.findOne({
      where: { id: 'jazzbar_id' },
      attributes: ['defaultSeat']
    });

    //thumbnail 받아오기
    let thumbnail = '/image/' + req.file.filename;

    if (!time || !date || !player || !content || !showCharge) {
      res.status(422).send("insufficient parameters supplied");
    } else {
      await show.create({
        jazzbar_id: jazzbar_id,
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
  showRead: async (req, res) => {
    const { jazzbar_id } = req.body;

    //currentSeat update : 예약 후 예약 현황을 확인할때마다 update 해준다.
    const reservationPeople = await reservation.sum('people', { where: { people: { [Op.gt]: 1 } } });
    const defaultSeat = await jazzbar.findOne({
      where: { id: 'jazzbar_id' },
      attributes: ['defaultSeat']
    });
    const currentSeat = defaultSeat - reservationPeople;
    await show.update({
      currentSeat: currentSeat}, {
        where: {
          id: jazzbar_id
        }
      });

    const showInfo = await show.findAll({
      where: { jazzbar_id: jazzbar_id }
    })

    if (!showInfo) {
      return res.status(404).send("not found");
    } else {
      return res.status(200).send({ data: showInfo.dataValues, message: "OK" });
    }

  },
  showUpdate: async (req, res) => {
    const { id, jazzbar_id, time, date, player, content, showCharge } = req.body;
    //토큰 유효성 검사
    let newAccesstoken = util.getToken(req, res);
    //thumbnail 받아오기
    let thumbnail = '/image/' + req.file.filename;

    if (!time || !date || !player || !content || !showCharge) {
      res.status(404).send("Fill all content");
    } else {
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
          jazzbar_id: jazzbar_id
        }
      })
      return res.status(200).send({data : { accessToken : newAccesstoken }, message : "Updated"})
    }

  },
  showDelete: async (req, res) => {
    const { id, jazzbar_id } = req.body;
    //토큰 유효성 검사
    let newAccesstoken = util.getToken(req, res);

    if (!id || !jazzbar_id || !newAccesstoken) {
      return res.status(404).send("not found");
    } else {
      await show.destroy({
        where: {
          id: id,
          jazzbar_id: jazzbar_id,
        }
      });
      return res.status(200).send({data : { accessToken : newAccesstoken }, message : "Deleted"});
    }
  },

};
