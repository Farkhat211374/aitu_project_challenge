module.exports = app => {
    const departments = require("../controllers/departments.controller");
  
    var router = require("express").Router();
  
    // Create a new Departmnets
    router.post("/", departments.create);

    // Retrieve all Departmnets
    router.get("/", departments.findAll);

    // Retrieve a single Departmnets with id
    router.get("/:id", departments.findOne);

    // Update a Departmnets with id
    router.put("/:id", departments.update);

    // Delete a Departmnets with id
    router.delete("/:id", departments.delete);

    // Create a new Departmnets
    router.delete("/", departments.deleteAll);

    app.use('/departments', router);
  };