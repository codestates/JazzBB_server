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
    let thumbnail = process.env.WEBSITE + '/image/' + req.file.filename;
    console.log("******** req.file: ", thumbnail);


    if (!time || !date || !content || !showCharge) {
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
  // 두가지 보여주기 => 전체 & 해당 jazzbar_id 정보 이렇게 수정하기
  showRead: async (req, res) => {
    const { jazzbar_id } = req.body;
    let showInfo = [];

    if(jazzbar_id){
      showInfo = await show.findAll({ where: { jazzbar_id: jazzbar_id }})
    } else {
      showInfo = await show.findAll();
    }

    let showData = showInfo.map((el) => {
      return {id: el.dataValues.id, jazzbar_id: el.dataValues.jazzbar_id, time: el.dataValues.time, date: el.dataValues.date, player: el.dataValues.player, thumbnail: el.dataValues.thumbnail, content: el.dataValues.content, showCharge: el.dataValues.showCharge, currentSeat: el.dataValues.currentSeat}
    })
    return res.status(200).send({ data: showData, message: "OK" });
  },
  showUpdate: async (req, res) => {
    const { id, jazzbar_id, time, date, player, content, showCharge } = req.body;
    //토큰 유효성 검사
    let newAccesstoken = util.getToken(req, res);
    //thumbnail 받아오기
    let thumbnail = process.env.WEBSITE + '/image/' + req.file.filename;

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
