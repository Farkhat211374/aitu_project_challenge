module.exports = (sequelize, Sequelize) => {
    const EmployeeFiles = sequelize.define("employees_files", {  
        employee_key: {
            type: Sequelize.STRING(12),
            allowNull: false,
          },
          file: {
            type: Sequelize.STRING(50),
            allowNull: false,
          },
          filename:{
            type: Sequelize.STRING(100),
            allowNull: false,
          }
    });
  
    return EmployeeFiles;
  };