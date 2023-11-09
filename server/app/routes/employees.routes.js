module.exports = app => {
    const employees = require("../controllers/employees.controller");
    const tokenHandler = require('../middlewares/tokenHandler')
  
    var router = require("express").Router();
  
    // Create a new Employees
    router.post("/", employees.create);

    // Retrieve all Employees
    router.get("/", employees.findAll);

    // Retrieve a single Employees with id
    router.get("/:id", employees.findOne);

    // Update a Employees with id
    router.put("/:id", employees.update);

    // Delete a Employees with id
    router.delete("/:id", tokenHandler.verifyToken ,employees.grantAccess('updateAny','profile'), employees.delete);

    // Create a new Employees
    router.delete("/", employees.deleteAll);

    app.use('/employees', router);
  };