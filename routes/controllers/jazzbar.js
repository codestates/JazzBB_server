const jwt = require('jsonwebtoken') 
const { board, review, menu, subscribe, jazzbar, reservation, show, user } = require("../../models");


module.exports = {
  jazzbarCreate: async (req,res) => {
    const { serviceOption, address, barName, defaultSeat, area, gpsX, gpsY, mobile, rating } = req.body;
    //토큰 유효성 검사

    //thumbnail 추가

    if(!serviceOption || !address || !barName || !defaultSeat || !area || !gpsX || !gpsY){
      res.status(404).send("not found");
    } else {
      await jazzbar.create({
        serviceOption : serviceOption,
        address : address,
        barName :  barName,
        defaultSeat :  defaultSeat,
        area :  area,
        gpsX :  gpsX,
        gpsY :  gpsY,
        mobile :  mobile,
        rating :  rating,
       })
      return res.status(200).send("created")
    }
  },
  jazzbarRead: async (req,res) => {
    jazzbarInfo = await jazzbar.findAll()
    jazzbarData = jazzbarInfo.map((el) => {
      return {
        id : el.dataValues.id, 
        serviceOption : el.dataValues.serviceOption,
        address : el.dataValues.address,
        barName :  el.dataValues.barName,
        defaultSeat :  el.dataValues.defaultSeat,
        area :  el.dataValues.area,
        gpsX :  el.dataValues.gpsX,
        gpsY :  el.dataValues.gpsY,
        mobile :  el.dataValues.mobile,
        rating :  el.dataValues.rating,
        thumbnail :  el.dataValues.thumbnail,
      }
    });
    //예상 errorPoint : thumbnail이 어떻게 저장 되냐에 따라서 client에 보내주는 방식이 달라져야할수도 있음. thumbnail만 따로 보내줘야 할수도 있음.
    if(!jazzbarInfo) {
      return res.status(404).send("not found");
    } else {
      return res.status(200).send({data : jazzbarData, message : "OK"})
    }    
  },
  jazzbarUpdate: async (req, res) => {
    const { serviceOption, address, barName, defaultSeat, area, gpsX, gpsY, mobile, rating } = req.body;
    //토큰 유효성 검사

    //토큰에서 user_id 추출 => usertable에서 jazzbar_id 추출
    const user_id = '';
    const jazzbar_id = '';

    if(!serviceOption || !address || !barName || !defaultSeat || !area || !gpsX || !gpsY){
      res.status(404).send("not found");
    } else {
      await jazzbar.update({
        serviceOption : serviceOption,
        address : address,
        barName :  barName,
        defaultSeat :  defaultSeat,
        area :  area,
        gpsX :  gpsX,
        gpsY :  gpsY,
        mobile :  mobile,
        rating :  rating,
      },{
        where :{ 
          id : jazzbar_id
        }
      })
      return res.status(200).send("created")
    }

  },
  jazzbarDelete: async (req, res) => {
    //토큰 유효성 검사

    //토큰에서 user_id 추출 => usertable에서 jazzbar_id 추출
    const user_id = '';
    const jazzbar_id = '';
    const id = jazzbar_id

    if(!id){
      return res.status(404).send("Not found");
    } else {
      await jazzbar.destroy({
        where : {
          id : id
      }});
      return res.status(201).send("Deleted");
    }
  },
  
};
