const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const cors = require('cors')
const port = 8080


mongoose.connect('mongodb+srv://Farkhat:Sagat@cluster0.1i382pz.mongodb.net/kanban').then(()=>{
  console.log('MongoDB connected!')
}).catch(err => {
  console.log(err);
  process.exit(1);
});


// const db = require("./app/database/db");
// db.sequelize.sync()
//   .then(() => {
//     console.log("Synced to test db");
//   })
//   .catch((err) => {
//     console.log("Failed to sync db: " + err.message);
//   });


// require("dotenv").config();


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

