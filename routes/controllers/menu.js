const { board, review, menu, subscribe, jazzbar, reservation, show, user } = require("../../models");
const util = require('./utilFunction')

module.exports = {
  menuCreate: async (req, res) => {
    const { jazzbarId } = req.body;

    //토큰 유효성 검사
    let newAccesstoken =  await util.getToken(req, res);

    console.log("******** req.files: ", req.files);
    
    if(!newAccesstoken){
      return res.status(404).send("not found Accesstoken");
    }
    console.log("******** jazzId : ", req.body)
    console.log("******** jazzId : ", jazzbarId)
    let jazzId = Number(jazzbarId)
    console.log("******** jazzId : ", jazzId)
    if (!jazzbarId) {
      res.status(404).send("not found");
    } else {
      const promise = await Promise.all(req.files.map(data => menu.create(
        { 
         
         thumbnail: process.env.WEBSITE + '/image' + data.filename
        }
      )))
      console.log('******** : ', promise)

      return res.status(200).send({ data: { accessToken: newAccesstoken }, message: "created" })
    }
  },
  menuRead: async (req, res) => {
    const { jazzbarId } = req.body;

    let menuInfo = await menu.findAll({
      where: { jazzbarId: jazzbarId }
    })
    let menuData = menuInfo.map((el) => {
      return { id: el.dataValues.id, name: el.dataValues.name, thumbnail: el.dataValues.thumbnail, price: el.dataValues.price, kind: el.dataValues.kind, content: el.dataValues.content }
    });

    if (!menuInfo) {
      return res.status(404).send("not found");
    } else {
      return res.status(200).send({ data: { data: menuData, accessToken: newAccesstoken }, message: "OK" });
    }
  },
  menuUpdate: async (req, res) => {
    const { name, price, kind, content } = req.body;
    //토큰 유효성 검사
    let newAccesstoken =  await util.getToken(req, res);
    if(!newAccesstoken){
      return res.status(404).send("not found Accesstoken");
    }

    //thumbnail 받아오기
    let thumbnail = process.env.WEBSITE + '/image/' + req.files.filename;

    if (!name || !price || !kind || !content || !thumbnail) {
      res.status(404).send("not found content!");
    } else {
      await menu.update({
        name: name,
        price: price,
        kind: kind,
        content: content,
        thumbnail: thumbnail,
      }, {
        where: {
          id: id,
        }
      })
      return res.status(200).send({data : { accessToken : newAccesstoken }, message : "Updated"})
    }
  },
  menuDelete: async (req, res) => {
    const { id } = req.body;
    //토큰 유효성 검사
    let newAccesstoken =  await util.getToken(req, res);
    if(!newAccesstoken){
      return res.status(404).send("not found Accesstoken");
    }

    if (!id) {
      return res.status(404).send("Not found");
    } else {
      await menu.destroy({
        where: {
          id: id,
        }
      });
      return res.status(201).send({data : { accessToken : newAccesstoken }, message : "Deleted"});
    }
  },
};
