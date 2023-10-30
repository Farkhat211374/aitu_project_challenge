module.exports = (sequelize, Sequelize) => {
    const Department = sequelize.define("departments", {  
        department_name: {
            type: Sequelize.STRING(100),
            unique: true,
            allowNull: false,
          },
          description: {
            type: Sequelize.TEXT,
            allowNull: false,
          },
    });

    return Department;
  };