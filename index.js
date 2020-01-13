const express = require('express');
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.send("Welcome to the API"));
app.use("/personnel", require("./routes/personnel"));
app.use("/tasks", require("./routes/tasks"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Running server on port :${PORT}`)); 