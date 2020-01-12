
const sequelize_auto = require('sequelize-auto');

let auto = new sequelize_auto("mawingu_wifi", "root", "", {
    dialect: 'mysql',
    host: 'localhost',
    port: "3306"
})

auto.run(function (err) {
    if (err) throw err;

    console.log(auto.tables); // table list
    console.log(auto.foreignKeys); // foreign key list
});
