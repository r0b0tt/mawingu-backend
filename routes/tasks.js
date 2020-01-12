const express = require('express');
const tasks_router = express.Router();

const Sequelize = require('sequelize');
const sequelize = new Sequelize('mawingu_wifi', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});


var tasks = sequelize.import("../models/task.js");

tasks_router.get("/assigned", (req, res) => {

    let page = req.query.page;
    let limit = req.query.limit;
    let order = req.query.order;
    let orderMethod = req.query.orderMethod;

    tasks.findAll({
        order: [[order, orderMethod]],
    })
        .then(tasks => {
            let tasks_assigned = tasks;
            if (page !== undefined && limit !== undefined) {
                let end_index = parseInt(page) * parseInt(limit);
                let start_index = end_index - parseInt(limit);
                tasks_assigned = tasks.slice(start_index, end_index);
            }
            return res.json(tasks_assigned);


        });

})

module.exports = tasks_router;