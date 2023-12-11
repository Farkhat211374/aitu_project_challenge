const { DATEONLY } = require("sequelize");
const db = require("../database/db");
const DocRequest = db.doc_request;
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
    // Create a Employee
    const doc_request = {
      employee_key: req.body.employee_key,
      file: req.body.file,
      filename: "Requested",
    };
  
    // Save Employee in the database
    DocRequest.create(doc_request)
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
    const status = req.query.status;
    
    const condition = {
      [Op.and]: [
        employee_key ? { employee_key: { [Op.like]: `%${employee_key}%` } } : null,
        file ? { file: { [Op.like]: `%${file}%` } } : null,
        status ? { status: { [Op.like]: `%${status  }%` } } : null,
      ].filter(Boolean),
    };
  
    DocRequest.findAll({ where: condition })
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

exports.update = (req, res) => {
    const id = req.params.id;
  
    DocRequest.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Request was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Request with id=${id}. Maybe Request was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Request with id=" + id
        });
      });
  };