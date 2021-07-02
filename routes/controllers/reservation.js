const jwt = require('jsonwebtoken') 
const { board, review, menu, subscribe, jazzbar, reservation, show, user } = require("../../models");


module.exports = {
  reservationCreate: async (req,res) => {
    const { show_id, user_id, people } = req.body;
    //토큰 유효성 검사

    if(!show_id || !people || !user_id){
      res.status(404).send("not found show_id or show_id or people");
    } else {
      await reservation.create({
        show_id : show_id,
        user_id : user_id,
        people :  people,
        confirm : pending,
       })
      return res.status(200).send("created")
    }

  },
  reservationRead: async (req,res) => {
    const { show_id, user_id } = req.body;
    //토큰 유효성 검사
    let reservationInfo;
    let reservationData;

    if(!!show_id){
      reservationInfo = await reservation.findOne({
        where : {show_id : show_id, user_id : user_id}
      })
    }
    else if(!show_id){
      reservationInfo = await board.findAll()
      reservationData = reservationInfo.map((el) => {
          return {id : el.dataValues.id, show_id : el.dataValues.show_id, user_id : el.dataValues.user_id, people : el.dataValues.people, confirm : el.dataValues.confirm}
          });
    }

    if(!reservationInfo) {
      return res.status(404).send("not found");
    } 
    else if(!!reservationData) {
      return res.status(200).send({data : reservationData, message : "OK"});
    } else {
      return res.status(200).send({data : reservationInfo.dataValues, message : "OK"})
    }
  },
  reservationUpdate: async (req, res) => {
    
  },
  reservationDelete: async (req, res) => {
    
  },
  
};
