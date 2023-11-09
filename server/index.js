const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const cors = require('cors')
const port = 8080
const expressMinio = require("express-middleware-minio");
const minioMiddleware = expressMinio.middleware();


mongoose.connect('mongodb+srv://Farkhat:Sagat@cluster0.1i382pz.mongodb.net/kanban').then(()=>{
  console.log('MongoDB connected!')
}).catch(err => {
  console.log(err);
  process.exit(1);
});


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
require("./app/routes/board.routes")(app);
require("./app/routes/section.routes")(app);
require("./app/routes/task.routes")(app);
require("./app/routes/news.routes")(app);


// Upload a file
app.post(
  "/files",
  minioMiddleware({ op: expressMinio.Ops.post }),
  (req, res) => {
    if (req.minio.error) {
      res.status(400).json({ error: req.minio.error });
    } else {
      res.send({ filename: req.minio.post.filename });
    }
  }
);

// List all files
app.get(
  "/files",
  minioMiddleware({ op: expressMinio.Ops.list }),
  (req, res) => {
    if (req.minio.error) {
      res.status(400).json({ error: req.minio.error });
    } else {
      res.send(req.minio.list);
    }
  }
);

// Download a file
app.get(
  `/files/:filename`,
  minioMiddleware({ op: expressMinio.Ops.getStream }),
  (req, res) => {
    if (req.minio.error) {
      res.status(400).json({ error: req.minio.error });
      return;
    }

    res.attachment(req.minio.get.originalName);
    req.minio.get.stream.pipe(res);
  }
);

// Delete a file
app.delete(
  "/files/:filename",
  minioMiddleware({ op: expressMinio.Ops.delete }),
  (req, res) => {
    if (req.minio.error) {
      res.status(400).json({ error: req.minio.error });
    } else {
      res.send(req.minio.delete);
    }
  }
);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

