const { board, review, menu, subscribe, jazzbar, reservation, show, user } = require("../../models");
const util = require('./utilFunction');

module.exports = {
  reviewCreate: async (req, res) => {
    const { jazzbarId, boardId, point, content } = req.body;
    //토큰 유효성 검사
    let newAccesstoken = await util.getToken(req, res);

    //토큰에서 userId 추출
    let userId = await util.getUserId(req, res);

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
    console.log("***********reviewRead :", req.body)





    if (jazzbarId) {
      let reviewInfo = await review.findAll({
        where: { jazzbarId: jazzbarId },
        include: { model: user }
      }).then((data) => {
        return data.map((el) => {
          return { id: el.dataValues.id, boardId: el.dataValues.boardId, jazzbarId: el.dataValues.jazzbarId, userId: el.dataValues.userId, point: el.dataValues.point, content: el.dataValues.content, user: el.dataValues.user.dataValues }
        })
      })
      if (!reviewInfo) {
        return res.status(404).send("not found reviewInfo");
      } else {
        return res.status(200).send({ data: { list: reviewInfo }, message: "OK" });
      }
    }
    else if (boardId) {
      let reviewInfo = await review.findAll({
        where: { boardId: boardId }
      }).then((data) => {
        return data.map(async (el) => {
          let userInfo = await user.findOne({
            where: { id: el.dataValues.userId }
          }).then(el => el.dataValues)
          return { id: el.dataValues.id, boardId: el.dataValues.boardId, jazzbarId: el.dataValues.jazzbarId, userId: el.dataValues.userId, point: el.dataValues.point, content: el.dataValues.content, user: userInfo }
        })
      })
      if (!reviewInfo) {
        return res.status(404).send("not found reviewInfo");
      } else {
        return res.status(200).send({ data: { list: reviewInfo }, message: "OK" });
      }
    } else {

      let reviewInfo = await review.findAll({
        where: { userId: userId },
        include: [{ model: jazzbar }, { model: user, include: { model: board } }]
      })
      // reviewinfo = [{0}, {1}] => reveiwData = [{und}, {1}]
      let reviewData = await reviewInfo.map((el) => {
        if(el.dataValues.jazzbarId){
          return  {
            id: el.dataValues.id,
            boardId: el.dataValues.boardId,
            jazzbarId: el.dataValues.jazzbarId,
            userId: el.dataValues.userId,
            point: el.dataValues.point,
            content: el.dataValues.content,
            jazzbar: el.dataValues.jazzbar.dataValues,
          }
        }
          })
        
      await console.log("******** reviewInfo 2: ",  reviewInfo);
      await console.log("******** reviewInfo 3: ", reviewData);
      if (!reviewInfo) {
        return res.status(404).send("not found reviewInfo");
      } else {
        return res.status(200).send({ data: { list: reviewData }, message: "OK" });
      }
    }
  },
  reviewUpdate: async (req, res) => {
    const { jazzbarId, boardId, point, content } = req.body;
    //토큰 유효성 검사
    let newAccesstoken = await util.getToken(req, res);

    //토큰에서 userId 추출
    let userId = await util.getUserId(req, res);

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
    let newAccesstoken = await util.getToken(req, res);

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
