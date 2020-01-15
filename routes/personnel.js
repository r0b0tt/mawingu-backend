const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');

const db = require("../db");
var personnel = db.import("../models/personnel.js");

const personnel_router = express.Router();


personnel_router.post("/login", (req, res) => {
    // Login User and return a jwt
    let phone = req.body.phone;
    let password = req.body.password;
    let getUser;

    if (phone === undefined || password === undefined) {
        return res.json({
            error: "Please provide both a phone number and password"
        })
    }

    personnel.findOne({
        where: { personnel_phone: phone }
    }).then(user => {
        console.log(user)
        if (!user) {
            return res.status(401).json({
                error: {
                    phone: "Phone number does not exist"
                }
            });
        }
        getUser = user;
        return bcrypt.compare(password, user.personnel_password);
    }).then(response => {
        if (!response) {
            return res.status(401).json({
                error: {
                    password: "You have entered an incorrect password"
                }
            });
        }
        let jwtToken = jwt.sign({
            personnel_phone: getUser.personnel_phone,
            personnel_id: getUser.personnel_id
        }, config.secret, {
            expiresIn: "24h"
        });
        res.status(200).json({
            token: jwtToken,
            expires_in: "24h",
            reset_password: getUser.reset_password,
            fname: getUser.personnel_fname
        })
    }).catch(err => {
        return res.status(401).json({
            message: `Authentication failed.`
        });
    });
});

module.exports = personnel_router;