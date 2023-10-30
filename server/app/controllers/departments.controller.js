const { DATEONLY } = require("sequelize");
const db = require("../database/db");
const Department = db.departments;
const Op = db.Sequelize.Op;

// Create and Save a new Department 
exports.create = (req, res) => {
  // Validate request
  if (!req.body.department_name) {
    res.status(400).send({
      message: "'department_name'can not be empty!"
    });
    return;
  }

  // Create a Department
  const department = {
    department_name: req.body.department_name,
    description: req.body.description,
  };

  // Save Department in the database
  Department.create(department)
  .then(data =>{
    res.send(data);
  })
  .catch(err =>{
    res.status(500).send({
      message:
      err.message || "Some error occurred while creating the Departments."
    });
  });
};



// Retrieve all Department from the database.
exports.findAll = (req, res) => {

// FOR FUTURE DEVELOPMENT
// ==================================================
//   const first_name = req.query.first_name;
//   var condition = first_name ? { first_name: { [Op.iLike]: `%${first_name}%` } } : null;
//   Department.findAll({ where: condition }) 

  Department.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Departments."
      });
    });
};


// Find a single Departments with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Department.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Department with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Department with id=" + id
      });
    });
};

// Update a Departments by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Department.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Department was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Department with id=${id}. Maybe Department was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Department with id=" + id
      });
    });
};

// Delete a Departments with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Department.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Department was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Department with id=${id}. Maybe Department was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Department with id=" + id
      });
    });
};

// Delete all Departments from the database.
exports.deleteAll = (req, res) => {
    Department.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Departments were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Departments."
      });
    });
};