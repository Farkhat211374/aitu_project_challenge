module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("roles", {  
        role_name: {
            type: Sequelize.STRING(25),
            unique: true,
            allowNull: false,
          },
          description: {
            type: Sequelize.TEXT,
            allowNull: true,
          },
    });

    return Role;
  };