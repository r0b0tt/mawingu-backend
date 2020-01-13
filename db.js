const Sequelize = require('sequelize');

const db = new Sequelize('mawingu_wifi', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});

db.sync({ force: false }).then(() => {
    console.log("sync is completed")
});

module.exports = db;

