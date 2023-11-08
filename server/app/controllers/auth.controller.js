var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
const db = require("../database/db");
const CryptoJS = require('crypto-js')
const Employee = db.employees;
const Op = db.Sequelize.Op;


// Sign Up is unavailable because our system will be closed

exports.signin = async (req, res) => {
  try {
    const employee = await Employee.findOne({ where: { employee_key: req.body.employee_key } });

    if (!employee) {
      return res.status(404).send({ message: "Employee Not found." });
    }

   
   const passwordIsValid = bcrypt.compare(req.body.password, employee.password);
    
    if (!passwordIsValid) {
      return res.status(401).send({ accessToken: null, message: "Invalid Password!" });
    }
    
    const token = jwt.sign({ id: employee.id }, process.env.API_SECRET, {
      expiresIn: 86400,
    });

    

    res.status(200).send({
      employee: {
        id: employee.employee_key,
        first_name: employee.first_name,
        job_title: employee.job_title,
      },
      message: "Login successful",
      accessToken: token,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }  
};