const { DATEONLY } = require("sequelize");
const db = require("../database/db");
const EmployeeFiles = db.employees_files;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
    // Validate requests
    if (!req.body.employee_key) {
      res.status(400).send({
        message: "'Employee_key'can not be empty!"
      });
      return;
    }
    if (!req.body.file) {
        res.status(400).send({
          message: "'File'can not be empty!"
        });
        return;
      }
    if (!req.body.filename) {
        res.status(400).send({
          message: "'File Name'can not be empty!"
        });
        return;
      }  
  
    // Create a Employee
    const employee_file = {
      employee_key: req.body.employee_key,
      file: req.body.file,
      filename: req.body.filename,
    };
  
    // Save Employee in the database
    EmployeeFiles.create(employee_file)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the employee file."
        });
      });
  };

exports.findAll = (req, res) => {
    const employee_key = req.query.employee_key;
    const file = req.query.file;
    
    const condition = {
      [Op.and]: [
        employee_key ? { employee_key: { [Op.like]: `%${employee_key}%` } } : null,
        file ? { file: { [Op.like]: `%${file}%` } } : null,
      ].filter(Boolean),
    };
  
    EmployeeFiles.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving emplloyee files."
        });
      });
};