const express = require('express');
const personnel_router = express.Router();

personnel_router.post("/login", (req, res) => {
    // Login User
    let phone = req.body.phone;
    let password = req.body.password;
    res.json({
        phone: phone,
        password: password
    })
});

module.exports = personnel_router;