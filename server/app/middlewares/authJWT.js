const jwt = require("jsonwebtoken");
const db = require("../database/db");
const Employee = db.employees;
const Op = db.Sequelize.Op;

const verifyToken = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (authorizationHeader && authorizationHeader.startsWith("JWT ")) {
      const token = authorizationHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.API_SECRET);
      const employee = await Employee.findByPk(decoded.id);
      
      if (!employee) {
        req.employee = undefined;
        return next();
      }

      req.employee = employee;
      next();
    } else {
      req.employee = undefined;
      next();
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = verifyToken;