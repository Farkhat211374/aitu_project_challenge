const Employee = require('./employees.model')
const Department = require('./departments.model')

module.exports = (sequelize, Sequelize) => {
    const Employee_Department = sequelize.define("employees_departments", {    
      employeeId: {
            type: Sequelize.INTEGER, // Integer foreign key
            references: {
              model: Employee,
              key: 'id',
            },
        },
        departmentId: {
            type: Sequelize.INTEGER, // Integer foreign key
            references: {
              model: Department,
              key: 'id',
            },
        },
    },{timestamps: false});

    return Employee_Department;
  };


  