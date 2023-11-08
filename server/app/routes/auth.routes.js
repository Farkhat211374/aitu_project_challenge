module.exports = app => {
    const auth = require("../controllers/auth.controller");
    const employees = require("../controllers/employees.controller");
    var verifyToken = require('../middlewares/authJWT');

  
    var router = require("express").Router();
  
    // Create a new Employees
    router.post("/", auth.signin);

    router.get("/secret", verifyToken, function (req, res) {
      if (!req.employee) {
        // Changed from "user" to "employee" for consistency
        res.status(403).send({
          message: "Invalid JWT token",
        });
      } else if (req.employee.firstname !== "") {
        res.status(200).send({
          message: "Congratulations! but there is no hidden content",
        });
      } else {
        res.status(403).send({
          message: "Unauthorized access",
        });
      }
    });

    app.use('/login', router);
  };