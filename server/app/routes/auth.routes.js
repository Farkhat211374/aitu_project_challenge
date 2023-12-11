module.exports = app => {
    const auth = require("../controllers/auth.controller");
    const employees = require("../controllers/employees.controller");
    const tokenHandler = require('../middlewares/tokenHandler')
    

  
    var router = require("express").Router();
  
    // Create a new Employees
    router.post("/login", auth.signin);

    router.post(
      '/verify-token',
      tokenHandler.verifyToken,
      (req, res) => {
        res.status(200).json({ employee: req.employee })
      }
    )  

    app.use('/auth', router);
  };