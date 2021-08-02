const { board, review, menu, subscribe, jazzbar, reservation, show, user } = require("../../models");
// const model = require("../../models");
const util = require('./utilFunction')

module.exports = {
  reservationCreate: async (req, res) => {
    const { showId, userId, people } = req.body;
    //토큰 유효성 검사
    let newAccesstoken =  await util.getToken(req, res);

    if (!showId || !people || !userId) {
      res.status(404).send("not found showId or showId or people");
    } else {
      await reservation.create({
        showId: showId,
        userId: userId,
        people: people,
        confirm: 'pending',
      })
      return res.status(200).send({ data: { accessToken: newAccesstoken }, message: "created" })
    }
  },
  reservationRead: async (req, res) => {
    //토큰 유효성 검사
    let newAccesstoken = util.getToken(req, res);

    // const { showId, userId } = req.body;
    const showId = req.body.showId
    const userId = req.body.userId

    // console.log("******** req.headers :", req.headers)
    let reservationInfo;
    let reservationData;
    
    if (!!userId) {
      reservationInfo = await reservation.findAll({
        where: { userId: userId },
        include: { model: show , include : { model : jazzbar} }
      })

      reservationData = reservationInfo.map((el) => {
        return { id: el.dataValues.id, showId: el.dataValues.showId, userId: el.dataValues.userId, people: el.dataValues.people, confirm: el.dataValues.confirm, show: el.dataValues.show.dataValues }
      })
    } else if (showId) {
      reservationInfo = await reservation.findAll({
        include: { model: user },
        where: { showId: showId },
      })
      reservationData = reservationInfo.map((el) => {
        return { id: el.dataValues.id, showId: el.dataValues.showId, userId: el.dataValues.userId, people: el.dataValues.people, confirm: el.dataValues.confirm, user: el.dataValues.user.dataValues }
      });
    }
    if (!reservationData) {
      return res.status(404).send("not found");
    }
    else if (reservationData) {

      return res.status(200).send({ data: { list: reservationData, accessToken: newAccesstoken }, message: "OK" });
    }
  },
  reservationUpdate: async (req, res) => {
    const { id, people, confirm, showId } = req.body;
    //토큰 유효성 검사
    let newAccesstoken = util.getToken(req, res);
    if (!newAccesstoken) {
      return res.status(404).send("not found");
    }

    //토큰에서 userId 추출 => userInfo 조회
    let userId = util.getUserId(req, res);
    const userInfo = await user.findOne({
      where: { userId: userId }
    })

    //usertable에서 usertype 추출하기
    let usertype = userInfo.usertype;
    let jazzbarId = userInfo.jazzbarId;

    if (usertype === 'boss') {
      await reservation.update({
        confirm: confirm,
      }, {
        where: {
          id: id,
        }
      })

      const defaultSeat = await jazzbar.findOne({
        where: { id: jazzbarId },
        attributes: ['defaultSeat']
      });
      const reservationPeople = await reservation.sum('people', { where: { confirm: confirm, showId: showId } });
      const currentSeat = defaultSeat - reservationPeople;
      await show.update({
        currentSeat: currentSeat
      }, {
        where: {
          id: showId
        }
      });

      return res.status(200).send({ data: { accessToken: newAccesstoken }, message: "Updated confirm state!" })
    } else {
      await reservation.update({
        people: people,
      }, {
        where: {
          id: id,
        }
      })
      return res.status(200).send({ data: { accessToken: newAccesstoken }, message: "Updated" })
    }
  },
  reservationDelete: async (req, res) => {
    const { id } = req.body;
    //토큰 유효성 검사
    let newAccesstoken = util.getToken(req, res);

    if (!id || !newAccesstoken) {
      return res.status(404).send("Not found");
    } else {
      await reservation.destroy({
        where: {
          id: id,
        }
      });
      return res.status(201).send({ data: { accessToken: newAccesstoken }, message: "Deleted" });
    }

  },

};