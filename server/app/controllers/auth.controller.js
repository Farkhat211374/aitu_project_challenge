var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
const db = require("../database/db");
const Employee = db.employees;
const Op = db.Sequelize.Op;


// Sign Up is unavailable because our system will be closed

exports.signin = async (req, res) => {
  try {
    const user = await Employee.findOne({ where: { employee_key: req.body.employee_key } });

    
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compare(req.body.password, user.password);
    
    if (!passwordIsValid) {
      return res.status(401).send({ accessToken: null, message: "Invalid Password!" });
    }
    
    const token = jwt.sign({ id: user.id }, process.env.API_SECRET, {
      expiresIn: 86400,
    });

    

    res.status(200).send({
      employee: {
        id: user.id,
        first_name: user.first_name,
        fullName: user.fullName,
      },
      message: "Login successful",
      accessToken: token,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }  
};