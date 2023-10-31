module.exports = app => {
    const roles = require("../controllers/roles.controller");
  
    var router = require("express").Router();
  
    // Create a new Departmnets
    router.post("/", roles.create);

    // Retrieve all Departmnets
    router.get("/", roles.findAll);

    // Retrieve a single Departmnets with id
    router.get("/:id", roles.findOne);

    // Update a Departmnets with id
    router.put("/:id", roles.update);

    // Delete a Departmnets with id
    router.delete("/:id", roles.delete);

    // Create a new Departmnets
    router.delete("/", roles.deleteAll);

    app.use('/roles', router);
  };