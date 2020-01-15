const express = require('express');
const config = require('../utils/config');
const tasks_router = express.Router();
const jwt = require('jsonwebtoken');
const db = require("../db");

// Import the task model
var tasks = db.import("../models/task.js");

// Get assigned tasks
tasks_router.get("/assigned", (req, res) => {
    let jwt_token = req.headers.authorization.split(" ")[1];
    jwt.verify(jwt_token, config.secret, (err, decoded) => {
        if (err) {
            res.json({ error: "Invalid token!" })
        } else {
            let personnel_id = decoded.personnel_id;

            let page = req.query.page;
            let limit = req.query.limit;
            let order = req.query.order;
            let orderMethod = req.query.orderMethod;

            tasks.findAll({
                where: {
                    personnel_id: personnel_id
                },
                order: [[
                    order === undefined ? "created" : order, orderMethod === undefined ? "DESC" : orderMethod
                ]],
            })
                .then(tasks => {
                    let tasks_assigned = tasks;

                    if (page !== undefined && limit !== undefined) {
                        let end_index = parseInt(page) * parseInt(limit);
                        let start_index = end_index - parseInt(limit);
                        tasks_assigned = tasks.slice(start_index, end_index);
                    }
                    return res.json({
                        totalTasks: tasks.length,
                        page: page,
                        perPage: limit,
                        tasks: tasks_assigned
                    });

                });
        }
    });

})

module.exports = tasks_router;