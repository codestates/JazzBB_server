const { board, review, menu, jazzbar, show } = require("../../models");

module.exports = {
    searchReview: async (req, res) => {
        const { content } = req.body;
        let searchData = {};

        if (!content) {
            return res.status(404).send("Not found");
        } else {
            let searchContent = await review.findAll({
                where: { content: { [Op.like]: "%" + content + "%" } }
            }).then((data) => {
                data.map((el) => {
                    return { id: el.dataValues.id, board_id: el.dataValues.board_id, jazzbar_id: el.dataValues.jazzbar_id, user_id: el.dataValues.user_id, point: el.dataValues.point, content: el.dataValues.content }
                })
            })

            searchData.content = searchContent;

            return res.status(200).send({ data: searchData, message: "OK" });
        }
    },
    searchBoard: async (req, res) => {
        const { content } = req.body;
        let searchData = {};

        if (!content) {
            return res.status(404).send("Not found");
        } else {
            let searchTitle = await board.findAll({
                where: { title: { [Op.like]: "%" + content + "%" } }
            }).then((data) => {
                data.map((el) => {
                    return { id: el.dataValues.id, user_id: el.dataValues.user_id, title: el.dataValues.title, content: el.dataValues.content }
                })
            })
            let searchContent = await board.findAll({
                where: { content: { [Op.like]: "%" + content + "%" } }
            }).then((data) => {
                data.map((el) => {
                    return { id: el.dataValues.id, user_id: el.dataValues.user_id, title: el.dataValues.title, content: el.dataValues.content }
                })
            })
            searchData.title = searchTitle;
            searchData.content = searchContent;
            return res.status(200).send({ data: searchData, message: "OK" });
        }
    },
    searchJazzbar: async (req, res) => {
        const { content } = req.body;
        let searchData = {};

        if (!content) {
            return res.status(404).send("Not found");
        } else {
            let searchBarName = await jazzbar.findAll({
                where: { barName: { [Op.like]: "%" + content + "%" } }
            }).then((el) => {
                return {
                    id: el.dataValues.id,
                    barName: el.dataValues.barName,
                    mobile: el.dataValues.mobile,
                    defaultSeat: el.dataValues.defaultSeat,
                    area: el.dataValues.area,
                    thumbnail: el.dataValues.thumbnail,
                    address: el.dataValues.address,
                    rating: el.dataValues.rating,
                    serviceOption: el.dataValues.serviceOption,
                    openTime: el.dataValues.openTime,
                    gpsX: el.dataValues.gpsX,
                    gpsY: el.dataValues.gpsY,
                }
            })
            let searchAddress = await jazzbar.findAll({
                where: { address: { [Op.like]: "%" + content + "%" } }
            }).then((el) => {
                return {
                    id: el.dataValues.id,
                    barName: el.dataValues.barName,
                    mobile: el.dataValues.mobile,
                    defaultSeat: el.dataValues.defaultSeat,
                    area: el.dataValues.area,
                    thumbnail: el.dataValues.thumbnail,
                    address: el.dataValues.address,
                    rating: el.dataValues.rating,
                    serviceOption: el.dataValues.serviceOption,
                    openTime: el.dataValues.openTime,
                    gpsX: el.dataValues.gpsX,
                    gpsY: el.dataValues.gpsY,
                }
            })

            searchData.barName = searchBarName;
            searchData.address = searchAddress;

            return res.status(200).send({ data: searchData, message: "OK" });
        }
    },
    searchShow: async (req, res) => {
        const { content } = req.body;
        let searchData = {};

        if (!content) {
            return res.status(404).send("Not found");
        } else {
            let searchPlayer = await show.findAll({
                where: { title: { [Op.like]: "%" + content + "%" } }
            }).then((data) => {
                data.map((el) => {
                    return { id: el.dataValues.id, jazzbar_id: el.dataValues.jazzbar_id, time: el.dataValues.time, date: el.dataValues.date, player: el.dataValues.player, thumbnail: el.dataValues.thumbnail, content: el.dataValues.content, showCharge: el.dataValues.showCharge, currentSeat: el.dataValues.currentSeat }
                })
            })
            let searchContent = await show.findAll({
                where: { content: { [Op.like]: "%" + content + "%" } }
            }).then((data) => {
                data.map((el) => {
                    return { id: el.dataValues.id, jazzbar_id: el.dataValues.jazzbar_id, time: el.dataValues.time, date: el.dataValues.date, player: el.dataValues.player, thumbnail: el.dataValues.thumbnail, content: el.dataValues.content, showCharge: el.dataValues.showCharge, currentSeat: el.dataValues.currentSeat }
                })
            })
            searchData.player = searchPlayer;
            searchData.content = searchContent;
            return res.status(200).send({ data: searchData, message: "OK" });
        }
    },
    searchMenu: async (req, res) => {
        const { content } = req.body;
        let searchData = {};

        if (!content) {
            return res.status(404).send("Not found");
        } else {
            let searchName = await menu.findAll({
                where: { name: { [Op.like]: "%" + content + "%" } }
            }).then((data) => {
                data.map((el) => {
                    return { id: el.dataValues.id, name: el.dataValues.name, thumbnail: el.dataValues.thumbnail, price: el.dataValues.price, kind: el.dataValues.kind, content: el.dataValues.content }
                })
            })
            let searchContent = await show.findAll({
                where: { content: { [Op.like]: "%" + content + "%" } }
            }).then((data) => {
                data.map((el) => {
                    return { id: el.dataValues.id, name: el.dataValues.name, thumbnail: el.dataValues.thumbnail, price: el.dataValues.price, kind: el.dataValues.kind, content: el.dataValues.content }
                })
            })

            searchData.name = searchName;
            searchData.content = searchContent;

            return res.status(200).send({ data: searchData, message: "OK" });
        }
    },
};