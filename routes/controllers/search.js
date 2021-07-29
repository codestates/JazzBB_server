const { board, review, menu, jazzbar, show } = require("../../models");
const {Op} = require("sequelize")

module.exports = {
    searchReview: async (req, res) => {
        const { content } = req.body;
        let searchData = [];

        if (!content) {
            return res.status(404).send("Not found");
        } else {
            let searchContent = await review.findAll({
                where: { content: { [Op.like]: "%" + content + "%" } }
            }).then((data) => {
                return data.map((el) => {
                    return el.dataValues
                })
            })

            searchData = [ ...searchContent];

            return res.status(200).send({ data: searchData, message: "OK" });
        }
    },
    searchBoard: async (req, res) => {
        const { content } = req.body;
        let searchData = [];

        if (!content) {
            return res.status(404).send("Not found");
        } else {
            let searchTitle = await board.findAll({
                where: { title: { [Op.like]: "%" + content + "%" } }
            }).then((data) => {
                return data.map((el) => {
                    return el.dataValues;
                })
            })
            let searchContent = await board.findAll({
                where: { content: { [Op.like]: "%" + content + "%" } }
            }).then((data) => {
                return data.map((el) => {
                    return el.dataValues;
                })
            })
            searchData = [ ...searchTitle, ...searchContent ];
            return res.status(200).send({ data: searchData, message: "OK" });
        }
    },
    searchJazzbar: async (req, res) => {
        const { content } = req.body;
        let searchData = [];
        if (!content) {
            return res.status(404).send("Not found");
        } else {
            let searchBarName = await jazzbar.findAll({
                where: { barName: { [Op.like]: "%" + content + "%" } }
            }).then((barArr) => {
                return barArr.map(el => {
                    return el.dataValues;
                })
            })
            .catch((err) => [])
            let searchAddress = await jazzbar.findAll({
                where: { address: { [Op.like]: "%" + content + "%" } }
            }).then((barArr) => {
                return barArr.map(el =>{
                    return el.dataValues;
                })
            })
            .catch((err) => [])
            searchData = [...searchBarName, ...searchAddress];
            return res.status(200).send({ data: searchData, message: "OK" });
        }
    },
    searchShow: async (req, res) => {
        const { content } = req.body;
        let searchData = [];

        if (!content) {
            return res.status(404).send("Not found");
        } else {
            let searchPlayer = await show.findAll({
                where: { title: { [Op.like]: "%" + content + "%" } }
            }).then((data) => {
                return data.map((el) => {
                    return el.dataValues;
                })
            })
            let searchContent = await show.findAll({
                where: { content: { [Op.like]: "%" + content + "%" } }
            }).then((data) => {
                return data.map((el) => {
                    return el.dataValues;
                })
            })
            searchData = [ ...searchPlayer, ...searchContent]
            return res.status(200).send({ data: searchData, message: "OK" });
        }
    },
    searchMenu: async (req, res) => {
        const { content } = req.body;
        let searchData = [];

        if (!content) {
            return res.status(404).send("Not found");
        } else {
            let searchName = await menu.findAll({
                where: { name: { [Op.like]: "%" + content + "%" } }
            }).then((data) => {
                return data.map((el) => {
                    return el.dataValues;
                })
            })
            let searchContent = await show.findAll({
                where: { content: { [Op.like]: "%" + content + "%" } }
            }).then((data) => {
                return data.map((el) => {
                    return el.dataValues;
                })
            })

            searchData = [...searchName, ...searchContent];

            return res.status(200).send({ data: searchData, message: "OK" });
        }
    },
};