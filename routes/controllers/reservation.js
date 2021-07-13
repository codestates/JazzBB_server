const { board, review, menu, subscribe, jazzbar, reservation, show, user } = require("../../models");
const util = require('./utilFunction')

module.exports = {
  reservationCreate: async (req, res) => {
    const { show_id, user_id, people } = req.body;
    //토큰 유효성 검사
    let newAccesstoken = util.getToken(req, res);

    if (!show_id || !people || !user_id) {
      res.status(404).send("not found show_id or show_id or people");
    } else {
      await reservation.create({
        show_id: show_id,
        user_id: user_id,
        people: people,
        confirm: pending,
      })
      return res.status(200).send({ data: { accessToken: newAccesstoken }, message: "created" })
    }
  },
  reservationRead: async (req, res) => {
    //토큰 유효성 검사
    let newAccesstoken = util.getToken(req, res);

    const { show_id, user_id } = req.body;

    let reservationInfo;
    let reservationData;

    if (user_id) {
      reservationInfo = await reservation.findAll({
        include: [{ model: user, as: 'user' }],
        where: { user_id: user_id },
      })
      reservationData = reservationInfo.map((el) => {
        return { id: el.dataValues.id, show_id: el.dataValues.show_id, user_id: el.dataValues.user_id, people: el.dataValues.people, confirm: el.dataValues.confirm, user: el.dataValues.user, }
      });
    } else if (show_id) {
      reservationInfo = await reservation.findAll({
        include: [{ model: show, as: 'show' }],
        where: { show_id: show_id },
      })
      reservationData = reservationInfo.map((el) => {
        return { id: el.dataValues.id, show_id: el.dataValues.show_id, user_id: el.dataValues.user_id, people: el.dataValues.people, confirm: el.dataValues.confirm, show: el.dataValues.show, }
      });
    }

    if (!reservationData) {
      return res.status(404).send("not found");
    }
    else if (reservationData) {
      return res.status(200).send({ data: { data: reservationData, accessToken: newAccesstoken }, message: "OK" });
    }
  },
  reservationUpdate: async (req, res) => {
    const { id, people, confirm, show_id } = req.body;
    //토큰 유효성 검사
    let newAccesstoken = util.getToken(req, res);
    if (!newAccesstoken) {
      return res.status(404).send("not found");
    }

    //토큰에서 user_id 추출 => userInfo 조회
    let user_id = util.getUserId(req, res);
    const userInfo = await user.findOne({
      where: { userId: user_id }
    })

    //usertable에서 usertype 추출하기
    let usertype = userInfo.usertype;
    let jazzbar_id = userInfo.jazzbar_id;

    if (usertype === 'boss') {
      await reservation.update({
        confirm: confirm,
      }, {
        where: {
          id: id,
        }
      })

      const defaultSeat = await jazzbar.findOne({
        where: { id: jazzbar_id },
        attributes: ['defaultSeat']
      });
      const reservationPeople = await reservation.sum('people', { where: { confirm: confirm, show_id: show_id } });
      const currentSeat = defaultSeat - reservationPeople;
      await show.update({
        currentSeat: currentSeat
      }, {
        where: {
          id: show_id
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