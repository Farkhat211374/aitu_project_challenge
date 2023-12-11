const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const pdf = require('html-pdf');
const fs = require('fs'); 
const logger = require('morgan');
const cors = require('cors')
const port = 8080
//const Minio = require('minio');
const expressMinio = require("express-middleware-minio");
const minioMiddleware = expressMinio.middleware();
const pdfTemplate = require('./app/document/index');
const tokenHandler = require('./app/middlewares/tokenHandler')


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
  origin: "http://localhost:3000"
};
app.use(cors(corsOptions))
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



//ROUTES//
require("./app/routes/employees.routes")(app);
require("./app/routes/departmnets.routes")(app);
require("./app/routes/roles.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/board.routes")(app);
require("./app/routes/section.routes")(app);
require("./app/routes/task.routes")(app);
require("./app/routes/news.routes")(app);
require("./app/routes/employees_files.router")(app);
require("./app/routes/doc.requests.routes")(app);

app.post('/create-pdf',tokenHandler.verifyToken, (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {
      if (err) {
          res.status(500).send('PDF generation failed');
      } else {
          // Read the file and send it in the response
          const file = `${__dirname}/result.pdf`;
          res.status(200).sendFile(file, {}, (err) => {
              if (err) {
                  console.log('Error sending file:', err);
                  res.status(500).send('Error sending PDF file');
              } else {
                  // Delete the file after sending
                  fs.unlink(file, (err) => {
                      if (err) {
                          console.error('Error deleting PDF file:', err);
                      } else {
                          console.log('PDF file deleted');
                      }
                  });
              }
          });
      }
  });
});


app.post('/uploads', async(req, res)=>{
  const {filename, buffer} = req.file;
  const bucket = req.bucket
  minioClient.putObject(bucket, filename, buffer, (err, etag) => {
    if (err) {
      return console.error(err);
    }
    console.log('File uploaded successfully.');
    res.send('File uploaded successfully.');

  });
});



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
  "/:bucketname/:file/files",
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
  `/:bucketname/:file/:filename`,
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

