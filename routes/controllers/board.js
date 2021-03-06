const util = require('./utilFunction')
const { board } = require("../../models");

module.exports = {
  boardCreate: async (req, res) => {
    const { title, content } = req.body;
    //토큰 유효성 검사
    let newAccesstoken =  await util.getToken(req, res);

    //토큰에서 userId 추출
    let userId = await util.getUserId(req, res);

    //thumbnail 받아오기
    let thumbnail = process.env.WEBSITE + '/image/' + req.file.filename;

    if (!title || !content) {
      res.status(404).send("not found title or content");
    } else {
      await board.create({
        userId: userId,
        title: title,
        content: content,
        thumbnail: thumbnail
      })
      return res.status(200).send({ data: { accessToken: newAccesstoken }, message: "created" })
    }
  },
  boardRead: async (req, res) => {
    const { id } = req.body;
    let boardInfo = false;
    let boardData = false;
    if (!!id) {
      boardInfo = await board.findOne({
        where: { id: id }
      })
    }
    else if (!id) {
      boardInfo = await board.findAll()
      boardData = boardInfo.map((el) => {
        return el.dataValues;
      });
    }

    if (!boardInfo) {
      return res.status(404).send("not found");
    }
    else if (boardData) {
      return res.status(200).send({ data: boardData , message: "OK" });
    } else {
      return res.status(200).send({ data: boardInfo.dataValues, message: "OK" })
    }
  },
  boardUpdate: async (req, res) => {
    const { id, title, content } = req.body;
    //토큰 유효성 검사
    let newAccesstoken =  await util.getToken(req, res);

    //토큰에서 userId 추출
    let userId = await util.getUserId(req, res);

    //thumbnail 받아오기
    let thumbnail = process.env.WEBSITE + '/image/' + req.file.filename;

    if (!title || !content) {
      res.status(404).send("not found title or content");
    } else {
      await board.update({
        title: title,
        content: content,
        thumbnail: thumbnail
      }, {
        where: {
          id: id,
          userId: userId
        }
      })
      return res.status(200).send({ data: { accessToken: newAccesstoken }, message: "Updated" })
    }
  },
  boardDelete: async (req, res) => {
    const { id, title } = req.body;
    //토큰 유효성 검사
    let newAccesstoken =  await util.getToken(req, res);

    if (!id || !title || newAccesstoken) {
      return res.status(404).send("Not found");
    } else {
      await board.destroy({
        where: {
          id: id,
          title: title
        }
      });
      return res.status(201).send({ data: { accessToken: newAccesstoken }, message: "Deleted" });
    }
  },
};