const express = require('express');
const Sequelize = require('sequelize');

const app = express();

const sequelize = new Sequelize('mawingu_wifi', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});

var personnel = sequelize.import(__dirname + "/models/personnel.js");

sequelize.sync({ force: false }).then(() => {
    console.log("sync is completed")
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.send("Welcome to the API"));
app.use("/personnel", require("./routes/personnel"));
app.use("/tasks", require("./routes/tasks"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Running server on port :${PORT}`)); 