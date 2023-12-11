module.exports = app => {
    const doc_request = require("../controllers/doc.requests.controller");
    const tokenHandler = require('../middlewares/tokenHandler')
  
    var router = require("express").Router();
  
    // Create a new Employees
    router.post("/", tokenHandler.verifyToken,doc_request.create);

    // Retrieve all Employees
    router.get("/", doc_request.findAll);

    // Update a Employees with id
    router.put("/:id", doc_request.update);

    app.use('/doc_requests', router);
  };