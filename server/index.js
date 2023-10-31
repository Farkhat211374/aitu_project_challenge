const bodyParser = require("body-parser");
const express = require('express')
const app = express()
const cors = require('cors')
const port = 8080
//const pool = require('./db')

const db = require("./app/database/db");
db.sequelize.sync()
  .then(() => {
    console.log("Synced to test db");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });


require("dotenv").config();


//middleware
var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}));


//ROUTES//
require("./app/routes/employees.routes")(app);
require("./app/routes/departmnets.routes")(app);
require("./app/routes/roles.routes")(app);
require("./app/routes/auth.routes")(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })