const Sequelize = require('sequelize');

const db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS || "",
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        define: {
            timestamps: false
        }
    });

db.sync({ force: false }).then(() => {
    console.log("sync is completed")
});

module.exports = db;

