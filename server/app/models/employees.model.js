module.exports = (sequelize, Sequelize) => {
    const Employee = sequelize.define("employees", {  
        employee_key: {
            type: Sequelize.STRING(12),
            unique: true,
            allowNull: false,
          },
          password: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          first_name: {
            type: Sequelize.STRING(50),
            allowNull: false,
          },
          middle_name: {
            type: Sequelize.STRING(50),
            allowNull: true,
          },
          last_name: {
            type: Sequelize.STRING(50),
            allowNull: true,
          },
          role: {
            type: Sequelize.ENUM,
            values: ['Basic', 'Moderator', 'Admin'],
            defaultValue: 'Basic',
          },
          gender: {
            type: Sequelize.ENUM,
            values: ['Male', 'Female']
          },
          dob: {
            type: Sequelize.DATEONLY,
            allowNull: false,
          },
          doh: {
            type: Sequelize.DATEONLY,
            allowNull: false,
          },
          job_title: {
            type: Sequelize.STRING(100),
            allowNull: false,
          },
          address: {
            type: Sequelize.TEXT,
          },
          phone_number: {
            type: Sequelize.STRING(20),
          },
          alternate_phone_number: {
            type: Sequelize.STRING(20),
          },
          country: {
            type: Sequelize.STRING(50),
            defaultValue: 'Kazakhstan'
          },
          salary: {
            type: Sequelize.DECIMAL(10, 2),
          },
          status: {
            type: Sequelize.STRING(10),
            defaultValue: 'active',
          },
    });
  
    return Employee;
  };