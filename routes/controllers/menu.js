const { menu } = require("../../models");
const util = require('./utilFunction')

module.exports = {
  menuCreate: async (req, res) => {
    const { jazzbarId } = req.body;
    //토큰 유효성 검사
    let newAccesstoken = await util.getToken(req, res);
    if (!newAccesstoken) {
      return res.status(404).send("not found Accesstoken");
    }
    let jazzId = Number(jazzbarId)
    console.log(jazzbarId, typeof jazzbarId, " : ******** jazzbarId,")
    console.log(jazzId, typeof jazzId, " : ******** jazzId,")
    if (!jazzbarId) {
      res.status(404).send("not found");
    } else {
      if(req.files){
        //thumbnail 받아오기
        let thumbnail = req.files.map((el)=> {
          return process.env.WEBSITE + '/image/' + el.filename
        })
        thumbnail = thumbnail.toString();
        await menu.create({
          jazzbarId: jazzId,
          thumbnail: thumbnail,
        })
      } else if(!req.files) {
        await menu.create({
          jazzbarId: jazzId,
        })
      }
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
      return res.status(200).send({ data: { data: menuData }, message: "OK" });
    }
  },
  menuUpdate: async (req, res) => {
    const { name, price, kind, content, jazzbarId } = req.body;
    //토큰 유효성 검사
    let newAccesstoken = await util.getToken(req, res);
    if (!newAccesstoken) {
      return res.status(404).send("not found Accesstoken");
    }

    if (!name || !price || !kind || !content) {
      res.status(404).send("Fill all content OR token");
    } 
    
    if(req.files){
      //thumbnail 받아오기
      let thumbnail = req.files.map((el)=> {
        return process.env.WEBSITE + '/image/' + el.filename
      })
      console.log(thumbnail, "******** thumbnail")
      thumbnail = thumbnail.toString();
      console.log(thumbnail, "******** thumbnail toString")
      await menu.update({
        name: name,
        price: price,
        kind: kind,
        content: content,
        thumbnail: thumbnail,
      }, {
        where: {
          jazzbarId: jazzbarId,
        }
      })
    } else {
      await menu.update({
        name: name,
        price: price,
        kind: kind,
        content: content,
      }, {
        where: {
          jazzbarId: jazzbarId,
        }
      })
    }
      return res.status(200).send({ data: { accessToken: newAccesstoken }, message: "Updated" })
  },
  menuDelete: async (req, res) => {
    const { id } = req.body;
    //토큰 유효성 검사
    let newAccesstoken = await util.getToken(req, res);
    if (!newAccesstoken) {
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
      return res.status(201).send({ data: { accessToken: newAccesstoken }, message: "Deleted" });
    }
  },
};
