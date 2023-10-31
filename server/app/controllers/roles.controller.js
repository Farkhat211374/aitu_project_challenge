const { DATEONLY } = require("sequelize");
const db = require("../database/db");
const Role = db.roles;
const Op = db.Sequelize.Op; 

// Create and Save a new Role 
exports.create = (req, res) => {
  // Validate request
  if (!req.body.role_name) {
    res.status(400).send({
      message: "'role_name'can not be empty!"
    });
    return;
  }

  // Create a Role
  const role = {
    role_name: req.body.role_name,
    description: req.body.description,
  };

  // Save Role in the database
  Role.create(role)
  .then(data =>{
    res.send(data);
  })
  .catch(err =>{
    res.status(500).send({
      message:
      err.message || "Some error occurred while creating the Roles."
    });
  });
};



// Retrieve all Role from the database.
exports.findAll = (req, res) => {

// FOR FUTURE DEVELOPMENT
// ==================================================
//   const first_name = req.query.first_name;
//   var condition = first_name ? { first_name: { [Op.iLike]: `%${first_name}%` } } : null;
//   Department.findAll({ where: condition }) 

Role.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Role."
      });
    });
};


// Find a single Roles with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Role.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Role with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Role with id=" + id
      });
    });
};

// Update a Roles by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Role.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Role was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Role with id=${id}. Maybe Role was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Role with id=" + id
      });
    });
};

// Delete a Roles with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Role.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Role was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Role with id=${id}. Maybe Role was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Role with id=" + id
      });
    });
};

// Delete all Roles from the database.
exports.deleteAll = (req, res) => {
    Role.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Roles were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Roles."
      });
    });
};