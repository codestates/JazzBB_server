const { board, review, menu, subscribe, jazzbar, reservation, show, user } = require("../../models");
const util = require('./utilFunction');

module.exports = {
  reviewCreate: async (req, res) => {
    const { jazzbarId, boardId, point, content } = req.body;
    //토큰 유효성 검사
    let newAccesstoken = util.getToken(req, res);

    //토큰에서 userId 추출
    let userId = util.getUserId(req, res);

    if (!point || !content) {
      res.status(422).send("insufficient parameters supplied");
    }
    else if (!!jazzbarId) {
      await review.create({
        jazzbarId: jazzbarId,
        userId: userId,
        point: point,
        content: content,
      })
      return res.status(200).send({ data: { accessToken: newAccesstoken }, message: "created" })
    }
    else if (!!boardId) {
      await review.create({
        boardId: boardId,
        userId: userId,
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
          where: { jazzbarId: jazzbarId, userId: userId }
        })
        return res.status(200).send({ data: reviewInfo.dataValues, message: "OK" });
      } else {
        let reviewInfo = await review.findAll({
          where: { jazzbarId: jazzbarId }
        }).then((data) => {
          data.map((el) => {
            return { id: el.dataValues.id, boardId: el.dataValues.boardId, jazzbarId: el.dataValues.jazzbarId, userId: el.dataValues.userId, point: el.dataValues.point, content: el.dataValues.content }
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
          where: { boardId: boardId, userId: userId }
        })
        return res.status(200).send({ data: reviewInfo.dataValues, message: "OK" });
      } else {
        let reviewInfo = await review.findAll({
          where: { boardId: boardId }
        }).then((data) => {
          data.map((el) => {
            return { id: el.dataValues.id, boardId: el.dataValues.boardId, jazzbarId: el.dataValues.jazzbarId, userId: el.dataValues.userId, point: el.dataValues.point, content: el.dataValues.content }
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

    //토큰에서 userId 추출
    let userId = util.getUserId(req, res);

    if (!point || !content) {
      res.status(404).send("Fill all content");
    }
    else if (jazzbarId) {
      await review.update({
        point: point,
        content: content,
      }, {
        where: {
          jazzbarId: jazzbarId,
          userId: userId,
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
          boardId: boardId,
          userId: userId,
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
