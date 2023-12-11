module.exports = app => {
    const employees_files = require("../controllers/employees_files.controller");
    const tokenHandler = require('../middlewares/tokenHandler')
  
    var router = require("express").Router();
  
    // Create a new Employees
    router.post("/", employees_files.create);

    // Retrieve all Employees
    router.get("/", employees_files.findAll);

    // Retrieve a single Employees with id
    

    app.use('/employees_files', router);
  };