const { board, review, menu, subscribe, jazzbar, reservation, show, user } = require("../../models");
const util = require('./utilFunction');

module.exports = {
  reviewCreate: async (req, res) => {
    const { jazzbarId, boardId, point, content } = req.body;
    //토큰 유효성 검사
    let newAccesstoken = util.getToken(req, res);

    //토큰에서 user_id 추출
    let user_id = util.getUserId(req, res);

    if (!point || !content) {
      res.status(422).send("insufficient parameters supplied");
    }
    else if (!!jazzbarId) {
      await review.create({
        jazzbar_id: jazzbarId,
        user_id: user_id,
        point: point,
        content: content,
      })
      return res.status(200).send({ data: { accessToken: newAccesstoken }, message: "created" })
    }
    else if (!!boardId) {
      await review.create({
        board_id: boardId,
        user_id: user_id,
        point: point,
        content: content,
      })
      return res.status(200).send({ data: { accessToken: newAccesstoken }, message: "created" })
    } else {
      return res.status(404).send("something is wrong. check your code!!")
    }

  },
  reviewRead: async (req, res) => {
    const { jazzbarId, boardId, userId } = req.body;

    if (jazzbarId) {
      if (userId) {
        let reviewInfo = await review.findOne({
          where: { jazzbar_id: jazzbarId, user_id: userId }
        })
        return res.status(200).send({ data: reviewInfo.dataValues, message: "OK" });
      } else {
        let reviewInfo = await review.findAll({
          where: { jazzbar_id: jazzbarId }
        }).then((data) => {
          data.map((el) => {
            return { id: el.dataValues.id, board_id: el.dataValues.board_id, jazzbar_id: el.dataValues.jazzbar_id, user_id: el.dataValues.user_id, point: el.dataValues.point, content: el.dataValues.content }
          })
        })
        if (!reviewInfo) {
          return res.status(404).send("not found reviewInfo");
        } else {
          return res.status(200).send({ data: { list: reviewInfo }, message: "OK" });
        }
      }
    } else if (boardId) {
      if (userId) {
        let reviewInfo = await review.findOne({
          where: { board_id: boardId, user_id: userId }
        })
        return res.status(200).send({ data: reviewInfo.dataValues, message: "OK" });
      } else {
        let reviewInfo = await review.findAll({
          where: { board_id: boardId }
        }).then((data) => {
          data.map((el) => {
            return { id: el.dataValues.id, board_id: el.dataValues.board_id, jazzbar_id: el.dataValues.jazzbar_id, user_id: el.dataValues.user_id, point: el.dataValues.point, content: el.dataValues.content }
          })
        })
        if (!reviewInfo) {
          return res.status(404).send("not found reviewInfo");
        } else {
          return res.status(200).send({ data: { list: reviewInfo }, message: "OK" });
        }
      }
    } else {
      return res.status(404).send("something is wrong. check your code!!")
    }
  },
  reviewUpdate: async (req, res) => {
    const { jazzbarId, boardId, point, content } = req.body;
    //토큰 유효성 검사
    let newAccesstoken = util.getToken(req, res);

    //토큰에서 user_id 추출
    let user_id = util.getUserId(req, res);

    if (!point || !content) {
      res.status(404).send("Fill all content");
    }
    else if (jazzbarId) {
      await review.update({
        point: point,
        content: content,
      }, {
        where: {
          jazzbar_id: jazzbarId,
          user_id: user_id,
        }
      })
      return res.status(200).send({ data: { accessToken: newAccesstoken }, message: "Updated" })
    }
    else if (boardId) {
      await review.update({
        point: point,
        content: content,
      }, {
        where: {
          board_id: boardId,
          user_id: user_id,
        }
      })
      return res.status(200).send({ data: { accessToken: newAccesstoken }, message: "Updated" })
    } else {
      return res.status(404).send("something is wrong. check your code!!")
    }
  },
  reviewDelete: async (req, res) => {
    const { id } = req.body;
    //토큰 유효성 검사
    let newAccesstoken = util.getToken(req, res);

    if (!id || !newAccesstoken) {
      return res.status(404).send("not found or Can't find token");
    } else {
      await review.destroy({
        where: {
          id: id,
        }
      });
      return res.status(201).send({ data: { accessToken: newAccesstoken }, message: "Deleted" });
    }
  },

};
